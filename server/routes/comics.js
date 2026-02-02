import { Router } from 'express';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

let comics = [];

async function loadComics() {
  const data = await readFile(join(__dirname, '..', 'data', 'comics.json'), 'utf-8');
  comics = JSON.parse(data);
}

loadComics();

router.get('/', (req, res) => {
  const { genre } = req.query;
  if (genre) {
    return res.json(comics.filter(c => c.genre.toLowerCase() === genre.toLowerCase()));
  }
  res.json(comics);
});

router.get('/:id', (req, res) => {
  const comic = comics.find(c => c.id === Number(req.params.id));
  if (!comic) return res.status(404).json({ error: 'Comic not found' });
  res.json(comic);
});

export default router;
