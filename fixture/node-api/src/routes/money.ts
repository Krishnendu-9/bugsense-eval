import { Router } from 'express';
import { parseMoney } from '../lib/parseMoney';

export const moneyRouter = Router();

function cartTotal(amount: string) {
  return { totalCents: parseMoney(amount) };
}

function refundAmount(amount: string) {
  return { refundCents: parseMoney(amount) };
}

moneyRouter.post('/cart/total', (req, res) => {
  res.json(cartTotal(req.body.amount));
});

moneyRouter.post('/refunds', (req, res) => {
  res.json(refundAmount(req.body.amount));
});
