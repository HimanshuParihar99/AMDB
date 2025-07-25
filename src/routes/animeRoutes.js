// routes/animeRoutes.js
import { Router } from 'express';
import axios from 'axios';
import Anime from '../models/Anime.js';

const router = Router();

// 🔥 Fetch anime from Jikan and store in MongoDB
router.get('/fetch', async (req, res) => {
  try {
    const { data } = await axios.get('https://api.jikan.moe/v4/top/anime?limit=25');

    const animeList = data.data.map(anime => ({
      mal_id: anime.mal_id,
      title: anime.title,
      image_url: anime.images.jpg.image_url,
      score: anime.score,
      rank: anime.rank,
    }));

    await Anime.deleteMany(); // optional: clear old data
    await Anime.insertMany(animeList);

    res.status(200).json({ message: '🎉 Anime data saved successfully' });
  } catch (err) {
    console.error('❌ Error fetching/saving anime', err);
    res.status(500).json({ error: 'Failed to fetch/save anime' });
  }
});

// 🚀 Send anime to frontend
router.get('/', async (req, res) => {
  try {
    const anime = await Anime.find().sort({ rank: 1 });
    res.status(200).json(anime);
  } catch (err) {
    console.error('❌ Error fetching anime from DB', err);
    res.status(500).json({ error: 'Failed to retrieve anime' });
  }
});

export default router;
