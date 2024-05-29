import css from './HomePage.module.css';
import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../films-api";
import MovieList from '../../components/MovieList/MovieList';

type Movie = {
  id: number;
  original_title: string;
};

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        setIsLoading(true);
        const data: Movie[] = await getTrendingMovies();
        setTrendingMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <p>Trending today</p>
      {isLoading && <p>Loading...</p>}
      {error && <p>Please try again later...</p>}
      {trendingMovies.length > 0 && <MovieList movies={trendingMovies} />}
    </div>
  );
}
