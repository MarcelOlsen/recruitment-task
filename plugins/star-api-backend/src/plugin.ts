import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';
import { catalogServiceRef } from '@backstage/plugin-catalog-node';
import { createStarListService } from './services/StarService';

/**
 * starApiPlugin backend plugin
 *
 * @public
 */
export const starApiPlugin = createBackendPlugin({
  pluginId: 'star-api',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        httpRouter: coreServices.httpRouter,
        catalog: catalogServiceRef,
      },
      async init({ logger, httpRouter, catalog }) {
        const starListService = await createStarListService({
          logger,
          catalog,
        });

        httpRouter.use(
          await createRouter({
            starListService,
          }),
        );
        httpRouter.addAuthPolicy({
          path: '/stars',
          allow: 'unauthenticated',
        });
      },
    });
  },
});
