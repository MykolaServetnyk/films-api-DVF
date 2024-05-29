import css from './MovieDetailsPage.module.css';
import { Suspense, useState, useEffect, useRef } from 'react';
import { useParams, Outlet, Link, useLocation } from "react-router-dom";
import { getMovieById } from '../../films-api';
import { RiArrowGoBackFill, RiMovie2Line } from "react-icons/ri";
import { FaComment } from "react-icons/fa";

type Genre = {
  id: number;
  name: string;
};

type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string | null;
  genres: Genre[];
};

export default function MovieDetailsPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkURLRef = useRef(location.state?.from ?? "/");

  useEffect(() => {
    async function fetchMovie() {
      try {
        setIsLoading(true);
        const data: Movie = await getMovieById(movieId!);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovie();
  }, [movieId]);

  const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <div>
      <div className={css.goBack}>
        <Link to={backLinkURLRef.current}>Go back <RiArrowGoBackFill size={20} /></Link>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong. Please try again later...</p>}
      {movie && !isLoading && !error && (
        <div className={css.movieDet}>
          <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : defaultImg} alt={movie.title} />
          <div className={css.movieDesc}>
            <h1>{movie.title}</h1>
            <p><span className={css.subtitle}>Overview:</span><br />{movie.overview}</p>
            <p><span className={css.subtitle}>Release Date:</span> {movie.release_date}</p>
            <p><span className={css.subtitle}>User Score:</span> {movie.vote_average.toFixed(1)}</p>
            <p><span className={css.subtitle}>Genres:</span> {movie.genres.map(genre => genre.name).join(', ')}.</p>
          </div>
        </div>
      )}
      <ul className={css.addition}>
        <li>
          <Link to="cast"><RiMovie2Line /> Cast</Link>
        </li>
        <li>
          <Link to="reviews"><FaComment /> Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={<b>Loading nested route...</b>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
