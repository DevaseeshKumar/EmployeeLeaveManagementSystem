import React, { useState } from 'react';
import axios from 'axios';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from '@mui/material';

const AddEmployee = ({ handleSnackbarOpen }) => {
  const [ID, setId] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [mail, setMail] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const isNumber = (value) => /^[0-9]+$/.test(value);
  const isAlphabet = (value) => /^[a-zA-Z]+$/.test(value);
  const isEmail = (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ID || !name || !department || !mobilenumber || !mail) {
      setError('All fields are required');
      return;
    }

    if (!isNumber(ID)) {
      setError('ID must contain only numbers');
      return;
    }

    if (!isAlphabet(name)) {
      setError('Name must contain only alphabets');
      return;
    }

    if (!isAlphabet(department)) {
      setError('Department must contain only alphabets');
      return;
    }

    if (!/^\d{10}$/.test(mobilenumber)) {
      setError('Mobile number must be 10 digits with only numbers');
      return;
    }

    if (!isEmail(mail)) {
      setError('Invalid email format');
      return;
    }

    const data = {
      ID,
      name,
      department,
      mobilenumber,
      mail,
    };

    try {
      const response = await axios.post('https://elms-sdp-project-backend.onrender.com/addemployee', data);
      console.log('Server Response:', response.data);
      setId('');
      setName('');
      setDepartment('');
      setMobileNumber('');
      setMail('');
      setError('');
      setSnackbarOpen(true);
      handleSnackbarOpen('Employee added successfully');
    } catch (err) {
      console.error('Error in posting data: ', err.message);
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Failed to add employee. Please try again.');
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Card
      sx={{
        minWidth: 320,
        backgroundColor: '#f4f4f4',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardContent sx={{ padding: 4 }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
          <FormControl fullWidth>
            <InputLabel htmlFor="id">ID</InputLabel>
            <Input id="id" value={ID} onChange={(e) => setId(e.target.value)} required />
            <FormHelperText></FormHelperText>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            <FormHelperText></FormHelperText>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="department">Department</InputLabel>
            <Input
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
            <FormHelperText></FormHelperText>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="mobileNumber">Mobile Number</InputLabel>
            <Input
              id="mobileNumber"
              value={mobilenumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
            <FormHelperText></FormHelperText>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="mail">Mail</InputLabel>
            <Input
              id="mail"
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
            />
            <FormHelperText></FormHelperText>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Employee
          </Button>

          {error && (
            <FormHelperText error sx={{ mt: 2 }}>
              {error}
            </FormHelperText>
          )}
        </form>
      </CardContent>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          Employee added successfully
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default AddEmployee;
