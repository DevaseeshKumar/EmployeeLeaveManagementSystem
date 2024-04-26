const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const db = require('./config/db');
const AdminModel = require('./models/admin'); // Import AdminModel
const EmployeeModel = require('./models/employee'); // Import EmployeeModel
const router = require('./routes/adminroutes');
const loginrouter = require('./routes/loginroutes')
const emprouter = require('./routes/employeeroutes')
const sendMail = require('./utils/sendMail');
app.use(express.json());
app.use(cors());

// Endpoint to handle POST requests for applying leave
app.post('/applyleave', (req, res) => {
  // Validate request body
  const { ID, name, department, mobilenumber, mail, leaveStartDate, leaveEndDate, reasonForLeave } = req.body;
  if (!ID || !name || !department || !mobilenumber || !mail || !leaveStartDate || !leaveEndDate || !reasonForLeave) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Attempt to insert data into the database
  EmployeeModel.create(req.body) // Using EmployeeModel to apply leave
    .then(result => {
      console.log("Leave Applied Successfully");
      res.json({ message: "Leave Applied Successfully" });
    })
    .catch(err => {
      console.log("Error Applying Leave: ", err);
      res.status(500).json({ error: "Error Applying Leave", message: err.message });
    });
});


// Endpoint to handle POST requests for adding employees
app.post('/addemployee', (req, res) => {
  // Validate request body
  const { ID, name, department, mobilenumber, mail } = req.body;
  if (!ID || !name || !department || !mobilenumber || !mail) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Attempt to insert data into the database
  AdminModel.create(req.body) // Using AdminModel to add employee
    .then(result => {
      console.log("Employee Added Successfully");
      res.json({ message: "Employee Added Successfully" });
    })
    .catch(err => {
      console.log("Error Adding Employee: ", err);
      res.status(500).json({ error: "Error Adding Employee", message: err.message });
    });
});

// Endpoint to handle POST requests for user login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await AdminModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the provided password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // If everything is fine, send a success message
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.use("",loginrouter)
// Endpoint to handle DELETE requests for deleting an employee
app.use("", router);
app.use("",emprouter)

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route for handling 404 errors


// Database connection
db.once('open', () => {
  console.log('Database connection is open.');
});

// Database connection error handling
db.on('error', (err) => {
  console.error('Connection error:', err);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


app.post('/api/sendMail', async (req, res) => {
  const { email, message, subject } = req.body;
  console.log(email, message, subject);

  try {
    const sent_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = email;
    const mailsubject = subject;
    const textMessage = message;
    await sendMail(mailsubject, textMessage, sent_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});