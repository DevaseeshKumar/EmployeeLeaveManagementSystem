// employee.model.js

const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    ID: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    mobilenumber: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    leaveStartDate: {
        type: Date,
        required: true,
    },
    leaveEndDate: {
        type: Date,
        required: true,
    },
    reasonForLeave: {
        type: String,
        required: true, 
    }
});

const EmployeeModel = mongoose.model("Employee Leave", EmployeeSchema);

module.exports = EmployeeModel;
