import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';

const ViewEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://elms-sdp-project-backend.onrender.com/viewemployees');
        setEmployees(response.data);
      } catch (err) {
        console.error("Error fetching employees: ", err.message);
        setError("Failed to fetch employees. Please try again.");
      }
    };

    fetchEmployees();
  }, []);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Employees
      </Typography>
      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}
      {employees.map(employee => (
        <Card
          key={employee.ID}
          sx={{
            minWidth: 320,
            backgroundColor: '#f4f4f4',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            marginTop: 2,
          }}
        >
          <CardContent>
            <Typography variant="h6">
              ID: {employee.ID}
            </Typography>
            <Typography variant="body1">
              Name: {employee.name}
            </Typography>
            <Typography variant="body1">
              Department: {employee.department}
            </Typography>
            <Typography variant="body1">
              Mobile Number: {employee.mobilenumber}
            </Typography>
            <Typography variant="body1">
              Mail: {employee.mail}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ViewEmployee;
