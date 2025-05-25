import React from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from '@mui/material';

const MachineTable = ({ data }) => (
  <TableContainer 
    component={Paper} 
    sx={{ 
      backgroundColor: '#2f2f2f',
      width: '100%',
      '& .MuiTableCell-root': {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        padding: '12px 16px',
      },
    }}
  >
    <Table 
      sx={{
        '& .MuiTableCell-head': {
          backgroundColor: '#1a1a1a',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '0.95rem',
        },
        '& .MuiTableCell-body': {
          color: '#fff',
          fontSize: '0.9rem',
        },
        '& .MuiTableRow-root:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05) !important',
        },
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell align="center">Heure</TableCell>
          <TableCell align="center">Effectif</TableCell>
          {data[0]?.machines.map((_, index) => (
            <React.Fragment key={index}>
              <TableCell align="center">Ref {index + 1}</TableCell>
              <TableCell align="center">Output {index + 1}</TableCell>
            </React.Fragment>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow 
            key={rowIndex}
            sx={{
              '&:nth-of-type(odd)': {
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              },
            }}
          >
            <TableCell align="center">{row.hour}</TableCell>
            <TableCell align="center">{row.effectif}</TableCell>
            {row.machines.map((m, i) => (
              <React.Fragment key={i}>
                <TableCell align="center">{m.reference}</TableCell>
                <TableCell 
                  align="center"
                  sx={{
                    color: m.output < 100 ? '#ff6b6b !important' : 'white !important',
                    fontWeight: 'bold',
                  }}
                >
                  {m.output}
                </TableCell>
              </React.Fragment>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default MachineTable;
