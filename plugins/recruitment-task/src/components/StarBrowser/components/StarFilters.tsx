import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { StarFilters as StarFiltersType } from '../types';

interface StarFiltersProps {
  filters: StarFiltersType;
  uniqueStarTypes: string[];
  onNameChange: (name: string) => void;
  onRadiusChange: (radius: string) => void;
  onTypeChange: (types: string[]) => void;
}

export const StarFilters: React.FC<StarFiltersProps> = ({
  filters,
  uniqueStarTypes,
  onNameChange,
  onRadiusChange,
  onTypeChange,
}) => {
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
          value={filters.name}
          onChange={e => onNameChange(e.target.value)}
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
          value={filters.radius}
          onChange={e => onRadiusChange(e.target.value)}
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
            value={filters.types}
            onChange={e => onTypeChange(e.target.value as string[])}
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
                    backgroundColor: filters.types.includes(type)
                      ? 'rgb(25, 118, 210)'
                      : 'rgba(0, 0, 0, 0.08)',
                    color: filters.types.includes(type) ? 'white' : 'inherit',
                    '&:hover': {
                      backgroundColor: filters.types.includes(type)
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
    </Paper>
  );
};
