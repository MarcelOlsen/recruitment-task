import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { SortConfig, SortableKeys } from '../types';
import {
  SORTABLE_TABLE_HEADERS,
  NON_SORTABLE_TABLE_HEADERS,
} from '../constants';

interface StarTableHeaderProps {
  sortConfig: SortConfig;
  onSortRequest: (key: SortableKeys) => void;
}

export const StarTableHeader: React.FC<StarTableHeaderProps> = ({
  sortConfig,
  onSortRequest,
}) => {
  return (
    <TableHead
      sx={{
        backgroundColor: '#6c757d',
      }}
    >
      <TableRow>
        {SORTABLE_TABLE_HEADERS.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding="normal"
            sortDirection={
              sortConfig.key === headCell.id ? sortConfig.direction : false
            }
            sx={{
              color: 'white',
              fontWeight: 600,
              letterSpacing: '0.075em',
              whiteSpace: 'nowrap',
            }}
          >
            <TableSortLabel
              active={sortConfig.key === headCell.id}
              direction={
                sortConfig.key === headCell.id ? sortConfig.direction : 'asc'
              }
              onClick={() => onSortRequest(headCell.id)}
              sx={{
                '& .MuiTableSortLabel-icon': {
                  color:
                    sortConfig.key === headCell.id
                      ? 'white !important'
                      : '#bdbdbd !important',
                },
                whiteSpace: 'nowrap',
              }}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        {NON_SORTABLE_TABLE_HEADERS.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding="normal"
            sx={{
              color: 'white',
              fontWeight: 600,
              letterSpacing: '0.075em',
              whiteSpace: 'nowrap',
            }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
