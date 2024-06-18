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
      const [institutionData] = await connection.query('SELECT * FROM FieldEx.institution WHERE institutionID = ?', [institutionID]);

      // Fetch education levels data
      const [educationLevelsData] = await connection.query('SELECT * FROM FieldEx.educationLevels WHERE institutionID = ?', [institutionID]);

      // Fetch other education levels data
      const [otherEducationLevelsData] = await connection.query('SELECT * FROM FieldEx.otherEducationLevels WHERE institutionID = ?', [institutionID]);

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
  const connection = await getConnector().getConnection();
  const { organizationName, localID, phoneNumber, faxNumber, email, subDistrict, district, province, affiliation, headmasterName, highlightedActivities } = req.body;

  try {
    const formData = {
      organizationName, localID, phoneNumber, faxNumber, email, subDistrict, district, province, affiliation, headmasterName, highlightedActivities
    };
    const userEmail = req.user.email;
    const role = req.user.role;
    
    try {
      const [userResult] = await connection.query('SELECT * FROM users WHERE email = ?', [userEmail]);
      if (userResult.length === 0) {
        return res.status(404).json({
          message: "User not found"
        });
      }
      
      if (role !== 'admin') {
        await connection.query('UPDATE users SET localID = ? WHERE email = ?', [localID, userEmail]);
      }

      // Check if localID already exists
      const [localIDResult] = await connection.query('SELECT * FROM FieldEx.localGovernmentData WHERE localID = ?', [localID]);
      if (localIDResult.length > 0) {
        // Update existing record
        await connection.query('UPDATE FieldEx.localGovernmentData SET ? WHERE localID = ?', [formData, localID]);
      } else {
        // Insert new record
        await connection.query('INSERT INTO FieldEx.localGovernmentData SET ?', formData);
      }

      console.log(formData);
      res.status(200).json({
        message: "Submit Success"
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: "Submit failed",
      error: error.message
    });
  }
});



