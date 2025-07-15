import { axiosInstance } from ".";

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/api/movies/get-all-movies");
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const addMovie = async (movieData) => {
  try {
    const response = await axiosInstance.post(
      "/api/movies/add-movie",
      movieData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};

export const updateMovie = async (id, movieData) => {
  try {
    const response = await axiosInstance.put(
      `/api/movies/update-movie/${id}`,
      movieData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};

export const deleteMovie = async (payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/movies/delete-movie` + payload.id
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};
