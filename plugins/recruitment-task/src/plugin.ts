import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const recruitmentTaskPlugin = createPlugin({
  id: 'recruitment-task',
  routes: {
    root: rootRouteRef,
  },
});

export const RecruitmentTaskPage = recruitmentTaskPlugin.provide(
  createRoutableExtension({
    name: 'RecruitmentTaskPage',
    component: () =>
      import('./components/RecruitmentTaskPage').then(
        m => m.RecruitmentTaskPage,
      ),
    mountPoint: rootRouteRef,
  }),
);
