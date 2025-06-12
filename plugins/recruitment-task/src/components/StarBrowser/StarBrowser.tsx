import {
  configApiRef,
  useApi,
  discoveryApiRef,
  fetchApiRef,
} from '@backstage/core-plugin-api';
import React, { useState, useMemo, useCallback, Suspense } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

interface Star {
  id: string;
  name: string;
  distanceLightYears: number;
  massSolarMasses: number;
  raDegrees: number;
  decDegrees: number;
  ageYears: number;
  type: string;
  spectralType: string;
  luminositySolarLuminosity: number;
  radiusMeters: number;
  temperatureKelvin: number;
}

type SortableKeys =
  | 'name'
  | 'distanceLightYears'
  | 'massSolarMasses'
  | 'radiusMeters'
  | 'temperatureKelvin'
  | 'ageYears';

interface SortConfig {
  key: SortableKeys | null;
  direction: 'asc' | 'desc';
}

interface TableHeaderCell {
  id: SortableKeys;
  label: string;
  numeric: boolean;
}

const sortableTableHeaders: TableHeaderCell[] = [
  { id: 'name', label: 'Name', numeric: false },
  { id: 'distanceLightYears', label: 'Distance (LY)', numeric: true },
  { id: 'massSolarMasses', label: 'Mass (Solar)', numeric: true },
  { id: 'radiusMeters', label: 'Radius (m)', numeric: true },
  { id: 'temperatureKelvin', label: 'Temp (K)', numeric: true },
  { id: 'ageYears', label: 'Age (Years)', numeric: true },
];

const nonSortableTableHeaders = [
  { id: 'type', label: 'Type', numeric: false },
  { id: 'spectralType', label: 'Spectral Type', numeric: false },
  {
    id: 'luminositySolarLuminosity',
    label: 'Luminosity (Solar)',
    numeric: true,
  },
  { id: 'raDegrees', label: 'RA (Degrees)', numeric: true },
  { id: 'decDegrees', label: 'Dec (Degrees)', numeric: true },
];

