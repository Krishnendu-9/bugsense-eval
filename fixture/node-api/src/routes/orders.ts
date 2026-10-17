import { Router } from 'express';
import { Order } from '../models/Order';

export const ordersRouter = Router();

ordersRouter.post('/orders', (req, res) => {
  // F1: guest orders are posted without a customer object.
  const customerId = req.body.customer.id;
  res.status(201).json({ customerId });
});

ordersRouter.get('/orders/:id', async (req, res, next) => {
  try {
    // F3: the id comes straight from the URL and is never validated.
    const order = await Order.findById(req.params.id);
    res.json(order);
  } catch (err) {
    next(err);
  }
});
