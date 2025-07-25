// models/Anime.js
import mongoose from 'mongoose';

const animeSchema = new mongoose.Schema({
  mal_id: Number,
  title: String,
  image_url: String,
  score: Number,
  rank: Number,
});

const Anime = mongoose.model('Anime', animeSchema);
export default Anime;
