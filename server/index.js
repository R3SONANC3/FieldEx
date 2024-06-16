const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise")
require('dotenv').config();

const {
  JWT_SECRET,
  DB_HOST,
  DB_USER,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT
} = process.env;

const API_PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());

// CORS configuration
const allowedOrigins = ["http://localhost:3000", "https://field-ex.vercel.app"];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

let connector = null;


const initMySQL = async () => {
  try {
    connector = await mysql.createPool(`mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);
    console.log('Connect to database Success!!');
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    setTimeout(initMySQL, 5000);
    throw error;
  }
};

const verifyUser = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

app.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "Success" });
});

app.post('/api/register', async (req, res) => {
  const connection = await connector.getConnection();
  try {
    const { email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const userData = { email, password: passwordHash, role: 'user' };
    await connection.beginTransaction();     // Start a transaction

    // Insert user data
    await connection.query('INSERT INTO FieldEx.users SET ?', [userData]);

    // Commit the transaction if everything is successful
    await connection.commit();

    res.json({ message: "Register Success" });
  } catch (error) {
    console.error('Error registering user:', error);

    // Rollback the transaction in case of an error
    await connection.rollback();

    res.status(500).json({ message: "Register failed", error });
  } finally {
    // Release the connection back to the pool
    connection.release();
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Query to find user by email
    const [results] = await connector.query('SELECT * FROM FieldEx.users WHERE email = ?', [email]);

    if (results.length === 0) {
      return res.status(400).json({ message: "Login Failed (Incorrect Email or Password)" });
    }

    const userData = results[0];

    // Compare provided password with hashed password in database
    const match = await bcrypt.compare(password, userData.password);

    if (!match) {
      return res.status(400).json({ message: "Login Failed (Incorrect Email or Password)" });
    }

    // Generate JWT token
    const token = jwt.sign({ email, role: userData.role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: "Login successful!", token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

app.get('/api/logout', (req, res) => {
  return res.json({
    Status: "Logout Success"
  });
});

app.get('/api/usersData', verifyUser, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      message: "Access denied"
    });
  }
  try {
    // ดึงข้อมูล email, localId และ institutionID จากตาราง users
    const [userData] = await connector.query('SELECT email, localId, institutionID FROM users WHERE localId IS NOT NULL OR institutionID IS NOT NULL');

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
      const [institutionData] = await connector.query('SELECT institutionName FROM FieldEx.institution WHERE institutionID = ?', [id]);
      return institutionData.length > 0 ? institutionData[0].institutionName : null;
    }));

    // ดึงข้อมูล organizationName จาก FieldEx.localGovernmentData
    const organizationNames = await Promise.all(localIDs.map(async ({ id }) => {
      const [organizationData] = await connector.query('SELECT organizationName FROM FieldEx.localGovernmentData WHERE localID = ?', [id]);
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

app.get('/api/fetchforms', verifyUser, async (req, res) => {
  const connection = await connector.getConnection();
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

app.post('/api/submitge', verifyUser, async (req, res) => {
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
    const [userResult] = await connector.query('SELECT * FROM users WHERE email = ?', [userEmail]);

    if (userResult.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Update institutionID in users table
    await connector.query('UPDATE users SET institutionID = ? WHERE email = ?', [institutionID, userEmail]);

    // Insert into institution table
    await connector.query('INSERT INTO FieldEx.institution SET ?', formData);

    // Prepare data for educationLevels table
    // Prepare data for educationLevels table
    const educationLevelsValues = educationLevels
      .filter(level => level !== 'อื่น ๆ') // Filter out "อื่น ๆ" from educationLevels
      .map(level => [
        institutionID, level, studentCounts[level], teacherCounts[level]
      ]);

    // Insert transformed education levels data into educationLevels table
    for (const eduLevel of educationLevelsValues) {
      await connector.query('INSERT INTO FieldEx.educationLevels (institutionID, educationLevel, studentCount, teacherCount) VALUES (?, ?, ?, ?)', eduLevel);
    }


    // Insert other education levels
    const otherLevels = { institutionID, otherEducationLevel, otherStudentCount, otherTeacherCount };
    await connector.query('INSERT INTO FieldEx.otherEducationLevels SET ?', otherLevels);

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

app.get('/api/fetchData', verifyUser, async (req, res) => {
  const connection = await connector.getConnection();
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
      const [localManageData] = await connection.query(`SELECT * FROM FieldEx.localManageData WHERE localID = ?`, [localID])

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

app.post('/api/submitlc', verifyUser, async (req, res) => {
  const { organizationName, localID, phoneNumber, faxNumber, email, subDistrict, district, province, affiliation, headmasterName, highlightedActivities,
  } = req.body;

  try {
    const formData = {
      organizationName, localID, phoneNumber, faxNumber, email, subDistrict, district, province, affiliation, headmasterName, highlightedActivities,
    }
    const userEmail = req.user.email;
    const [userResult] = await connector.query('SELECT * FROM users WHERE email = ?', [userEmail]);
    if (userResult.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    await connector.query('UPDATE users SET localID = ? WHERE email = ?', [localID, userEmail]);

    await connector.query(`INSERT INTO FieldEx.localGovernmentData SET ?`, formData)
    console.log(formData);
    res.status(200).json({
      message: "Submit Success",
    })
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: "Submit failed",
      error: error.message
    });
  }
});

app.put('/api/updateData', verifyUser, async (req, res) => {
  const { organizationName, localID, phoneNumber, faxNumber, email, subDistrict, district, province, affiliation, headmasterName, highlightedActivities
  } = req.body;

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

    await connector.query('UPDATE FieldEx.localGovernmentData SET ? WHERE localID = ?', [formData, localID]);

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

app.post('/api/localsubmit', verifyUser, async (req, res) => {
  const role = req.user.role;
  const { emailUser } = req.body;

  try {
    // Fetch user data including localId and institutionID
    const [userData] = await connector.query('SELECT localId, institutionID FROM FieldEx.users WHERE email = ?', emailUser);

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
        localMeetingAgenda, localMemberSignatures, meetingMinutes, photos, appointmentOrder, subcommittee, managementPlan,
        protectionPlan, surveyPlan, coordination, expenseSummary, meetingInvite, thankYouNote, operationResults,
        analysisResults, improvementPlan, annualReport, budgetDetails
      } = req.body;

      // Construct SQL query for non-admin insert
      const nonAdminInsertQuery = `
        INSERT INTO FieldEx.localManageData (
          localId, institutionID, localMeetingAgenda, localMemberSignatures, meetingMinutes, photos, appointmentOrder, 
          subcommittee, managementPlan, protectionPlan, surveyPlan, coordination, expenseSummary, meetingInvite, thankYouNote, 
          operationResults, analysisResults, improvementPlan, annualReport, budgetYear1, budget1, expense1, remaining1, 
          budgetYear2, budget2, expense2, remaining2
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      // Execute non-admin insert query
      await connector.query(nonAdminInsertQuery, [
        localID, institutionID, localMeetingAgenda, localMemberSignatures, meetingMinutes, photos, appointmentOrder,
        subcommittee, managementPlan, protectionPlan, surveyPlan, coordination, expenseSummary, meetingInvite, thankYouNote,
        operationResults, analysisResults, improvementPlan, annualReport, budgetDetails[0].year, budgetDetails[0].budget,
        budgetDetails[0].expense, budgetDetails[0].remaining, budgetDetails[1].year, budgetDetails[1].budget,
        budgetDetails[1].expense, budgetDetails[1].remaining
      ]);

      res.status(200).send('Non-admin data inserted successfully');
    }
  } catch (error) {
    console.error(error);
    await initMySQL();
    res.status(500).send('An error occurred while processing the request');
  }
});


