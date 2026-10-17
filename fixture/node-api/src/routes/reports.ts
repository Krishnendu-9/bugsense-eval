import { Router } from 'express';

export const reportsRouter = Router();

async function buildDailyReport(date: string | undefined) {
  await new Promise((resolve) => setTimeout(resolve, 5));
  // F2: the date parameter is optional in the UI but required here.
  const [year, month, day] = (date as string).split('-');
  return { year, month, day };
}

// Express 4 does not catch rejections from async handlers.
reportsRouter.get('/reports/daily', async (req, res) => {
  const report = await buildDailyReport(req.query.date as string | undefined);
  res.json(report);
});
