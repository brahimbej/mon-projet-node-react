import React from 'react';
import { Paper, Typography } from '@mui/material';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TotalMachineChart = ({ data }) => (
  <Paper sx={{ p: 2, height: 350 }}>
    <Typography variant="h6">Total Réalisation par Machine</Typography>
    <ResponsiveContainer width="100%" height="90%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="reference" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="output" stroke="#8884d8" name="Réalisation/machine" />
        <Line type="monotone" dataKey="obj" stroke="#82ca9d" name="Obj/machine" />
      </LineChart>
    </ResponsiveContainer>
  </Paper>
);

export default TotalMachineChart;
