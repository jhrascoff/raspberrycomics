import { Router } from 'express';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

let merch = [];

async function loadMerch() {
  const data = await readFile(join(__dirname, '..', 'data', 'merch.json'), 'utf-8');
  merch = JSON.parse(data);
}

loadMerch();

router.get('/', (req, res) => {
  const { category } = req.query;
  if (category) {
    return res.json(merch.filter(m => m.category.toLowerCase() === category.toLowerCase()));
  }
  res.json(merch);
});

router.get('/:id', (req, res) => {
  const item = merch.find(m => m.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Merch not found' });
  res.json(item);
});

export default router;
