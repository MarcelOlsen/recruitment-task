import { useState, useMemo } from 'react';
import { Star, StarFilters } from '../types';

export const useStarFilters = (stars: Star[]) => {
    const [filters, setFilters] = useState<StarFilters>({
        name: '',
        radius: '',
        types: [],
    });

    const uniqueStarTypes = useMemo(() => {
        const types = new Set(stars.map(star => star.type));
        return Array.from(types);
    }, [stars]);

    const filteredStars = useMemo(() => {
        return stars.filter(star => {
            const nameMatch = star.name
                .toLowerCase()
                .includes(filters.name.toLowerCase());
            const radiusMatch =
                filters.radius === '' || star.radiusMeters > parseFloat(filters.radius);
            const typeMatch =
                filters.types.length === 0 || filters.types.includes(star.type);
            return nameMatch && radiusMatch && typeMatch;
        });
    }, [stars, filters]);

    const updateNameFilter = (name: string) => {
        setFilters(prev => ({ ...prev, name }));
    };

    const updateRadiusFilter = (radius: string) => {
        setFilters(prev => ({ ...prev, radius }));
    };

    const updateTypeFilter = (types: string[]) => {
        setFilters(prev => ({ ...prev, types }));
    };

    return {
        filters,
        filteredStars,
        uniqueStarTypes,
        updateNameFilter,
        updateRadiusFilter,
        updateTypeFilter,
    };
}; 