import { Request, Response, NextFunction } from 'express';

export function requireUser(req: Request & { user?: { id: string } }, _res: Response, next: NextFunction) {
  // F4: the session middleware that sets req.user is not mounted on this router.
  const userId = req.user.id;
  (req as any).userId = userId;
  next();
}
