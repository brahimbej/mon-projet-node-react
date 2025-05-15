import React from 'react';
import { Paper, Typography } from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const TeamBarChart = ({ teamChartData }) => (
  <Paper sx={{ p: 2, height: 350 }}>
    <Typography variant="h6">Réalisation Équipe A</Typography>
    <ResponsiveContainer width="100%" height="90%">
      <BarChart data={teamChartData}>
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalOutput" fill="#00C49F" name="Réalisation/eq" />
        <Line type="monotone" dataKey="obj" stroke="#FF0000" name="OBJ" />
      </BarChart>
    </ResponsiveContainer>
  </Paper>
);

export default TeamBarChart;
