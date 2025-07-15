const express = require("express");
const Movies = require("../models/movieModel");
const { addMovie,getAllMovies,updateMovie,deleteMovie } = require("../controller/movieController");
const movieRouter = express.Router();

movieRouter.post("/add-movie", addMovie);
movieRouter.get("/get-all-movies", getAllMovies);
movieRouter.put("/update-movie/:id", updateMovie);
movieRouter.delete("/delete-movie/:id", deleteMovie);

module.exports = movieRouter;
