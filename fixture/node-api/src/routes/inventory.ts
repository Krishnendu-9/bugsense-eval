import { Router } from 'express';

export const inventoryRouter = Router();

// F6: the inventory service is not running on this host.
const INVENTORY_URL = 'http://127.0.0.1:7197/stock';

inventoryRouter.get('/inventory/:sku', async (req, res, next) => {
  try {
    const stock = await fetch(`${INVENTORY_URL}/${req.params.sku}`);
    res.json(await stock.json());
  } catch (err) {
    next(err);
  }
});
