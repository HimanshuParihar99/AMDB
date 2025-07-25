import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  image_url: String,
  large_image_url: String
}, { _id: false });

const titleSchema = new mongoose.Schema({
  type: String,
  title: String
}, { _id: false });

const propDateSchema = new mongoose.Schema({
  day: Number,
  month: Number,
  year: Number
}, { _id: false });

const airedSchema = new mongoose.Schema({
  from: String,
  to: String,
  prop: {
    from: propDateSchema,
    to: propDateSchema,
    string: String
  }
}, { _id: false });


const broadcastSchema = new mongoose.Schema({
  day: String,
  time: String,
  timezone: String,
  string: String
}, { _id: false });

const trailerSchema = new mongoose.Schema({
  youtube_id: String,
  url: String,
  embed_url: String
}, { _id: false });

const animeSchema = new mongoose.Schema({
  mal_id: Number,
  url: String,
  images: {
    jpg: imageSchema,
    webp: imageSchema
  },
  trailer: trailerSchema,
  approved: Boolean,
  title_english: String,
  type: String,
  episodes: Number,
  status: String,
  airing: Boolean,
  aired: airedSchema,
  duration: String,
  rating: String,
  score: Number,
  rank: Number,
  synopsis: String,
  background: String,
  season: String,
  year: Number,
  broadcast: broadcastSchema,
}, { timestamps: true });

export default mongoose.model("Anime", animeSchema);
