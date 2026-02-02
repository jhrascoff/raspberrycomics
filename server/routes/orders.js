import { Router } from 'express';

const router = Router();
const orders = [];
let nextOrderId = 1;

router.post('/', async (req, res) => {
  const { items, redeemPoints } = req.body;
  if (!items || !items.length) return res.status(400).json({ error: 'No items' });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = 0;

  if (redeemPoints && redeemPoints > 0) {
    discount = redeemPoints / 100;
  }

  const total = Math.max(0, subtotal - discount);
  const userId = req.headers['x-user-id'] ? Number(req.headers['x-user-id']) : null;
  const order = {
    id: nextOrderId++,
    userId,
    items,
    subtotal: Math.round(subtotal * 100) / 100,
    discount: Math.round(discount * 100) / 100,
    total: Math.round(total * 100) / 100,
    date: new Date().toISOString(),
  };

  orders.push(order);
  res.json(order);
});

export default router;
