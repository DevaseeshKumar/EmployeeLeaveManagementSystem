const express = require('express');
const emprouter = express.Router();
const employeeController = require('../controllers/employeecontroller');

// Route for applying leave
emprouter.post('/applyleave', employeeController.applyLeave);

// Route for viewing leaves taken
emprouter.get('/leavestaken', employeeController.viewLeavesTaken);

emprouter.get('/manageleave', employeeController.ManageLeaves);
emprouter.put('/manageleave/:id/accept', employeeController.acceptLeave);
emprouter.put('/manageleave/:id/reject', employeeController.rejectLeave);

module.exports = emprouter;
