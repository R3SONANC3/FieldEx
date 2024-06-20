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
      const [localOperaFirst] = await connection.query('SELECT * FROM FieldEx.localOperaFirst WHERE localID = ?', [localID]);
      const [localOperaSec] = await connection.query(`SELECT * FROM FieldEx.localOperaSecond WHERE localID = ?`, [localID]);
      const [localOperaThird] = await connection.query(`SELECT * FROM FieldEx.localOperaThird WHERE localID = ?`, [localID]);
      const [localResult] = await connection.query(`SELECT * FROM FieldEx.localResult WHERE localID = ?`, [localID]);

      await connection.commit();
      return res.status(200).json({
        localGovernmentData, localManageData, localOperaFirst, localOperaSec, localOperaThird, localResult
      });
    } else {
      const [institutionData] = await connection.query('SELECT * FROM FieldEx.institution WHERE institutionID = ?', [institutionID]);
      const [educationLevelsData] = await connection.query('SELECT * FROM FieldEx.educationLevels WHERE institutionID = ?', [institutionID]);
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
  const userEmail = req.user.email
  const { emailUser, ...requestBody } = req.body;
  const connection = await getConnector().getConnection();

  try {
    // Fetch user data including localId and institutionID
    const [userData] = await connection.query('SELECT localId, institutionID FROM FieldEx.users WHERE email = ?', emailUser || userEmail);
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
      const adminFields = ['refereeLocalMeetingAgenda', 'commentLocalMeetingAgenda', 'refereeLocalMemberSignatures', 'commentLocalMemberSignatures', 'refereeMeetingMinutes', 'commentMeetingMinutes', 'refereePhotos', 'commentPhotos', 'refereeAppointmentOrder', 'commentAppointmentOrder', 'refereeSubcommittee', 'commentSubcommittee', 'refereeManagementPlan', 'commentManagementPlan', 'refereeProtectionPlan', 'commentProtectionPlan', 'refereeSurveyPlan', 'commentSurveyPlan', 'refereeCoordination', 'commentCoordination', 'refereeExpenseSummary', 'commentExpenseSummary', 'refereeMeetingInvite', 'commentMeetingInvite', 'refereeThankYouNote', 'commentThankYouNote', 'refereeOperationResults', 'commentOperationResults', 'refereeAnalysisResults', 'commentAnalysisResults', 'refereeImprovementPlan', 'commentImprovementPlan', 'refereeAnnualReport', 'commentAnnualReport', 'refereeTotal'];

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
      const nonAdminFields = ['localMeetingAgenda', 'localMemberSignatures', 'meetingMinutes', 'photos', 'appointmentOrder', 'subcommittee', 'managementPlan', 'protectionPlan', 'surveyPlan', 'coordination', 'expenseSummary', 'meetingInvite', 'thankYouNote', 'organizationTotal', 'operationResults', 'analysisResults', 'improvementPlan', 'annualReport', 'budget1_year', 'budget1_budget', 'budget1_expense', 'budget1_remaining', 'budget2_year', 'budget2_budget', 'budget2_expense', 'budget2_remaining'];

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
    const [userResults] = await connection.query('SELECT * FROM FieldEx.users WHERE email = ?', [email]);
    if (userResults.length === 0) {
      res.status(404).send('ไม่พบผู้ใช้ด้วยอีเมลที่ระบุ');
      return;
    }

    const user = userResults[0];
    let dataResults = [], localManageData = [], localOperaFirst = [], localOperaSec = [], localOperaThird = [], localResult = [];

    if (user.institutionID) {
      [dataResults] = await connection.query('SELECT * FROM FieldEx.institution WHERE institutionID = ?', [user.institutionID]);
    } else if (user.localID) {
      [dataResults] = await connection.query('SELECT * FROM FieldEx.localGovernmentData WHERE localID = ?', [user.localID]);
      [localManageData] = await connection.query('SELECT * FROM FieldEx.localManageData WHERE localID = ?', [user.localID]);
      [localOperaFirst] = await connection.query('SELECT * FROM FieldEx.localOperaFirst WHERE localID = ?', [user.localID]);
      [localOperaSec] = await connection.query('SELECT * FROM FieldEx.localOperaSecond WHERE localID = ?', [user.localID]);
      [localOperaThird] = await connection.query('SELECT * FROM FieldEx.localOperaThird WHERE localID = ?', [user.localID]);
      [localResult] = await connection.query('SELECT * FROM FieldEx.localResult WHERE localID = ?', [user.localID]);
    }

    if (dataResults.length === 0) {
      res.status(404).send('ไม่พบข้อมูลที่เกี่ยวข้อง');
      return;
    }

    res.json({ dataResults, localManageData, localOperaFirst, localOperaSec, localOperaThird, localResult });
  } catch (error) {
    console.error('เกิดข้อผิดพลาด: ' + error.message);
    res.status(500).send('เกิดข้อผิดพลาดบางอย่าง');
  } finally {
    connection.release();
  }
});

