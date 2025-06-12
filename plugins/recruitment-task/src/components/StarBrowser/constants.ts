import { TableHeaderCell } from './types';

export const SORTABLE_TABLE_HEADERS: TableHeaderCell[] = [
    { id: 'name', label: 'Name', numeric: false },
    { id: 'distanceLightYears', label: 'Distance (LY)', numeric: true },
    { id: 'massSolarMasses', label: 'Mass (Solar)', numeric: true },
    { id: 'radiusMeters', label: 'Radius (m)', numeric: true },
    { id: 'temperatureKelvin', label: 'Temp (K)', numeric: true },
    { id: 'ageYears', label: 'Age (Years)', numeric: true },
];

export const NON_SORTABLE_TABLE_HEADERS = [
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