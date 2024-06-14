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

app.get('/api/users', verifyUser, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const results = await connector.query('SELECT * FROM FieldEx.users');
    res.json(results);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ message: "Failed to retrieve users", error });
  }
});


app.get('/api/usersData', verifyUser, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      message: "Access denied"
    });
  }

  try {
    const [results] = await connector.query('SELECT institutionID, institutionName FROM FieldEx.institution');
    res.status(200).json({
      results
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

app.post('/api/submitge', verifyUser,async (req, res) => {
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
      await connection.commit();
      return res.status(200).json({
        localGovernmentData
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


app.post('/api/submitlc', verifyUser,async (req,res) =>{
  const { organizationName, localID, phoneNumber, faxNumber, email, subDistrict, district, province, affiliation, headmasterName, highlightedActivities,
  }  = req.body; 

try {
  const formData = {organizationName, localID, phoneNumber, faxNumber, email, subDistrict, district, province, affiliation, headmasterName, highlightedActivities,
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
    message:"Submit Success",
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

app.post('/submit', async (req, res) => {
  const { 
      localMeetingAgenda, localMemberSignatures, meetingMinutes, photos,
      appointmentOrder, subcommittee, managementPlan, protectionPlan,
      surveyPlan, coordination, expenseSummary, meetingInvite, thankYouNote,
      operationResults, analysisResults, improvementPlan, annualReport,
      budgetDetails 
  } = req.body;

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

  try {
      await connector.query(query, values);
      res.status(200).send('Data inserted successfully');
  } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while inserting data');
  }
});



app.listen(API_PORT, () => {
  initMySQL();
  console.log("https://fieldex-production.up.railway.app");
});