router.post('/localsubmit', verifyUser, async (req, res) => {
  const role = req.user.role;
  const { emailUser, ...requestBody } = req.body;
  const connection = await getConnector().getConnection();

  try {
    // Fetch user data including localId and institutionID
    const [userData] = await connection.query('SELECT localId, institutionID FROM FieldEx.users WHERE email = ?', emailUser);

    let institutionID = null;
    let localID = null;

    // Extract localId and institutionID from userData
    userData.forEach(user => {
      if (!institutionID) institutionID = user.institutionID;
      if (!localID) localID = user.localId;
      if (institutionID && localID) return;
    });

    // Check if localID exists in FieldEx.localManageData
    const [existingData] = await connection.query('SELECT 1 FROM FieldEx.localManageData WHERE localID = ?', localID);

    if (role === 'admin') {
      const adminFields = [
        'refereeLocalMeetingAgenda', 'commentLocalMeetingAgenda', 
        'refereeLocalMemberSignatures', 'commentLocalMemberSignatures',
        'refereeMeetingMinutes', 'commentMeetingMinutes', 
        'refereePhotos', 'commentPhotos', 
        'refereeAppointmentOrder', 'commentAppointmentOrder', 
        'refereeSubcommittee', 'commentSubcommittee', 
        'refereeManagementPlan', 'commentManagementPlan', 
        'refereeProtectionPlan', 'commentProtectionPlan', 
        'refereeSurveyPlan', 'commentSurveyPlan', 
        'refereeCoordination', 'commentCoordination', 
        'refereeExpenseSummary', 'commentExpenseSummary', 
        'refereeMeetingInvite', 'commentMeetingInvite', 
        'refereeThankYouNote', 'commentThankYouNote', 
        'refereeOperationResults', 'commentOperationResults', 
        'refereeAnalysisResults', 'commentAnalysisResults', 
        'refereeImprovementPlan', 'commentImprovementPlan', 
        'refereeAnnualReport', 'commentAnnualReport'
      ];

      const adminUpdateQuery = `
        UPDATE FieldEx.localManageData
        SET ${adminFields.map(field => `${field} = ?`).join(', ')}
        WHERE localID = ?`;

      if (existingData.length > 0) {
        await connection.query(adminUpdateQuery, [...adminFields.map(field => requestBody[field]), localID]);
        res.status(200).send('Admin data updated successfully');
      } else {
        res.status(400).send('Local ID not found for update');
      }
    } else {
      const nonAdminFields = [
        'localMeetingAgenda', 'localMemberSignatures', 'meetingMinutes', 'photos',
        'appointmentOrder', 'subcommittee', 'managementPlan', 'protectionPlan',
        'surveyPlan', 'coordination', 'expenseSummary', 'meetingInvite', 'thankYouNote',
        'operationResults', 'analysisResults', 'improvementPlan', 'annualReport',
        'budget1_year', 'budget1_budget', 'budget1_expense', 'budget1_remaining',
        'budget2_year', 'budget2_budget', 'budget2_expense', 'budget2_remaining'
      ];

      const nonAdminUpdateQuery = `
        UPDATE FieldEx.localManageData
        SET ${nonAdminFields.slice(0, -4).map(field => `${field} = ?`).join(', ')},
        budget1_year = ?, budget1_budget = ?, budget1_expense = ?, budget1_remaining = ?,
        budget2_year = ?, budget2_budget = ?, budget2_expense = ?, budget2_remaining = ?
        WHERE localID = ?`;

      if (existingData.length > 0) {
        await connection.query(nonAdminUpdateQuery, [
          ...nonAdminFields.slice(0, -4).map(field => requestBody[field]),
          requestBody.budgetDetails[0].year, requestBody.budgetDetails[0].budget, requestBody.budgetDetails[0].expense, requestBody.budgetDetails[0].remaining,
          requestBody.budgetDetails[1].year, requestBody.budgetDetails[1].budget, requestBody.budgetDetails[1].expense, requestBody.budgetDetails[1].remaining,
          localID
        ]);
        res.status(200).send('Non-admin data updated successfully');
      } else {
        const insertQuery = `
          INSERT INTO FieldEx.localManageData (${nonAdminFields.join(', ')}, localID)
          VALUES (${nonAdminFields.map(() => '?').join(', ')}, ?)`;

        await connection.query(insertQuery, [
          ...nonAdminFields.slice(0, -4).map(field => requestBody[field]),
          requestBody.budgetDetails[0].year, requestBody.budgetDetails[0].budget, requestBody.budgetDetails[0].expense, requestBody.budgetDetails[0].remaining,
          requestBody.budgetDetails[1].year, requestBody.budgetDetails[1].budget, requestBody.budgetDetails[1].expense, requestBody.budgetDetails[1].remaining,
          localID
        ]);
        res.status(200).send('Non-admin data inserted successfully');
      }
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

router.post('/localopera', verifyUser, async (req, res) => {
  const role = req.user.role;
  const { emailUser } = req.body; // Ensure formData is received in req.body
  
  const connection = await getConnector().getConnection();
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

    let sql;
    let values;

    if (role === 'admin') {
      // Admin updates existing data if localID is found
      sql = `
        UPDATE FieldEx.localOperaFirst SET
          year1BoundaryAreaProtection = ?, area1BoundaryAreaProtection = ?, scoreBoundary = ?,
          refereeScoreBoundary = ?, commentBoundaryAreaProtection = ?, scoreSurveyResources = ?,
          refereeScoreSurveyResources = ?, commentSurveyResources = ?, scoreClassifyResources = ?,
          refereeScoreClassifyResources = ?, commentClassifyResources = ?, scoreTagResources = ?,
          refereeScoreTagResources = ?, commentTagResources = ?, scoreMappingBoundary = ?,
          refereeScoreMappingBoundary = ?, commentMappingBoundary = ?, scoreStudyResources = ?,
          refereeScoreStudyResources = ?, commentStudyResources = ?, scorePhotoResources = ?,
          refereeScorePhotoResources = ?, commentPhotoResources = ?, scoreSampleResources = ?,
          refereeScoreSampleResources = ?, commentSampleResources = ?, scoreRegisterResources = ?,
          refereeScoreRegisterResources = ?, commentRegisterResources = ?, scorePhotoRegisterResources = ?,
          refereeScorePhotoRegisterResources = ?, commentPhotoRegisterResources = ?, scoreCareResources = ?,
          refereeScoreCareResources = ?, commentCareResources = ?
        WHERE localID = ?
      `;
      values = [
        formData.year1BoundaryAreaProtection, formData.area1BoundaryAreaProtection, formData.scoreBoundary,
        formData.refereeScoreBoundary, formData.commentBoundaryAreaProtection, formData.scoreSurveyResources,
        formData.refereeScoreSurveyResources, formData.commentSurveyResources, formData.scoreClassifyResources,
        formData.refereeScoreClassifyResources, formData.commentClassifyResources, formData.scoreTagResources,
        formData.refereeScoreTagResources, formData.commentTagResources, formData.scoreMappingBoundary,
        formData.refereeScoreMappingBoundary, formData.commentMappingBoundary, formData.scoreStudyResources,
        formData.refereeScoreStudyResources, formData.commentStudyResources, formData.scorePhotoResources,
        formData.refereeScorePhotoResources, formData.commentPhotoResources, formData.scoreSampleResources,
        formData.refereeScoreSampleResources, formData.commentSampleResources, formData.scoreRegisterResources,
        formData.refereeScoreRegisterResources, formData.commentRegisterResources, formData.scorePhotoRegisterResources,
        formData.refereeScorePhotoRegisterResources, formData.commentPhotoRegisterResources, formData.scoreCareResources,
        formData.refereeScoreCareResources, formData.commentCareResources,
        localID
      ];
    } else {
      const {
        year1BoundaryAreaProtection, area1BoundaryAreaProtection, scoreBoundary, scoreSurveyResources,
        scoreClassifyResources, scoreTagResources, scoreMappingBoundary, scoreStudyResources,
        scorePhotoResources, scoreSampleResources, scoreRegisterResources, scorePhotoRegisterResources,
        scoreCareResources
      } = req.body;
      
      sql = `
        INSERT INTO FieldEx.localOperaFirst (
          localID, year1BoundaryAreaProtection, area1BoundaryAreaProtection, scoreBoundary,
          scoreSurveyResources, scoreClassifyResources, scoreTagResources, scoreMappingBoundary,
          scoreStudyResources, scorePhotoResources, scoreSampleResources, scoreRegisterResources,
          scorePhotoRegisterResources, scoreCareResources
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          year1BoundaryAreaProtection = VALUES(year1BoundaryAreaProtection),
          area1BoundaryAreaProtection = VALUES(area1BoundaryAreaProtection),
          scoreBoundary = VALUES(scoreBoundary),
          scoreSurveyResources = VALUES(scoreSurveyResources),
          scoreClassifyResources = VALUES(scoreClassifyResources),
          scoreTagResources = VALUES(scoreTagResources),
          scoreMappingBoundary = VALUES(scoreMappingBoundary),
          scoreStudyResources = VALUES(scoreStudyResources),
          scorePhotoResources = VALUES(scorePhotoResources),
          scoreSampleResources = VALUES(scoreSampleResources),
          scoreRegisterResources = VALUES(scoreRegisterResources),
          scorePhotoRegisterResources = VALUES(scorePhotoRegisterResources),
          scoreCareResources = VALUES(scoreCareResources)
      `;
      
      const values = [
        localID, year1BoundaryAreaProtection, area1BoundaryAreaProtection, scoreBoundary, scoreSurveyResources,
        scoreClassifyResources, scoreTagResources, scoreMappingBoundary, scoreStudyResources,
        scorePhotoResources, scoreSampleResources, scoreRegisterResources, scorePhotoRegisterResources,
        scoreCareResources
      ];
      
      // Execute the query
      const [result] = await connection.query(sql, values);
      
    }
    // Send response indicating success
    res.status(200).send('Form data saved successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing the request');
  } finally {
    connection.release(); // Release the connection in all cases
  }
});




// Export the router
module.exports = router;
