const express = require('express');
const { verifyUser } = require('../middleware');
const router = express.Router();
const { getConnector } = require('../config');

// Define your routes using router
router.post('/submitge', verifyUser, async (req, res) => {
  const connection = getConnector().getConnection();
  const {
    institutionID, institutionName, telephone, fax, email, subdistrict, district, province,
    affiliation, headmasterName, projectDetail, educationLevels, studentCounts, teacherCounts,
    otherEducationLevel, otherStudentCount, otherTeacherCount
  } = req.body;

  const userEmail = req.user.email;

  try {
    const formData = {
      institutionID, institutionName, telephone, fax, email, subdistrict, district, province,
      affiliation, headmasterName, projectDetail
    };
    const [userResult] = await connection.query('SELECT * FROM users WHERE email = ?', [userEmail]);

    if (userResult.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Update institutionID in users table
    await connection.query('UPDATE users SET institutionID = ? WHERE email = ?', [institutionID, userEmail]);

    // Insert into institution table
    await connection.query('INSERT INTO FieldEx.institution SET ?', formData);

    // Prepare data for educationLevels table
    const educationLevelsValues = educationLevels
      .filter(level => level !== 'อื่น ๆ') // Filter out "อื่น ๆ" from educationLevels
      .map(level => [
        institutionID, level, studentCounts[level], teacherCounts[level]
      ]);

    // Insert transformed education levels data into educationLevels table
    for (const eduLevel of educationLevelsValues) {
      await connection.query('INSERT INTO FieldEx.educationLevels (institutionID, educationLevel, studentCount, teacherCount) VALUES (?, ?, ?, ?)', eduLevel);
    }

    // Insert other education levels
    const otherLevels = { institutionID, otherEducationLevel, otherStudentCount, otherTeacherCount };
    await connection.query('INSERT INTO FieldEx.otherEducationLevels SET ?', otherLevels);

    res.status(200).json({
      message: "Submit Success"
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: "Submit failed",
      error: error.message
    });
  }
});

router.get('/fetchData', verifyUser, async (req, res) => {
  const connection = await getConnector().getConnection();
  try {
    // Start a transaction
    await connection.beginTransaction();

    // Query to find institution ID and local ID from email
    const [userID] = await connection.query('SELECT institutionID, localID FROM FieldEx.users WHERE email = ?', [req.user.email]);
    if (userID.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        message: "User not found"
      });
    }
    const { institutionID, localID } = userID[0];
    if (localID) {
      // Fetch data from FieldEx.localGovernmentData if localID is present
      const [localGovernmentData] = await connection.query('SELECT * FROM FieldEx.localGovernmentData WHERE localID = ?', [localID]);
      const [localManageData] = await connection.query('SELECT * FROM FieldEx.localManageData WHERE localID = ?', [localID]);

      await connection.commit();
      return res.status(200).json({
        localGovernmentData, localManageData
      });
    } else {
      // Fetch data based on institutionID
      const [institutionData] = await connector.query('SELECT * FROM FieldEx.institution WHERE institutionID = ?', [institutionID]);

      // Fetch education levels data
      const [educationLevelsData] = await connector.query('SELECT * FROM FieldEx.educationLevels WHERE institutionID = ?', [institutionID]);

      // Fetch other education levels data
      const [otherEducationLevelsData] = await connector.query('SELECT * FROM FieldEx.otherEducationLevels WHERE institutionID = ?', [institutionID]);

      await connection.commit();
      return res.status(200).json({
        institutionData: institutionData[0],
        educationLevelsData,
        otherEducationLevelsData: otherEducationLevelsData[0]
      });
    }
  } catch (error) {
    await connection.rollback();
    console.error('Error:', error);
    res.status(500).json({
      message: "Failed to fetch data",
      error: error.message
    });
  } finally {
    connection.release();
  }
});