const StarBrowserSkeleton = () => {
  const renderSkeletonFilters = () => {
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

  return (
    <>
      {renderSkeletonFilters()}
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
          <TableHead sx={{ backgroundColor: '#6c757d' }}>
            <TableRow>
              {sortableTableHeaders.map(headCell => (
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
              {nonSortableTableHeaders.map(headCell => (
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
          <TableBody>
            {Array.from(new Array(8)).map((_, index) => (
              <TableRow key={`skeleton-row-${index}`} hover>
                {Array.from(
                  new Array(
                    sortableTableHeaders.length +
                      nonSortableTableHeaders.length,
                  ),
                ).map((_cell, cellIndex) => (
                  <TableCell
                    key={`skeleton-cell-${index}-${cellIndex}`}
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
        </Table>
      </TableContainer>
    </>
  );
};

export const StarBrowserSuspense = () => {
  const configApi = useApi(configApiRef);
  const isVisible = configApi.getOptionalBoolean('task.vars.isVisible') ?? true;
  const discoveryApi = useApi(discoveryApiRef);
  const fetchApi = useApi(fetchApiRef);

  const [nameFilter, setNameFilter] = useState('');
  const [radiusFilter, setRadiusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'name',
    direction: 'asc',
  });

  const { data: stars } = useSuspenseQuery({
    queryKey: ['stars'],
    queryFn: async () => {
      const baseUrl = await discoveryApi.getBaseUrl('star-api');
      const response = await fetchApi.fetch(`${baseUrl}/stars`);
      if (!response.ok) {
        throw new Error(`Failed to fetch stars: ${response.statusText}`);
      }
      const data = await response.json();
      return data.items as Star[];
    },
  });

  const uniqueStarTypes = useMemo(() => {
    const types = new Set(stars.map(star => star.type));
    return Array.from(types);
  }, [stars]);

  const sortedAndFilteredStars = useMemo(() => {
    let processedStars = [...stars];

    processedStars = processedStars.filter(star => {
      const nameMatch = star.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      const radiusMatch =
        radiusFilter === '' || star.radiusMeters > parseFloat(radiusFilter);
      const typeMatch =
        typeFilter.length === 0 || typeFilter.includes(star.type);
      return nameMatch && radiusMatch && typeMatch;
    });

    if (sortConfig.key) {
      processedStars.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return processedStars;
  }, [nameFilter, radiusFilter, typeFilter, sortConfig, stars]);

  const handleSortRequest = useCallback(
    (key: SortableKeys) => {
      const isAsc = sortConfig.key === key && sortConfig.direction === 'asc';
      setSortConfig({ key, direction: isAsc ? 'desc' : 'asc' });
    },
    [sortConfig],
  );

  if (!isVisible) {
    return null;
  }

  return (
    <Container
      sx={{
        mt: 3,
        mb: 3,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      }}
    >
      <Box
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
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: 2,
            alignItems: 'center',
            width: '100%',
          }}
        >
          <TextField
            label="Filter by Name"
            variant="outlined"
            value={nameFilter}
            onChange={e => setNameFilter(e.target.value)}
            placeholder="Enter star name"
            sx={{
              gridColumn: 'span 1',
              minWidth: '180px',
              '& .MuiInputBase-root': {
                height: '56px',
              },
            }}
          />
          <TextField
            label="Min. Radius (meters)"
            variant="outlined"
            type="number"
            value={radiusFilter}
            onChange={e => setRadiusFilter(e.target.value)}
            placeholder="Enter minimum radius"
            sx={{
              gridColumn: 'span 1',
              minWidth: '180px',
              '& .MuiInputBase-root': {
                height: '56px',
              },
            }}
          />
          <FormControl
            variant="outlined"
            sx={{
              minWidth: '200px',
              gridColumn: 'span 2',
              '& .MuiInputBase-root': {
                height: '56px',
              },
            }}
          >
            <InputLabel id="star-type-select-label">Filter by Type</InputLabel>
            <Select
              labelId="star-type-select-label"
              id="star-type-select"
              multiple
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value as string[])}
              label="Filter by Type"
              renderValue={selected => (
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    gap: 0.5,
                    overflow: 'auto',
                    maxWidth: '100%',
                    maxHeight: '36px',
                    alignItems: 'center',
                    paddingY: 0.25,
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                      display: 'none',
                    },
                  }}
                >
                  {(selected as string[]).map(value => (
                    <Chip
                      key={value}
                      label={value}
                      size="medium"
                      sx={{
                        fontSize: '0.7rem',
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </Box>
              )}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxWidth: '200px',
                    '& .MuiList-root': {
                      display: 'flex',
                      flexWrap: 'wrap',
                      maxHeight: 'none',
                      padding: 1,
                    },
                  },
                },
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
              }}
              sx={{
                '& .MuiSelect-select': {
                  paddingRight: '32px !important',
                },
              }}
            >
              {uniqueStarTypes.map(type => (
                <MenuItem
                  key={type}
                  value={type}
                  disableRipple
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItem: 'center',
                    flexGrow: 0,
                    flexShrink: 0,
                    width: 'auto',
                    minWidth: 'max-content',
                    margin: 0.25,
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    padding: '4px 8px',
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'transparent',
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    },
                  }}
                >
                  <Chip
                    size="medium"
                    label={type}
                    sx={{
                      fontSize: '0.75rem',
                      flexShrink: 0,
                      backgroundColor: typeFilter.includes(type)
                        ? 'rgb(25, 118, 210)'
                        : 'rgba(0, 0, 0, 0.08)',
                      color: typeFilter.includes(type) ? 'white' : 'inherit',
                      '&:hover': {
                        backgroundColor: typeFilter.includes(type)
                          ? 'rgb(21, 101, 192)'
                          : 'rgba(0, 0, 0, 0.12)',
                      },
                    }}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

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
          <TableHead
            sx={{
              backgroundColor: '#6c757d',
            }}
          >
            <TableRow>
              {sortableTableHeaders.map(headCell => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  padding="normal"
                  sortDirection={
                    sortConfig.key === headCell.id
                      ? sortConfig.direction
                      : false
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
                      sortConfig.key === headCell.id
                        ? sortConfig.direction
                        : 'asc'
                    }
                    onClick={() => handleSortRequest(headCell.id)}
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
              {nonSortableTableHeaders.map(headCell => (
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
          <TableBody>
            {sortedAndFilteredStars.map(star => (
              <TableRow
                key={star.id}
                hover
                sx={{
                  '&:hover': { backgroundColor: '#707070' },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ whiteSpace: 'nowrap' }}
                >
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export const StarBrowser = () => {
  return (
    <Suspense fallback={<StarBrowserSkeleton />}>
      <ErrorBoundary
        fallback={<div>An error occurred while fetching stars</div>}
      >
        <StarBrowserSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};
