import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import comicsRouter from './routes/comics.js';
import ordersRouter from './routes/orders.js';
import rewardsRouter from './routes/rewards.js';
import authRouter from './routes/auth.js';
import merchRouter from './routes/merch.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/comics', comicsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/rewards', rewardsRouter);
app.use('/api/merch', merchRouter);

// Serve built React app in production
const clientDist = join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDist));
app.get('*', (req, res) => {
  res.sendFile(join(clientDist, 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Raspberry Comics API running on port ${PORT}`));
