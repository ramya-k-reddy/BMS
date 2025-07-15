const Movie = require("../models/movieModel");

const addMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).json({
      success: true,
      message: "Movie added successfully",
      movie: newMovie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding movie",
      error: error.message,
    });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching movies",
      error: error.message,
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      movie: updatedMovie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating movie",
      error: error.message,
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting movie",
      error: error.message,
    });
  }
};

module.exports = { addMovie, getAllMovies, updateMovie, deleteMovie };
