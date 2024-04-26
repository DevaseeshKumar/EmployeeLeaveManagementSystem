// Import necessary modules
const express = require('express');
const bcrypt = require('bcrypt');
const AdminModel = require('../models/AdminMain');

// Define router
const loginrouter = express.Router();

// Route for handling login inputs and inserting into MongoDB Atlas
loginrouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user in the database by email
        const user = await LoginModel.findOne({ email });

        // If user not found, return error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If passwords don't match, return error
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If passwords match, send a success message
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Error in login', error: error.toString() });
    }
});

// Route for handling admin login
loginrouter.post('/adminlogin', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the admin user in the database by username
        const adminUser = await AdminModel.findOne({ username });

        // If user not found, return error
        if (!adminUser) {
            return res.status(404).json({ message: 'Admin user not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, adminUser.password);

        // If passwords don't match, return error
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If passwords match, send a success message
        res.status(200).json({ message: 'Admin login successful' });
    } catch (error) {
        console.error('Error in admin login:', error);
        res.status(500).json({ message: 'Error in admin login', error: error.toString() });
    }
});

// Export router
module.exports = loginrouter;
