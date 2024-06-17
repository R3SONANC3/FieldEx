const express = require('express');
const { verifyUser } = require('../middleware');
const router = express.Router();
const { getConnector } = require('../config');

// Define your routes using router
router.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "Success" });
});

router.get('/usersData', verifyUser, async (req, res) => {
  const connection = await getConnector().getConnection();
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      message: "Access denied"
    });
  }
  try {
    // ดึงข้อมูล email, localId และ institutionID จากตาราง users
    const [userData] = await connection.query('SELECT email, localId, institutionID FROM users WHERE localId IS NOT NULL OR institutionID IS NOT NULL');

    // สร้างอาร์เรย์ว่างเพื่อเก็บข้อมูล
    const institutionIDs = [];
    const localIDs = [];

    // วนลูปผ่านข้อมูลทุกตัวใน userData เพื่อแยก email และ institutionID หรือ localID
    userData.forEach(user => {
      // เก็บ email ไว้ทุกครั้ง
      const userEmail = user.email;
      if (user.institutionID !== null) {
        institutionIDs.push({ userEmail, id: user.institutionID });
      }
      if (user.localId !== null) {
        localIDs.push({ userEmail, id: user.localId });
      }
    });

    // ดึงข้อมูล institutionName จาก FieldEx.institution
    const institutionNames = await Promise.all(institutionIDs.map(async ({ id }) => {
      const [institutionData] = await connection.query('SELECT institutionName FROM FieldEx.institution WHERE institutionID = ?', [id]);
      return institutionData.length > 0 ? institutionData[0].institutionName : null;
    }));

    // ดึงข้อมูล organizationName จาก FieldEx.localGovernmentData
    const organizationNames = await Promise.all(localIDs.map(async ({ id }) => {
      const [organizationData] = await connection.query('SELECT organizationName FROM FieldEx.localGovernmentData WHERE localID = ?', [id]);
      return organizationData.length > 0 ? organizationData[0].organizationName : null;
    }));

    res.status(200).json({
      institutionIDs: institutionIDs.map((data, index) => ({ ...data, institutionName: institutionNames[index] })),
      localIDs: localIDs.map((data, index) => ({ ...data, organizationName: organizationNames[index] }))
    });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({
      message: "Failed to retrieve users",
      error
    });
  }
});

router.get('/fetchforms', verifyUser, async (req, res) => {
  const connection = await getConnector().getConnection();
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({
        message: "Unauthorized: User information is missing"
      });
    }
    // Start a transaction
    await connection.beginTransaction();
    // Query to find institution ID and local ID from email
    const [userResults] = await connection.query('SELECT institutionID, localID FROM FieldEx.users WHERE email = ?', [req.user.email]);

    if (userResults.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const { institutionID, localID } = userResults[0];
    let formResults;
    if (localID) {
      // Query to find form data from local ID
      [formResults] = await connection.query('SELECT * FROM FieldEx.localGovernmentData WHERE localID = ?', [localID]);
    } else {
      // Query to find form data from institution ID
      [formResults] = await connection.query('SELECT * FROM FieldEx.institution WHERE institutionID = ?', [institutionID]);
    }

    if (formResults.length === 0) {
      // If no forms are found, rollback the transaction and send a 404 response
      await connection.rollback();
      return res.status(404).json({
        message: "No forms found for the given ID"
      });
    }

    // Commit the transaction if everything is successful
    await connection.commit();

    res.json(formResults);
  } catch (error) {
    console.error('Error retrieving forms:', error);

    // Rollback the transaction in case of an error
    await connection.rollback();

    res.status(500).json({
      message: "Failed to retrieve forms",
      error: error.message
    });
  } finally {
    // Release the connection back to the pool
    connection.release();
  }
});

module.exports = router;
