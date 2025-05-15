import React from 'react';
import { Paper, Typography } from '@mui/material';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const DonutChart = ({ percentage }) => {
  // Ensure percentage is a number between 0 and 100
  const validPercentage = Math.min(Math.max(percentage, 0), 100);

  console.log("DonutChart percentage:", percentage);


  return (
    <Paper sx={{ p: 2, height: 350, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>Réalisation Équipe A</Typography>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={[
              { name: 'Réalisé', value: validPercentage },
              { name: 'Restant', value: 100 - validPercentage },
            ]}
            innerRadius={70}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            <Cell fill="#FF0000" />
            <Cell fill="#ccc" />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <Typography variant="h4">{validPercentage}%</Typography>
    </Paper>
  );
};

export default DonutChart;
