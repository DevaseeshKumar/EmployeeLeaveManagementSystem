const AdminModel = require('../models/admin');

exports.addEmployee = async (req, res) => {
  try {
    const adminData = req.body;
    const newAdmin = new AdminModel(adminData);
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ message: 'Error adding employee', error: error.toString() });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const empid = req.params.id;
    const deletedEmployee = await AdminModel.findOneAndDelete({ ID: empid });
    console.log(deletedEmployee);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully', deletedEmployee });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Error deleting employee', error: error.toString() });
  }
};

exports.viewEmployees = async (req, res) => {
  try {
    const employees = await AdminModel.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Error fetching employees', error: error.toString() });
  }
};