router.post('/localopera', verifyUser, async (req, res) => {
  const { role, email } = req.user;
  const { totalRefereeScore, totalScore, emailUser, ...formData } = req.body;
  const connection = await getConnector().getConnection();

  try {
    // Fetch user data including localId and institutionID
    const [userData] = await connection.query('SELECT localId, institutionID FROM FieldEx.users WHERE email = ?', [emailUser || email]);
    const { localId, institutionID } = userData[0] || {};

    let sql, values;

    if (role === 'admin') {
      sql = `
        UPDATE FieldEx.localOperaFirst SET
          year1BoundaryAreaProtection = ?, area1BoundaryAreaProtection = ?, scoreBoundary = ?, refereeScoreBoundary = ?, commentBoundaryAreaProtection = ?,
          scoreSurveyResources = ?, refereeScoreSurveyResources = ?, commentSurveyResources = ?, scoreClassifyResources = ?, refereeScoreClassifyResources = ?, commentClassifyResources = ?,
          scoreTagResources = ?, refereeScoreTagResources = ?, commentTagResources = ?, scoreMappingBoundary = ?, refereeScoreMappingBoundary = ?, commentMappingBoundary = ?,
          scoreStudyResources = ?, refereeScoreStudyResources = ?, commentStudyResources = ?, scorePhotoResources = ?, refereeScorePhotoResources = ?, commentPhotoResources = ?,
          scoreSampleResources = ?, refereeScoreSampleResources = ?, commentSampleResources = ?, scoreRegisterResources = ?, refereeScoreRegisterResources = ?, commentRegisterResources = ?,
          scorePhotoRegisterResources = ?, refereeScorePhotoRegisterResources = ?, commentPhotoRegisterResources = ?, scoreCareResources = ?, refereeScoreCareResources = ?, commentCareResources = ?,totalRefereeScore = ?
        WHERE localID = ?
      `;
      values = [
        formData.year1BoundaryAreaProtection, formData.area1BoundaryAreaProtection, formData.scoreBoundary, formData.refereeScoreBoundary, formData.commentBoundaryAreaProtection,
        formData.scoreSurveyResources, formData.refereeScoreSurveyResources, formData.commentSurveyResources, formData.scoreClassifyResources, formData.refereeScoreClassifyResources, formData.commentClassifyResources,
        formData.scoreTagResources, formData.refereeScoreTagResources, formData.commentTagResources, formData.scoreMappingBoundary, formData.refereeScoreMappingBoundary, formData.commentMappingBoundary,
        formData.scoreStudyResources, formData.refereeScoreStudyResources, formData.commentStudyResources, formData.scorePhotoResources, formData.refereeScorePhotoResources, formData.commentPhotoResources,
        formData.scoreSampleResources, formData.refereeScoreSampleResources, formData.commentSampleResources, formData.scoreRegisterResources, formData.refereeScoreRegisterResources, formData.commentRegisterResources,
        formData.scorePhotoRegisterResources, formData.refereeScorePhotoRegisterResources, formData.commentPhotoRegisterResources, formData.scoreCareResources, formData.refereeScoreCareResources, formData.commentCareResources,
        totalRefereeScore,
        localId
      ];
    } else {
      sql = `
        INSERT INTO FieldEx.localOperaFirst (
          localID, year1BoundaryAreaProtection, area1BoundaryAreaProtection, scoreBoundary,
          scoreSurveyResources, scoreClassifyResources, scoreTagResources, scoreMappingBoundary,
          scoreStudyResources, scorePhotoResources, scoreSampleResources, scoreRegisterResources,
          scorePhotoRegisterResources, scoreCareResources, totalScore
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
          scoreCareResources = VALUES(scoreCareResources),
          totalScore = VALUES(totalScore)
      `;

      values = [
        localId, formData.year1BoundaryAreaProtection, formData.area1BoundaryAreaProtection, formData.scoreBoundary,
        formData.scoreSurveyResources, formData.scoreClassifyResources, formData.scoreTagResources, formData.scoreMappingBoundary,
        formData.scoreStudyResources, formData.scorePhotoResources, formData.scoreSampleResources, formData.scoreRegisterResources,
        formData.scorePhotoRegisterResources, formData.scoreCareResources, totalScore
      ];
    }

    await connection.query(sql, values);
    res.status(200).send('Form data saved successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing the request');
  } finally {
    connection.release();
  }
});

