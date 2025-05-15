import React from 'react';
import { Paper, Typography } from '@mui/material';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, LabelList
} from 'recharts';

const MachineLineChart = ({ chartData }) => {
  return (
    <Paper
      sx={{
        p: 2,
        height: 400,
        borderRadius: 4,
        background: 'linear-gradient(180deg, #333 0%, #111 100%)',
        color: '#fff',
      }}
      elevation={5}
    >
      <Typography variant="h6" gutterBottom sx={{ color: '#fff', textAlign: 'center' }}>
        Réalisation machine par heure
      </Typography>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={chartData}>
          <XAxis dataKey="hour" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip
            contentStyle={{ backgroundColor: '#222', border: 'none' }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ color: '#fff' }} />

          {/* Blue Line - Réalisation/eq */}
          <Line
            type="monotone"
            dataKey="Réalisation/eq"
            stroke="#00BFFF"
            strokeWidth={3}
            dot={{ r: 5, fill: '#fff', stroke: '#00BFFF', strokeWidth: 2 }}
          >
            <LabelList dataKey="Réalisation/eq" position="top" fill="#fff" />
          </Line>

          {/* Yellow Line with green glow - OBJ */}
          <Line
            type="monotone"
            dataKey="OBJ"
            stroke="#FFD700"
            strokeWidth={3}
            dot={{ r: 6, fill: '#FFD700', stroke: '#00FF00', strokeWidth: 3 }}
          >
            <LabelList dataKey="OBJ" position="top" fill="#FFD700" />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default MachineLineChart;
