import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { recruitmentTaskPlugin, RecruitmentTaskPage } from '../src/plugin';

createDevApp()
  .registerPlugin(recruitmentTaskPlugin)
  .addPage({
    element: <RecruitmentTaskPage />,
    title: 'Root Page',
    path: '/recruitment-task',
  })
  .render();
