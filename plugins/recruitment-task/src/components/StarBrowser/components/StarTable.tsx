import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { Star, SortConfig, SortableKeys } from '../types';
import { StarTableHeader } from './StarTableHeader';
import { StarTableRow } from './StarTableRow';

interface StarTableProps {
  stars: Star[];
  sortConfig: SortConfig;
  onSortRequest: (key: SortableKeys) => void;
}

export const StarTable: React.FC<StarTableProps> = ({
  stars,
  sortConfig,
  onSortRequest,
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: '8px',
        overflowX: 'auto',
        maxHeight: 800,
        '&::-webkit-scrollbar-track': {
          background: '#333333',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '200px',
          border: '2px solid #333333',
          '&:hover': {
            background: '#707070',
            borderColor: '#707070',
          },
        },
        '&::-webkit-scrollbar-corner': {
          background: '#333333',
        },
      }}
    >
      <Table stickyHeader aria-label="Stars table">
        <StarTableHeader
          sortConfig={sortConfig}
          onSortRequest={onSortRequest}
        />
        <TableBody>
          {stars.map(star => (
            <StarTableRow key={star.id} star={star} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
