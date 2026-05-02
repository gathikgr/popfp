import cors from 'cors';
import express from 'express';
import { connectDB } from './config/db.js';
import { validateEnv } from './config/env.js';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';

const startServer = async () => {
  try {
    validateEnv();
    await connectDB();

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
    app.use('/api/auth', authRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/faculty', facultyRoutes);

    const port = Number(process.env.PORT) || 5000;
    app.listen(port, () => console.log(`Backend listening on ${port}`));
  } catch (error) {
    console.error('Startup error:', error.message);
    process.exit(1);
  }
};

startServer();
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/faculty', facultyRoutes);

const port = process.env.PORT || 5000;
connectDB().then(() => app.listen(port, () => console.log(`Backend listening on ${port}`)));
