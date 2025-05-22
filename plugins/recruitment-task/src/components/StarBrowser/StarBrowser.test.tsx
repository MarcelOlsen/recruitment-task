import { renderInTestApp } from '@backstage/test-utils';
import { screen } from '@testing-library/react';
import React from 'react';
import { StarBrowser } from './StarBrowser';

describe('ExampleFetchComponent', () => {
  it('renders the user table', async () => {
    await renderInTestApp(<StarBrowser />);

    expect(screen.getByRole('list', { name: 'Stars' })).toBeInTheDocument();
  });
});
