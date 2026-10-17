import { Router } from 'express';
import axios from 'axios';

export const checkoutRouter = Router();

const PAYMENTS_URL = process.env.PAYMENTS_URL || 'http://eval-mock:7103/payments/charge';

checkoutRouter.post('/checkout/pay', async (req, res, next) => {
  try {
    // F5: the payment provider answers 502 and nothing handles it.
    const charge = await axios.post(PAYMENTS_URL, { amount: req.body.amount });
    res.json(charge.data);
  } catch (err) {
    next(err);
  }
});
