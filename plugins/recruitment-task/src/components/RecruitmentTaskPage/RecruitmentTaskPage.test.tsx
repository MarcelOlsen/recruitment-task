import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { registerMswTestHooks, renderInTestApp } from '@backstage/test-utils';
import { screen } from '@testing-library/react';
import { RecruitmentTaskPage } from './RecruitmentTaskPage';

describe('RecruitmentTaskPage', () => {
  const server = setupServer();
  // Enable sane handlers for network requests
  registerMswTestHooks(server);

  // setup mock response
  beforeEach(() => {
    server.use(
      rest.get('/*', (_, res, ctx) => res(ctx.status(200), ctx.json({}))),
    );
  });

  it('should render', async () => {
    await renderInTestApp(<RecruitmentTaskPage />);
    expect(
      screen.getByText('Welcome to Recruitment Task!'),
    ).toBeInTheDocument();
  });
});
