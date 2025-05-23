
import express from 'express';
import Router from 'express-promise-router';
import { StarListService } from './services/StarService/types';

export async function createRouter({
  starListService,
}: {
  starListService: StarListService;
}): Promise<express.Router> {
  const router = Router();
  router.use(express.json());

  router.get('/stars', async (_, res) => {
    const stars = await starListService.listStars();

    res.json(stars);
  });

  return router;
}
