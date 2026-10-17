import { Router } from 'express';

export const notificationsRouter = Router();

// F7: the email service is not running on this host.
const EMAIL_URL = 'http://127.0.0.1:7196/send';

notificationsRouter.post('/notifications/email', async (req, res, next) => {
  try {
    const sent = await fetch(EMAIL_URL, { method: 'POST', body: JSON.stringify({ to: req.body.to }) });
    res.json({ status: sent.status });
  } catch (err) {
    next(err);
  }
});
