export type Star = {
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


export interface StarListService {
    listStars(): Promise<{ items: Star[] }>;
}

