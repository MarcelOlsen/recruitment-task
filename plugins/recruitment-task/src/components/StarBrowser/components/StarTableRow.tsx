import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Star } from '../types';

interface StarTableRowProps {
  star: Star;
}

export const StarTableRow: React.FC<StarTableRowProps> = ({ star }) => {
  return (
    <TableRow
      key={star.id}
      hover
      sx={{
        '&:hover': { backgroundColor: '#707070' },
      }}
    >
      <TableCell component="th" scope="row" sx={{ whiteSpace: 'nowrap' }}>
        {star.name}
      </TableCell>
      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
        {star.distanceLightYears.toLocaleString()}
      </TableCell>
      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
        {star.massSolarMasses.toLocaleString()}
      </TableCell>
      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
        {star.radiusMeters.toLocaleString()}
      </TableCell>
      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
        {star.temperatureKelvin.toLocaleString()}
      </TableCell>
      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
        {star.ageYears.toLocaleString()}
      </TableCell>
      <TableCell align="left" sx={{ whiteSpace: 'nowrap' }}>
        {star.type}
      </TableCell>
      <TableCell align="left" sx={{ whiteSpace: 'nowrap' }}>
        {star.spectralType}
      </TableCell>
      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
        {star.luminositySolarLuminosity.toLocaleString()}
      </TableCell>
      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
        {star.raDegrees}
      </TableCell>
      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
        {star.decDegrees}
      </TableCell>
    </TableRow>
  );
};
