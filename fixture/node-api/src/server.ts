import express from 'express';
import { report } from './reporter';
import { ordersRouter } from './routes/orders';
import { reportsRouter } from './routes/reports';
import { accountRouter } from './routes/account';
import { checkoutRouter } from './routes/checkout';
import { inventoryRouter } from './routes/inventory';
import { notificationsRouter } from './routes/notifications';
import { moneyRouter } from './routes/money';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use(ordersRouter);
app.use(reportsRouter);
app.use(accountRouter);
app.use(checkoutRouter);
app.use(inventoryRouter);
app.use(notificationsRouter);
app.use(moneyRouter);

// Error middleware: report, then answer 500.
app.use((err: unknown, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  report(err, 'uncaught', req.path).finally(() => res.status(500).json({ error: 'Internal Server Error' }));
});

process.on('unhandledRejection', (reason) => {
  // No request is known at process level.
  report(reason, 'rejection', null);
});

const port = Number(process.env.PORT || 7130);
app.listen(port, '0.0.0.0', () => console.log(`shop-api listening on ${port}`));
