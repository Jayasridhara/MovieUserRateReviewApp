import axios from "axios";

const API_KEY = "6aeaf20f";
const BASE_URL = "https://www.omdbapi.com/";

const movieDetailsCache = {}; // cache for storing fetched movie details

export const searchMovies = async (query, page = 1, type = "", year = "") => {
  const params = { s: query, page, type, apikey: API_KEY };
  if (year) params.y = year;
  const { data } = await axios.get(BASE_URL, { params });
  return data;
};

export const getMovieDetails = async (imdbID) => {
  // If we already fetched this movie, return from cache
  if (movieDetailsCache[imdbID]) {
    return movieDetailsCache[imdbID];
  }

  const params = { i: imdbID, apikey: API_KEY };
  const { data } = await axios.get(BASE_URL, { params });

  if (data.Response === "True") {
    movieDetailsCache[imdbID] = data; // store in cache
  }

  return data;
};