router.post('/localOperaSec', verifyUser, async (req, res) => {
  const { role, email } = req.user;
  const { refereeTotal, organizationTotal, emailUser, ...formData } = req.body;
  const connection = await getConnector().getConnection();

  try {
    const [userData] = await connection.query('SELECT localId, institutionID FROM FieldEx.users WHERE email = ?', [emailUser || email]);
    const { localId: localID } = userData[0] || {};

    let sql, values;

    if (role === 'admin') {
      sql = `
        UPDATE FieldEx.localOperaSecond SET
          refereeBasicInfo = ?, commentBasicInfo = ?, refereeOccupationalInfo = ?, commentOccupationalInfo = ?,
          refereePhysicalInfo = ?, commentPhysicalInfo = ?, refereeCommunityHistory = ?, commentCommunityHistory = ?,
          refereePlantUsage = ?, commentPlantUsage = ?, refereeAnimalUsage = ?, commentAnimalUsage = ?,
          refereeOtherBiologicalUsage = ?, commentOtherBiologicalUsage = ?, refereeLocalWisdom = ?, commentLocalWisdom = ?,
          refereeArchaeologicalResources = ?, commentArchaeologicalResources = ?, refereeResourceSurveyReport = ?, commentResourceSurveyReport = ?, refereeTotal = ?
        WHERE localID = ?
      `;
      values = [
        formData.refereeBasicInfo, formData.commentBasicInfo, formData.refereeOccupationalInfo, formData.commentOccupationalInfo,
        formData.refereePhysicalInfo, formData.commentPhysicalInfo, formData.refereeCommunityHistory, formData.commentCommunityHistory,
        formData.refereePlantUsage, formData.commentPlantUsage, formData.refereeAnimalUsage, formData.commentAnimalUsage,
        formData.refereeOtherBiologicalUsage, formData.commentOtherBiologicalUsage, formData.refereeLocalWisdom, formData.commentLocalWisdom,
        formData.refereeArchaeologicalResources, formData.commentArchaeologicalResources, formData.refereeResourceSurveyReport, formData.commentResourceSurveyReport, refereeTotal,
        localID
      ];
    } else {
      sql = `
        INSERT INTO FieldEx.localOperaSecond (
          localBasicInfo, localOccupationalInfo, localPhysicalInfo, localCommunityHistory,
          localPlantUsage, localAnimalUsage, localOtherBiologicalUsage, localLocalWisdom,
          localArchaeologicalResources, localResourceSurveyReport, localID, organizationTotal 
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          localBasicInfo = VALUES(localBasicInfo), localOccupationalInfo = VALUES(localOccupationalInfo),
          localPhysicalInfo = VALUES(localPhysicalInfo), localCommunityHistory = VALUES(localCommunityHistory),
          localPlantUsage = VALUES(localPlantUsage), localAnimalUsage = VALUES(localAnimalUsage),
          localOtherBiologicalUsage = VALUES(localOtherBiologicalUsage), localLocalWisdom = VALUES(localLocalWisdom),
          localArchaeologicalResources = VALUES(localArchaeologicalResources), localResourceSurveyReport = VALUES(localResourceSurveyReport), organizationTotal = VALUES(organizationTotal)
      `;
      values = [
        formData.localBasicInfo, formData.localOccupationalInfo, formData.localPhysicalInfo, formData.localCommunityHistory,
        formData.localPlantUsage, formData.localAnimalUsage, formData.localOtherBiologicalUsage, formData.localLocalWisdom,
        formData.localArchaeologicalResources, formData.localResourceSurveyReport, localID, organizationTotal
      ];
    }

    await connection.query(sql, values);
    res.status(200).send('Form data saved successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing the request');
  } finally {
    connection.release();
  }
});

  router.post('/localOperaThird', verifyUser, async (req, res) => {
    const { role, email } = req.user;
    const { totalScore, totalRefereeScore, emailUser, ...formData } = req.body;
    const connection = await getConnector().getConnection();
    console.log(totalScore);
    console.log(totalRefereeScore);

    try {
      const [userData] = await connection.query('SELECT localId, institutionID FROM FieldEx.users WHERE email = ?', [emailUser || email]);
      const { localId: localID } = userData[0] || {};

      let sql, values;

      if (role === 'admin') {
        const {
          refereeScoreInput31, comment31, refereeScoreInput32, comment32, refereeScoreInput33, comment33,
          refereeScoreInput41, comment41, refereeScoreInput42, comment42, refereeScoreInput51, comment51,
          refereeScoreInput52, comment52, refereeScoreInput61, comment61, refereeScoreInput62, comment62,
          totalScore
        } = formData;

        sql = `
          UPDATE FieldEx.localOperaThird SET
            refereeScoreInput31 = ?, comment31 = ?, refereeScoreInput32 = ?, comment32 = ?,
            refereeScoreInput33 = ?, comment33 = ?, refereeScoreInput41 = ?, comment41 = ?,
            refereeScoreInput42 = ?, comment42 = ?, refereeScoreInput51 = ?, comment51 = ?,
            refereeScoreInput52 = ?, comment52 = ?, refereeScoreInput61 = ?, comment61 = ?,
            refereeScoreInput62 = ?, comment62 = ?, totalScore = ?
          WHERE localID = ?
        `;
        values = [
          refereeScoreInput31, comment31, refereeScoreInput32, comment32, refereeScoreInput33, comment33,
          refereeScoreInput41, comment41, refereeScoreInput42, comment42, refereeScoreInput51, comment51,
          refereeScoreInput52, comment52, refereeScoreInput61, comment61, refereeScoreInput62, comment62,
          totalScore, localID,
        ];
      } else {
        const {
          scoreInput31, scoreInput32, scoreInput33, scoreInput41, scoreInput42,
          scoreInput51, scoreInput52, scoreInput61, scoreInput62, totalRefereeScore
        } = formData;
        sql = `
          INSERT INTO FieldEx.localOperaThird (
            scoreInput31, scoreInput32, scoreInput33, scoreInput41, scoreInput42,
            scoreInput51, scoreInput52, scoreInput61, scoreInput62, localID, totalRefereeScore
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            scoreInput31 = VALUES(scoreInput31), scoreInput32 = VALUES(scoreInput32),
            scoreInput33 = VALUES(scoreInput33), scoreInput41 = VALUES(scoreInput41),
            scoreInput42 = VALUES(scoreInput42), scoreInput51 = VALUES(scoreInput51),
            scoreInput52 = VALUES(scoreInput52), scoreInput61 = VALUES(scoreInput61),
            scoreInput62 = VALUES(scoreInput62), totalRefereeScore = VALUES(totalRefereeScore)
        `;
        values = [
          scoreInput31, scoreInput32, scoreInput33, scoreInput41, scoreInput42,
          scoreInput51, scoreInput52, scoreInput61, scoreInput62, localID, totalRefereeScore
        ];
      }

      await connection.query(sql, values);
      res.status(200).send('Form data saved successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while processing the request');
    } finally {
      connection.release();
    }
  });

