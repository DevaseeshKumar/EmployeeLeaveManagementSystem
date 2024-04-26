import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const LeavesTaken = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get('https://elms-sdp-project-backend.onrender.com/leavestaken');
        setLeaves(response.data);
        setError(''); // Reset error state on success
      } catch (err) {
        console.error('Error fetching leaves: ', err.message);
        setError('Failed to fetch leaves. Please try again.');
      }
    };

    fetchLeaves();
  }, []);

  return (
    <Card style={{ width: '70%', margin: 'auto', backgroundColor: '#e0f2f1', boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 4px 2px rgba(0, 0, 0, 0.14), 0px 8px 3px rgba(0, 0, 0, 0.12)' }}>
      <CardContent style={{ padding: 24, minHeight: 400 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Leaves Taken
        </Typography>
        {error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Reason</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaves.map((leave, index) => (
                  <TableRow key={index}>
                    <TableCell>{leave.ID}</TableCell>
                    <TableCell>{leave.name}</TableCell>
                    <TableCell>{leave.department}</TableCell>
                    <TableCell>{new Date(leave.leaveStartDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(leave.leaveEndDate).toLocaleDateString()}</TableCell>
                    <TableCell>{leave.reasonForLeave}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default LeavesTaken;
