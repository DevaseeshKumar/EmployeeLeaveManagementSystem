import React, { useState } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Input, FormHelperText, Button, Card, CardContent, TextField, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Leave = () => {
  const [ID, setId] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [mail, setMail] = useState('');
  const [leaveStartDate, setLeaveStartDate] = useState('');
  const [leaveEndDate, setLeaveEndDate] = useState('');
  const [reasonForLeave, setReasonForLeave] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ID || !name || !department || !mobilenumber || !mail || !leaveStartDate || !leaveEndDate || !reasonForLeave) {
      setError("All fields are required");
      return;
    }

    const data = {
      ID,
      name,
      department,
      mobilenumber,
      mail,
      leaveStartDate,
      leaveEndDate,
      reasonForLeave
    };

    try {
      const response = await axios.post('https://elms-sdp-project-backend.onrender.com/applyleave', data);
      console.log("Server Response:", response.data);
      setId('');
      setName('');
      setDepartment('');
      setMobileNumber('');
      setMail('');
      setLeaveStartDate('');
      setLeaveEndDate('');
      setReasonForLeave('');
      setError('');
      handleSnackbarOpen('success', 'Leave applied successfully');
    } catch (err) {
      console.error("Error in posting data: ", err.message);
      if (err.response && err.response.data) {
        setError(err.response.data.error || "Failed to apply leave. Please try again.");
      } else {
        setError("Failed to apply leave. Please try again.");
      }
      handleSnackbarOpen('error', err.message || 'Failed to apply leave. Please try again.');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <>
      <Card style={{ width: '70%', margin: 'auto', backgroundColor: '#e0f2f1', boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 4px 2px rgba(0, 0, 0, 0.14), 0px 8px 3px rgba(0, 0, 0, 0.12)' }}>
        <CardContent style={{ padding: 24, minHeight: 400 }}>
          <form onSubmit={handleSubmit}>
            <FormControl style={{ marginBottom: 16 }}>
              <InputLabel htmlFor="id">ID</InputLabel>
              <Input
                id="id"
                value={ID}
                onChange={(e) => setId(e.target.value)}
                required
              />
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <FormControl style={{ marginBottom: 16 }}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <FormControl style={{ marginBottom: 16 }}>
              <InputLabel htmlFor="department">Department</InputLabel>
              <Input
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <FormControl style={{ marginBottom: 16 }}>
              <InputLabel htmlFor="mobileNumber">Mobile Number</InputLabel>
              <Input
                id="mobileNumber"
                value={mobilenumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <FormControl style={{ marginBottom: 16 }}>
              <InputLabel htmlFor="mail">Mail</InputLabel>
              <Input
                id="mail"
                type="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                required
              />
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <FormControl style={{ marginBottom: 16 }}>
              <TextField
                label="Leave Start Date and Time"
                type="datetime-local"
                value={leaveStartDate}
                onChange={(e) => setLeaveStartDate(e.target.value)}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <FormControl style={{ marginBottom: 16 }}>
              <TextField
                label="Leave End Date and Time"
                type="datetime-local"
                value={leaveEndDate}
                onChange={(e) => setLeaveEndDate(e.target.value)}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <FormControl style={{ marginBottom: 16 }}>
              <InputLabel htmlFor="reasonForLeave">Reason for Leave</InputLabel>
              <Input
                id="reasonForLeave"
                value={reasonForLeave}
                onChange={(e) => setReasonForLeave(e.target.value)}
                required
              />
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: 2 }}>
              Apply Leave
            </Button>
            {error && (
              <FormHelperText error style={{ marginTop: 2 }}>
                {error}
              </FormHelperText>
            )}
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Leave;
