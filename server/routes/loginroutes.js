const express = require('express');
const loginrouter = express.Router();
const LoginModel = require('../models/login');
const AdminModel = require('../models/AdminMain')

// Route for handling login inputs and inserting into MongoDB Atlas
loginrouter.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        // Create a new login document with the provided data
        const newLogin = new LoginModel({
            email,
            password,
            role
        });
        // Save the new login to the database
        await newLogin.save();
        res.status(201).json({ message: "Login data inserted successfully" });
    } catch (error) {
        console.error('Error inserting login data:', error);
        res.status(500).json({ error: "Error inserting login data", message: error.message });
    }
});

loginrouter.post("/adminlogin",async(req,res)=>{
    try{const {username,password} = req.body
    const user = await AdminModel.findOne({username:username})
    console.log(user)
    if (password === user.password){
        res.status(200).json({message:"Login Success"})
    }
    else{
        res.status(401).json({message:"Login Failed"})
    }}
    catch(e){
        console.log(e.message)
    }
})

module.exports = loginrouter;
