import express from 'express';
import cors from 'cors';
import comicsRouter from './routes/comics.js';
import ordersRouter from './routes/orders.js';
import rewardsRouter from './routes/rewards.js';
import authRouter from './routes/auth.js';
import merchRouter from './routes/merch.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/comics', comicsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/rewards', rewardsRouter);
app.use('/api/merch', merchRouter);

const PORT = 3001;
app.listen(PORT, () => console.log(`Raspberry Comics API running on http://localhost:${PORT}`));
