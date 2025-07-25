import { Router } from 'express';
import axios from 'axios';
import Anime from '../models/Anime.js';

const router = Router();

// 🔥 Fetch and save top anime from Jikan API
router.get('/fetch', async (req, res) => {
  try {
    const { data } = await axios.get('https://api.jikan.moe/v4/top/anime?limit=25');

    const animeList = data.data.map(anime => ({
      mal_id: anime.mal_id,
      url: anime.url,
      images: {
        jpg: {
          image_url: anime.images?.jpg?.image_url || '',
          large_image_url: anime.images?.jpg?.large_image_url || ''
        },
        webp: {
          image_url: anime.images?.webp?.image_url || '',
          large_image_url: anime.images?.webp?.large_image_url || ''
        }
      },
      trailer: {
        youtube_id: anime.trailer?.youtube_id || '',
        url: anime.trailer?.url || '',
        embed_url: anime.trailer?.embed_url || ''
      },
      approved: anime.approved,
      title_english: anime.title_english || anime.title || '',
      type: anime.type,
      episodes: anime.episodes,
      status: anime.status,
      airing: anime.airing,
      aired: anime.aired,
      duration: anime.duration,
      rating: anime.rating,
      score: anime.score,
      rank: anime.rank,
      synopsis: anime.synopsis,
      background: anime.background,
      season: anime.season,
      year: anime.year,
      broadcast: anime.broadcast
    }));

    await Anime.deleteMany(); // Clears old data (optional)
    await Anime.insertMany(animeList);

    res.status(200).json({ message: '🎉 Anime data saved successfully!' });
  } catch (err) {
    console.error('❌ Error fetching/saving anime:', err.message);
    res.status(500).json({ error: 'Failed to fetch/save anime' });
  }
});

// 🚀 Send anime to frontend
router.get('/', async (req, res) => {
  try {
    const anime = await Anime.find().sort({ rank: 1 });
    res.status(200).json(anime);
  } catch (err) {
    console.error('❌ Error fetching anime from DB:', err.message);
    res.status(500).json({ error: 'Failed to retrieve anime' });
  }
});

export default router;
