import React, { Suspense } from 'react';
import Container from '@mui/material/Container';
import { configApiRef, useApi } from '@backstage/core-plugin-api';
import { ErrorBoundary } from 'react-error-boundary';
import { useStarData } from './hooks/useStarData';
import { useStarFilters } from './hooks/useStarFilters';
import { useStarSorting } from './hooks/useStarSorting';
import { StarFilters } from './components/StarFilters';
import { StarTable } from './components/StarTable';
import { StarBrowserSkeleton } from './components/StarBrowserSkeleton';

const StarBrowserContent: React.FC = () => {
  const configApi = useApi(configApiRef);
  const isVisible = configApi.getOptionalBoolean('task.vars.isVisible') ?? true;

  const { data: stars } = useStarData();

  const {
    filters,
    filteredStars,
    uniqueStarTypes,
    updateNameFilter,
    updateRadiusFilter,
    updateTypeFilter,
  } = useStarFilters(stars);

  const { sortConfig, sortedStars, handleSortRequest } =
    useStarSorting(filteredStars);

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
      <StarFilters
        filters={filters}
        uniqueStarTypes={uniqueStarTypes}
        onNameChange={updateNameFilter}
        onRadiusChange={updateRadiusFilter}
        onTypeChange={updateTypeFilter}
      />
      <StarTable
        stars={sortedStars}
        sortConfig={sortConfig}
        onSortRequest={handleSortRequest}
      />
    </Container>
  );
};

export const StarBrowser: React.FC = () => {
  return (
    <Suspense fallback={<StarBrowserSkeleton />}>
      <ErrorBoundary
        fallback={<div>An error occurred while fetching stars</div>}
      >
        <StarBrowserContent />
      </ErrorBoundary>
    </Suspense>
  );
};
