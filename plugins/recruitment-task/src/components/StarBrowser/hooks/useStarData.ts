import { useSuspenseQuery } from '@tanstack/react-query';
import { useApi, discoveryApiRef, fetchApiRef } from '@backstage/core-plugin-api';
import { Star } from '../types';

export const useStarData = () => {
    const discoveryApi = useApi(discoveryApiRef);
    const fetchApi = useApi(fetchApiRef);

    return useSuspenseQuery({
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
}; 