app.get('/api/getDataEmail/:email', async (req, res) => {
  const email = req.params.email; // รับอีเมลผู้ใช้จาก request body
  try {
    // สร้าง SQL query เพื่อดึงข้อมูลจาก MySQL โดยใช้อีเมล
    const [userResults] = await connector.query('SELECT * FROM FieldEx.users WHERE email = ?', email);

    if (userResults.length === 0) {
      res.status(404).send('ไม่พบผู้ใช้ด้วยอีเมลที่ระบุ');
      return;
    }

    const user = userResults[0];
    let dataResults;

    if (user.institutionID) {
      // ถ้าเป็น institutionID ให้ดึงข้อมูลจากตาราง FieldEx.institution
      [dataResults] = await connector.query('SELECT * FROM FieldEx.institution WHERE institutionID = ?', user.institutionID);

    } else if (user.localID) {
      // ถ้าเป็น localID ให้ดึงข้อมูลจากตาราง FieldEx.localGovernmentData
      [dataResults] = await connector.query('SELECT * FROM FieldEx.localGovernmentData WHERE localID = ?', user.localID);
      [localManageData] = await connector.query(`SELECT * FROM FieldEx.localManageData WHERE localID = ?`, user.localID);
    }
    if (!dataResults || dataResults.length === 0) {
      res.status(404).send('ไม่พบข้อมูลที่เกี่ยวข้อง');
      return;
    }
    res.json({ dataResults, localManageData }); // ส่งข้อมูลที่ดึงได้กลับไปยังผู้ใช้
  } catch (error) {
    console.error('เกิดข้อผิดพลาด: ' + error.message);
    res.status(500).send('เกิดข้อผิดพลาดบางอย่าง');
  }
});

app.listen(API_PORT, () => {
  initMySQL();
  console.log("https://fieldex-production.up.railway.app");
});