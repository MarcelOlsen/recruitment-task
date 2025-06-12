import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import {
  SORTABLE_TABLE_HEADERS,
  NON_SORTABLE_TABLE_HEADERS,
} from '../constants';

const SkeletonFilters: React.FC = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: '8px',
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        Star Filters
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <Skeleton
          variant="rectangular"
          width="200px"
          height={56}
          sx={{ flexGrow: 1, minWidth: '200px' }}
        />
        <Skeleton
          variant="rectangular"
          width="200px"
          height={56}
          sx={{ flexGrow: 1, minWidth: '200px' }}
        />
        <Skeleton
          variant="rectangular"
          width="250px"
          height={56}
          sx={{ minWidth: '200px' }}
        />
      </Box>
    </Paper>
  );
};

const SkeletonTableHeader: React.FC = () => {
  return (
    <TableHead sx={{ backgroundColor: '#6c757d' }}>
      <TableRow>
        {SORTABLE_TABLE_HEADERS.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding="normal"
            sortDirection={false}
            sx={{
              color: 'white',
              fontWeight: 600,
              letterSpacing: '0.075em',
              whiteSpace: 'nowrap',
            }}
          >
            <TableSortLabel
              active={false}
              disabled
              direction="asc"
              sx={{
                '& .MuiTableSortLabel-icon': {
                  color: '#bdbdbd !important',
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

const SkeletonTableBody: React.FC = () => {
  const totalColumns =
    SORTABLE_TABLE_HEADERS.length + NON_SORTABLE_TABLE_HEADERS.length;

  return (
    <TableBody>
      {Array.from(new Array(8)).map((_, rowIndex) => (
        <TableRow key={`skeleton-row-${rowIndex}`} hover>
          {Array.from(new Array(totalColumns)).map((_cell, cellIndex) => (
            <TableCell
              key={`skeleton-cell-${rowIndex}-${cellIndex}`}
              align={cellIndex > 0 ? 'right' : 'left'}
              sx={{ whiteSpace: 'nowrap' }}
            >
              <Skeleton
                animation="wave"
                width={cellIndex === 0 ? '150px' : '80px'}
                height={24}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export const StarBrowserSkeleton: React.FC = () => {
  return (
    <>
      <SkeletonFilters />
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          overflowX: 'auto',
        }}
      >
        <Table
          aria-label="Stars table loading skeleton"
          sx={{ minWidth: 1200 }}
        >
          <SkeletonTableHeader />
          <SkeletonTableBody />
        </Table>
      </TableContainer>
    </>
  );
};
