import { Router } from 'express';
import { requireUser } from '../middleware/auth';

export const accountRouter = Router();

accountRouter.get('/account', requireUser, (req, res) => {
  res.json({ userId: (req as any).userId });
});
