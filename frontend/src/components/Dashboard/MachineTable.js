import React from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const MachineTable = ({ data }) => (
  <Paper sx={{ maxHeight: 250, overflow: 'auto', mb: 2 }}>
    <Table size="small" stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell><strong>Heure</strong></TableCell>
          <TableCell><strong>Effectif</strong></TableCell>
          {data[0]?.machines.map((_, index) => (
            <React.Fragment key={index}>
              <TableCell><strong>Ref {index + 1}</strong></TableCell>
              <TableCell><strong>Output {index + 1}</strong></TableCell>
            </React.Fragment>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            <TableCell>{row.hour}</TableCell>
            <TableCell>{row.effectif}</TableCell>
            {row.machines.map((m, i) => (
              <React.Fragment key={i}>
                <TableCell>{m.reference}</TableCell>
                <TableCell>{m.output}</TableCell>
              </React.Fragment>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default MachineTable;