router.post('/localResult', verifyUser, async (req, res) => {
  const { role, email } = req.user;
  const { totalScore, totalRefereeScore, emailUser, ...formData } = req.body;
  const connection = await getConnector().getConnection();

  try {
    const [userData] = await connection.query('SELECT localId, institutionID FROM FieldEx.users WHERE email = ?', [emailUser || email]);
    const { localId: localID } = userData[0] || {};

    let sql, values;

    if (role === 'admin') {
      const {
        cleanlinessCommittees, orderlinessCommittees, greeneryCommittees, atmosphereCommittees,
        responsibilityCommittees, honestyCommittees, perseveranceCommittees, unityCommittees,
        gratitudeCommittees, diligenceCommittees, localInvolvementCommittees, externalVisitCommittees,
        knowledgeSharingCommittees, cleanlinessComments, orderlinessComments, greeneryComments,
        atmosphereComments, responsibilityComments, honestyComments, perseveranceComments, unityComments,
        gratitudeComments, diligenceComments, localInvolvementComments, externalVisitComments,
        knowledgeSharingComments, perseverance2Committees, perseverance2Comments, knowledgeProvidingCommittees,
        knowledgeProvidingComments, externalVisit2Committees, externalVisit2Comments, totalRefereeScore
      } = formData;

      sql = `
        UPDATE FieldEx.localResult SET
          cleanlinessCommittees = ?, orderlinessCommittees = ?, greeneryCommittees = ?, atmosphereCommittees = ?,
          responsibilityCommittees = ?, honestyCommittees = ?, perseveranceCommittees = ?, unityCommittees = ?,
          gratitudeCommittees = ?, diligenceCommittees = ?, localInvolvementCommittees = ?, externalVisitCommittees = ?,
          knowledgeSharingCommittees = ?, cleanlinessComments = ?, orderlinessComments = ?, greeneryComments = ?,
          atmosphereComments = ?, responsibilityComments = ?, honestyComments = ?, perseveranceComments = ?,
          unityComments = ?, gratitudeComments = ?, diligenceComments = ?, localInvolvementComments = ?,
          externalVisitComments = ?, knowledgeSharingComments = ?, perseverance2Committees = ?, perseverance2Comments = ?,
          knowledgeProvidingCommittees = ?, knowledgeProvidingComments = ?, externalVisit2Committees = ?,
          externalVisit2Comments = ?, totalRefereeScore = ?
        WHERE localID = ?
      `;
      values = [
        cleanlinessCommittees, orderlinessCommittees, greeneryCommittees, atmosphereCommittees,
        responsibilityCommittees, honestyCommittees, perseveranceCommittees, unityCommittees,
        gratitudeCommittees, diligenceCommittees, localInvolvementCommittees, externalVisitCommittees,
        knowledgeSharingCommittees, cleanlinessComments, orderlinessComments, greeneryComments,
        atmosphereComments, responsibilityComments, honestyComments, perseveranceComments, unityComments,
        gratitudeComments, diligenceComments, localInvolvementComments, externalVisitComments,
        knowledgeSharingComments, perseverance2Committees, perseverance2Comments, knowledgeProvidingCommittees,
        knowledgeProvidingComments, externalVisit2Committees, externalVisit2Comments, localID, totalRefereeScore
      ];
    } else {
      const {
        cleanlinessLocal, orderlinessLocal, greeneryLocal, atmosphereLocal, responsibilityLocal,
        honestyLocal, perseveranceLocal, unityLocal, gratitudeLocal, diligenceLocal, localInvolvementLocal,
        externalVisitLocal, knowledgeSharingLocal, perseverance2Local, knowledgeProvidingLocal, externalVisit2Local,
        totalScore
      } = formData;

      sql = `
INSERT INTO FieldEx.localResult (
  cleanlinessLocal, orderlinessLocal, greeneryLocal, atmosphereLocal, responsibilityLocal,
  honestyLocal, perseveranceLocal, unityLocal, gratitudeLocal, diligenceLocal, localInvolvementLocal,
  externalVisitLocal, knowledgeSharingLocal, perseverance2Local, knowledgeProvidingLocal, externalVisit2Local, localID, totalScore
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
ON DUPLICATE KEY UPDATE
  cleanlinessLocal = VALUES(cleanlinessLocal), orderlinessLocal = VALUES(orderlinessLocal),
  greeneryLocal = VALUES(greeneryLocal), atmosphereLocal = VALUES(atmosphereLocal),
  responsibilityLocal = VALUES(responsibilityLocal), honestyLocal = VALUES(honestyLocal),
  perseveranceLocal = VALUES(perseveranceLocal), unityLocal = VALUES(unityLocal),
  gratitudeLocal = VALUES(gratitudeLocal), diligenceLocal = VALUES(diligenceLocal),
  localInvolvementLocal = VALUES(localInvolvementLocal), externalVisitLocal = VALUES(externalVisitLocal),
  knowledgeSharingLocal = VALUES(knowledgeSharingLocal), perseverance2Local = VALUES(perseverance2Local),
  knowledgeProvidingLocal = VALUES(knowledgeProvidingLocal), externalVisit2Local = VALUES(externalVisit2Local),
  localID = VALUES(localID), totalScore = VALUES(totalScore);

      `;
      values = [
        cleanlinessLocal, orderlinessLocal, greeneryLocal, atmosphereLocal, responsibilityLocal,
        honestyLocal, perseveranceLocal, unityLocal, gratitudeLocal, diligenceLocal, localInvolvementLocal,
        externalVisitLocal, knowledgeSharingLocal, perseverance2Local, knowledgeProvidingLocal, externalVisit2Local, localID, totalScore
      ];
    }

    await connection.query(sql, values);
    res.status(200).send('Form data saved successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing the request');
  } finally {
    connection.release();
  }
});

// Export the router
module.exports = router;
