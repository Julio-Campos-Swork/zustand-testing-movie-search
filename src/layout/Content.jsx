import { useMovieStore } from '../store/useMovieStore';
import { useEffect, useState } from 'react';
import { MovieCarousel } from '../components/MovieCarousel';
import { Typography } from '@mui/material';
export const Content = () => {
  const movieTop = useMovieStore((state) => state.movieTop);
  const actualPage = useMovieStore((state) => state.actualPage);
  const movieTopResults = useMovieStore((state) => state.movieTopResults);
  const moviePopularResults = useMovieStore(
    (state) => state.moviePopularResults
  );
  const moviePopular = useMovieStore((state) => state.moviePopular);
  const selectedByGenreIsActive = useMovieStore(
    (state) => state.selectedByGenreIsActive
  );
  const selectedGenreResults = useMovieStore(
    (state) => state.selectedGenreResults
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieTop = async () => {
      await movieTop(actualPage);
      await moviePopular(actualPage);
      setIsLoading(false);
    };
    fetchMovieTop(actualPage);
  }, []);

  return (
    <>
      {selectedByGenreIsActive ? (
        <MovieCarousel movies={selectedGenreResults} />
      ) : (
        <>
          {isLoading ? (
            <div>Cargando..</div>
          ) : (
            <>
              <div style={{ margin: '20px 0' }}>
                <Typography variant="h6" color="initial">
                  Top Movies
                </Typography>
                <MovieCarousel movies={movieTopResults} />
              </div>
            </>
          )}
          {!moviePopularResults ? (
            <div>Cargando...</div>
          ) : (
            <>
              <div style={{ margin: '20px 0' }}>
                <Typography variant="h6" color="initial">
                  Popular Movies
                </Typography>
                <MovieCarousel movies={moviePopularResults} />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
