import { useState, useMemo, useCallback } from 'react';
import { Star, SortConfig, SortableKeys } from '../types';

export const useStarSorting = (stars: Star[]) => {
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: 'name',
        direction: 'asc',
    });

    const sortedStars = useMemo(() => {
        if (!sortConfig.key) {
            return stars;
        }

        return [...stars].sort((a, b) => {
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
    }, [stars, sortConfig]);

    const handleSortRequest = useCallback(
        (key: SortableKeys) => {
            const isAsc = sortConfig.key === key && sortConfig.direction === 'asc';
            setSortConfig({ key, direction: isAsc ? 'desc' : 'asc' });
        },
        [sortConfig],
    );

    return {
        sortConfig,
        sortedStars,
        handleSortRequest,
    };
}; 