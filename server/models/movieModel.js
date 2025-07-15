const moongoose = require("mongoose");
const { type } = require("os");

const movieSchema = new moongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  genre: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  language: { type: String, required: true },
  poster: { type: String, required: true },
  showTimes: [{ type: String, required: true }],
});

const Movies = moongoose.model("movies", movieSchema);
module.exports = Movies;
