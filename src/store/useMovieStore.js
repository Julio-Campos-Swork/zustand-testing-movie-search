import { create } from 'zustand';
import { MOVIE_API_KEY } from '../services/Constantes';
const BASE_URL = 'https://api.themoviedb.org/3';
export const useMovieStore = create((set) => {
  return {
    movieTopResults: [],
    movieGenres: [],
    moviePopularResults: [],
    selectedGenreResults: [],
    actualPage: 1,
    selectedByGenreIsActive: false,
    movieTop: async (page = 1) => {
      const response = await fetch(
        `${BASE_URL}/movie/top_rated?api_key=${MOVIE_API_KEY}&page=${page}`
      );
      const json = await response.json();
      set({ movieTopResults: json.results });
    },
    moviePopular: async (page = 1) => {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${MOVIE_API_KEY}&page=${page}`
      );
      const json = await response.json();
      set({ moviePopularResults: json.results });
    },
    getGenres: async () => {
      const response = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${MOVIE_API_KEY}&language=en-US`
      );
      const json = await response.json();
      // console.log(json);
      set({ movieGenres: json.genres });
    },
    getByGenre: async (genre, genreID, page = 1) => {
      const response = await fetch(
        `${BASE_URL}/movie/top_rated?api_key=${MOVIE_API_KEY}&page=${page}`
      );
      const json = await response.json();
      if (json) set({ selectedByGenreIsActive: true });
      const results = json.results.filter((movie) =>
        movie.genre_ids.includes(genreID)
      );
      if (results) set({ selectedGenreResults: results });
      console.log('por genero', genre, results);
    },
  };
});
