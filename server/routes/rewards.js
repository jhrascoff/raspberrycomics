import { Router } from 'express';

const router = Router();

const allRewards = new Map();

function getOrCreateRewards(userId) {
  if (!allRewards.has(userId)) {
    allRewards.set(userId, { points: 0, totalSpent: 0, history: [] });
  }
  return allRewards.get(userId);
}

function getTier(points) {
  if (points >= 2000) return { name: 'Royal', multiplier: 2, freeShipping: true, next: null, nextAt: null };
  if (points >= 500) return { name: 'Jam', multiplier: 1.5, freeShipping: false, next: 'Royal', nextAt: 2000 };
  return { name: 'Berry', multiplier: 1, freeShipping: false, next: 'Jam', nextAt: 500 };
}

function getUserId(req) {
  return req.headers['x-user-id'] ? Number(req.headers['x-user-id']) : null;
}

router.get('/', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Not authenticated' });
  const rewards = getOrCreateRewards(userId);
  const tier = getTier(rewards.points);
  res.json({ ...rewards, tier });
});

router.post('/earn', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Not authenticated' });

  const { amount, orderId } = req.body;
  if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });

  const rewards = getOrCreateRewards(userId);
  const tier = getTier(rewards.points);
  const basePoints = Math.floor(amount * 10);
  const earned = Math.floor(basePoints * tier.multiplier);

  rewards.points += earned;
  rewards.totalSpent += amount;
  rewards.history.push({
    type: 'earn',
    points: earned,
    orderId,
    date: new Date().toISOString(),
  });

  const newTier = getTier(rewards.points);
  res.json({ earned, totalPoints: rewards.points, tier: newTier });
});

router.post('/redeem', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Not authenticated' });

  const rewards = getOrCreateRewards(userId);
  const { points } = req.body;
  if (!points || points <= 0 || points > rewards.points) {
    return res.status(400).json({ error: 'Invalid points amount' });
  }

  const discount = points / 100;
  rewards.points -= points;
  rewards.history.push({
    type: 'redeem',
    points: -points,
    discount,
    date: new Date().toISOString(),
  });

  const tier = getTier(rewards.points);
  res.json({ discount, remainingPoints: rewards.points, tier });
});

export default router;
