export interface Star {
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

export type SortableKeys =
    | 'name'
    | 'distanceLightYears'
    | 'massSolarMasses'
    | 'radiusMeters'
    | 'temperatureKelvin'
    | 'ageYears';

export interface SortConfig {
    key: SortableKeys | null;
    direction: 'asc' | 'desc';
}

export interface TableHeaderCell {
    id: SortableKeys;
    label: string;
    numeric: boolean;
}

export interface StarFilters {
    name: string;
    radius: string;
    types: string[];
} 