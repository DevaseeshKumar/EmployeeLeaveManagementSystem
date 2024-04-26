// Import the EmployeeModel
const EmployeeModel = require('../models/employee');


// Controller function to handle leave application
exports.applyLeave = async (req, res) => {
  try {
    // Extract leave data from the request body
    const leaveData = req.body;
    
    // Create a new leave application using the EmployeeModel
    const newLeaveApplication = new EmployeeModel(leaveData);
    
    // Save the new leave application to the database
    await newLeaveApplication.save();
    
    // Send a success response with the newly created leave application
    res.status(201).json(newLeaveApplication);
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error applying leave:', error);
    res.status(500).json({ message: 'Error applying leave', error: error.toString() });
  }
};

// Controller function to view leaves taken
exports.viewLeavesTaken = async (req, res) => {
  try {
    // Fetch all leaves taken from the database using the EmployeeModel
    const leavesTaken = await EmployeeModel.find();
    
    // Send a success response with the leaves taken
    res.status(200).json(leavesTaken);
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error fetching leaves taken:', error);
    res.status(500).json({ message: 'Error fetching leaves taken', error: error.toString() });
  }
};
exports.ManageLeaves = async (req, res) => {
  try {
    // Fetch all leaves taken from the database using the EmployeeModel
    const manageleave = await EmployeeModel.find();
    
    // Send a success response with the leaves taken
    res.status(200).json(manageleave);
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error fetching leaves taken:', error);
    res.status(500).json({ message: 'Error fetching leaves taken', error: error.toString() });
  }
};
// employee.controller.js


const { Types } = require('mongoose');
const { ObjectId } = Types;

exports.acceptLeave = async (req, res) => {
  try {
    const leaveId = ObjectId(req.params.id); // Convert leaveId to ObjectId
    // Update the status of the leave in the database to 'Accepted'
    const updatedLeave = await EmployeeModel.findByIdAndUpdate(leaveId, { status: 'Accepted' }, { new: true });
    res.status(200).json(updatedLeave);
  } catch (error) {
    console.error('Error accepting leave:', error);
    res.status(500).json({ message: 'Error accepting leave', error: error.toString() });
  }
};

exports.rejectLeave = async (req, res) => {
  try {
    const leaveId = ObjectId(req.params.id); // Convert leaveId to ObjectId
    // Update the status of the leave in the database to 'Rejected'
    const updatedLeave = await EmployeeModel.findByIdAndUpdate(leaveId, { status: 'Rejected' }, { new: true });
    res.status(200).json(updatedLeave);
  } catch (error) {
    console.error('Error rejecting leave:', error);
    res.status(500).json({ message: 'Error rejecting leave', error: error.toString() });
  }
};
