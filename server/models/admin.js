// admin.js

const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
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
    }
});

const AdminModel = mongoose.model("Employee", AdminSchema);

module.exports = AdminModel;
