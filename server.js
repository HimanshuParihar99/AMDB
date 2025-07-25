// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import animeRoutes from './src/routes/animeRoutes.js';
import { connectDB } from './src/lib/db.js';

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/anime', animeRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB', err);
  }
};

startServer();
