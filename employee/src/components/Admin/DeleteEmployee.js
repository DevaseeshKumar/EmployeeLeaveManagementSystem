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

const DeleteEmployee = ({ handleSnackbarOpen }) => {
  const [ID, setId] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const isNumber = (value) => /^[0-9]+$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ID) {
      setError('ID is required');
      return;
    }

    if (!isNumber(ID)) {
      setError('ID must contain only numbers');
      return;
    }

    try {
      const response = await axios.delete(`https://elms-sdp-project-backend.onrender.com/deleteemployee/${ID}`);
      console.log('Server Response:', response.data);
      setId('');
      setError('');
      setSnackbarOpen(true);
      handleSnackbarOpen('Employee deleted successfully');
    } catch (err) {
      console.error('Error in deleting employee: ', err.message);
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Failed to delete employee. Please try again.');
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
            <FormHelperText>Required. Only numbers allowed.</FormHelperText>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Delete Employee
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
          Employee deleted successfully
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default DeleteEmployee;