router.post('/submitlc', verifyUser, async (req, res) => {
  const connection = getConnector().getConnection();
  const { organizationName, localID, phoneNumber, faxNumber, email, subDistrict, district, province, affiliation, headmasterName, highlightedActivities } = req.body;

  try {
    const formData = {
      organizationName, localID, phoneNumber, faxNumber, email, subDistrict, district, province, affiliation, headmasterName, highlightedActivities
    };
    const userEmail = req.user.email;
    const [userResult] = await connection.query('SELECT * FROM users WHERE email = ?', [userEmail]);
    if (userResult.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    await connection.query('UPDATE users SET localID = ? WHERE email = ?', [localID, userEmail]);

    await connections.query('INSERT INTO FieldEx.localGovernmentData SET ?', formData);
    console.log(formData);
    res.status(200).json({
      message: "Submit Success"
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: "Submit failed",
      error: error.message
    });
  }
});

router.put('/updateData', verifyUser, async (req, res) => {
  const connection = await getConnector().getConnection();
  const { organizationName, localID, phoneNumber, faxNumber, email, subDistrict, district, province, affiliation, headmasterName, highlightedActivities } = req.body;

  try {
    const formData = {
      organizationName,
      phoneNumber,
      faxNumber,
      email,
      subDistrict,
      district,
      province,
      affiliation,
      headmasterName,
      highlightedActivities
    };

    await connection.query('UPDATE FieldEx.localGovernmentData SET ? WHERE localID = ?', [formData, localID]);

    res.status(200).json({
      message: "Update Success"
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: "Update failed",
      error: error.message
    });
  }
});

router.post('/localsubmit', verifyUser, async (req, res) => {
  const role = req.user.role;
  const { emailUser } = req.body;
  try {
    // Fetch user data including localId and institutionID
    const [userData] = await connection.query('SELECT localId, institutionID FROM FieldEx.users WHERE email = ?', emailUser);

    let institutionID = null;
    let localID = null;

    // Extract localId and institutionID from userData
    userData.forEach(user => {
      if (user.institutionID !== null && institutionID === null) {
        institutionID = user.institutionID;
      }
      if (user.localId !== null && localID === null) {
        localID = user.localId;
      }

      // Break out of loop if both values are found
      if (institutionID !== null && localID !== null) {
        return;
      }
    });

    // Determine which table to insert based on user role
    if (role === 'admin') {
      const {
        refereeLocalMeetingAgenda, commentLocalMeetingAgenda, refereeLocalMemberSignatures, commentLocalMemberSignatures, refereeMeetingMinutes, commentMeetingMinutes, refereePhotos,
        commentPhotos, refereeAppointmentOrder, commentAppointmentOrder, refereeSubcommittee, commentSubcommittee, refereeManagementPlan, commentManagementPlan, refereeProtectionPlan, commentProtectionPlan,
        refereeSurveyPlan, commentSurveyPlan, refereeCoordination, commentCoordination, refereeExpenseSummary, commentExpenseSummary, refereeMeetingInvite, commentMeetingInvite, refereeThankYouNote,
        commentThankYouNote, refereeOperationResults, commentOperationResults, refereeAnalysisResults, commentAnalysisResults, refereeImprovementPlan, commentImprovementPlan, refereeAnnualReport,
        commentAnnualReport
      } = req.body;

      // Construct SQL query for admin insert
      const adminUpdateQuery = `
      UPDATE FieldEx.localManageData
      SET 
        refereeLocalMeetingAgenda = ?, commentLocalMeetingAgenda = ?, 
        refereeLocalMemberSignatures = ?, commentLocalMemberSignatures = ?, 
        refereeMeetingMinutes = ?, commentMeetingMinutes = ?, 
        refereePhotos = ?, commentPhotos = ?, 
        refereeAppointmentOrder = ?, commentAppointmentOrder = ?, 
        refereeSubcommittee = ?, commentSubcommittee = ?, 
        refereeManagementPlan = ?, commentManagementPlan = ?, 
        refereeProtectionPlan = ?, commentProtectionPlan = ?, 
        refereeSurveyPlan = ?, commentSurveyPlan = ?, 
        refereeCoordination = ?, commentCoordination = ?, 
        refereeExpenseSummary = ?, commentExpenseSummary = ?, 
        refereeMeetingInvite = ?, commentMeetingInvite = ?, 
        refereeThankYouNote = ?, commentThankYouNote = ?, 
        refereeOperationResults = ?, commentOperationResults = ?, 
        refereeAnalysisResults = ?, commentAnalysisResults = ?, 
        refereeImprovementPlan = ?, commentImprovementPlan = ?, 
        refereeAnnualReport = ?, commentAnnualReport = ?
      WHERE localID = ?
    `;
      // Execute admin insert query
      await connector.query(adminUpdateQuery, [
        refereeLocalMeetingAgenda, commentLocalMeetingAgenda,
        refereeLocalMemberSignatures, commentLocalMemberSignatures,
        refereeMeetingMinutes, commentMeetingMinutes,
        refereePhotos, commentPhotos,
        refereeAppointmentOrder, commentAppointmentOrder,
        refereeSubcommittee, commentSubcommittee,
        refereeManagementPlan, commentManagementPlan,
        refereeProtectionPlan, commentProtectionPlan,
        refereeSurveyPlan, commentSurveyPlan,
        refereeCoordination, commentCoordination,
        refereeExpenseSummary, commentExpenseSummary,
        refereeMeetingInvite, commentMeetingInvite,
        refereeThankYouNote, commentThankYouNote,
        refereeOperationResults, commentOperationResults,
        refereeAnalysisResults, commentAnalysisResults,
        refereeImprovementPlan, commentImprovementPlan,
        refereeAnnualReport, commentAnnualReport,
        localID
      ]);

      res.status(200).send('Admin data inserted successfully');
    } else {
      const {
        localMeetingAgenda, localMemberSignatures, meetingMinutes, photos,
        appointmentOrder, subcommittee, managementPlan, protectionPlan,
        surveyPlan, coordination, expenseSummary, meetingInvite, thankYouNote,
        operationResults, analysisResults, improvementPlan, annualReport,
        budgetDetails
      } = req.body;

      // Construct SQL query for non-admin insert
      const query = `
      INSERT INTO FieldEx.localManageData (
          localMeetingAgenda, localMemberSignatures, meetingMinutes, photos,
          appointmentOrder, subcommittee, managementPlan, protectionPlan,
          surveyPlan, coordination, expenseSummary, meetingInvite, thankYouNote,
          operationResults, analysisResults, improvementPlan, annualReport,
          budget1_year, budget1_budget, budget1_expense, budget1_remaining,
          budget2_year, budget2_budget, budget2_expense, budget2_remaining
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
  const values = [
    localMeetingAgenda, localMemberSignatures, meetingMinutes, photos,
    appointmentOrder, subcommittee, managementPlan, protectionPlan,
    surveyPlan, coordination, expenseSummary, meetingInvite, thankYouNote,
    operationResults, analysisResults, improvementPlan, annualReport,
    budgetDetails[0].year, budgetDetails[0].budget, budgetDetails[0].expense, budgetDetails[0].remaining,
    budgetDetails[1].year, budgetDetails[1].budget, budgetDetails[1].expense, budgetDetails[1].remaining
];

      // Execute non-admin insert query
      await connection.query(query, values);

      res.status(200).send('Non-admin data inserted successfully');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing the request');
  }
});

router.get('/getDataEmail/:email', verifyUser, async (req, res) => {
  const email = req.params.email;
  const connection = await getConnector().getConnection();
  try {
    // Query to fetch user details based on email
    const [userResults] = await connection.query('SELECT * FROM FieldEx.users WHERE email = ?', [email]);
    console.log('User Results:', userResults);

    if (userResults.length === 0) {
      res.status(404).send('ไม่พบผู้ใช้ด้วยอีเมลที่ระบุ');
      return;
    }

    const user = userResults[0];
    let dataResults;
    let localManageData = [];
    let localOperaFirst = [];

    if (user.institutionID) {
      // Fetch data from FieldEx.institution if institutionID is present
      [dataResults] = await connection.query('SELECT * FROM FieldEx.institution WHERE institutionID = ?', [user.institutionID]);
    } else if (user.localID) {
      // Fetch data from FieldEx.localGovernmentData, FieldEx.localManageData, and FieldEx.localOperaFirst if localID is present
      [dataResults] = await connection.query('SELECT * FROM FieldEx.localGovernmentData WHERE localID = ?', [user.localID]);
      [localManageData] = await connection.query('SELECT * FROM FieldEx.localManageData WHERE localID = ?', [user.localID]);
      [localOperaFirst] = await connection.query('SELECT * FROM FieldEx.localOperaFirst WHERE localID = ?', [user.localID]);
    }

    if (!dataResults || dataResults.length === 0) {
      res.status(404).send('ไม่พบข้อมูลที่เกี่ยวข้อง');
      return;
    }

    res.json({ dataResults, localManageData, localOperaFirst });
  } catch (error) {
    console.error('เกิดข้อผิดพลาด: ' + error.message);
    res.status(500).send('เกิดข้อผิดพลาดบางอย่าง');
  } finally {
    connection.release();
  }
});



// Export the router
module.exports = router;
