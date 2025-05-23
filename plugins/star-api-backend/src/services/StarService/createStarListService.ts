import { LoggerService } from '@backstage/backend-plugin-api';
import { catalogServiceRef } from '@backstage/plugin-catalog-node';
import * as fs from 'fs';
import { StarListService } from './types';
import { resolvePackagePath } from '@backstage/backend-plugin-api';

export async function createStarListService({
  logger,
}: {
  logger: LoggerService;
  catalog: typeof catalogServiceRef.T;
}): Promise<StarListService> {
  logger.info('Initializing StarListService');

  const starJsonPath = resolvePackagePath(
    '@internal/plugin-star-api-backend',
    'src/data/stars.json',
  );
  const storedStars = JSON.parse(fs.readFileSync(starJsonPath, 'utf8'));

  return {
    async listStars() {
      return { items: storedStars };
    },
  };
}
