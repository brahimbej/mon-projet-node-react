import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import MachineTable from './MachineTable';
import TeamBarChart from './TeamBarChart';
import MachineLineChart from './MachineLineChart';
import TotalMachineChart from './TotalMachineChart';
import DonutChart from './DonutChart';
import ProductionChart from '../ProductionChart';
import TotalRealizationChart from '../TotalRealizationChart';
import Sidebar from '../Sidebar';

const Dashboard = ({ data, onLogout }) => {
  const allMachineRefs = Array.from(
    new Set(data.flatMap(row => row.machines.map(m => m.reference)))
  );

  const teamChartData = data.map(row => {
    const totalOutput = row.machines.reduce((sum, m) => {
      const output = parseFloat(m.output);
      return sum + (isNaN(output) ? 0 : output);
    }, 0);
    return {
      hour: row.hour,
      totalOutput,
      obj: 120 * row.machines.length,
    };
  });

  const lineChartData = data.map(row => {
    const lineRow = { hour: row.hour };
    row.machines.forEach(machine => {
      const value = parseFloat(machine.output);
      lineRow[machine.reference] = isNaN(value) ? 0 : value;
    });
    return lineRow;
  });

  const totalByMachine = {};
  data.forEach(row => {
    row.machines.forEach(({ reference, output }) => {
      const value = parseFloat(output);
      totalByMachine[reference] = (totalByMachine[reference] || 0) + (isNaN(value) ? 0 : value);
    });
  });

  const totalMachineData = Object.entries(totalByMachine).map(([reference, output]) => ({
    reference,
    output,
    obj: 960,
  }));

  const totalOutput = teamChartData.reduce((sum, v) => sum + v.totalOutput, 0);
  const totalObj = teamChartData.reduce((sum, v) => sum + v.obj, 0);
  const pourcentage = totalObj === 0 ? 0 : Math.round((totalOutput / totalObj) * 100);
  console.log("lineChartData" , lineChartData)
  return (
    <Box sx={{ p: 4, width: '100%', overflowX: 'hidden' }}>
        <Typography variant="h4" gutterBottom>Réalisation Dashboard</Typography>

        <Box mb={4}>
          <MachineTable data={data} />
        </Box>



      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid container spacing={4}>
          {/* Row 1: Team Bar Chart and Machine Line Chart */}
          <Grid item xs={12} md={6}>
            <Box p={1} minHeight={300} minWidth={500} bgcolor="#f5f5f5" borderRadius={3} boxShadow={2}>
              <TeamBarChart teamChartData={teamChartData} />
            </Box>
          </Grid>


          <Grid item xs={12} md={6}>
            <Box p={1} minHeight={300} minWidth={500} bgcolor="#f5f5f5" borderRadius={3} boxShadow={2}>
              <DonutChart percentage={pourcentage} />
            </Box>
          </Grid>
        </Grid>
      </Box>


        <Box mt={4} mb={4}>
        <Box p={1} minHeight={300} bgcolor="#f5f5f5" borderRadius={3} boxShadow={2}>

          <TotalRealizationChart data={data} />
          </Box>
        </Box>

                {/* Production Chart */}
                <Box mt={4}>
          <Box p={1} minHeight={300} bgcolor="#f5f5f5" borderRadius={3} boxShadow={2}>
            <ProductionChart data={data} />
          </Box>
        </Box>
      </Box>
  );
};

export default Dashboard;
