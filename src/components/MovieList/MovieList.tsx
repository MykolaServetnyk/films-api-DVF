import css from './MovieList.module.css';
import { NavLink } from "react-router-dom";

type Movie = {
  id: number;
  original_title: string;
};

type MovieListProps = {
  movies: Movie[];
};

export default function MovieList({ movies }: MovieListProps) {
  return (
    <ul className={css.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.movieListItem}>
          <NavLink to={`/movies/${movie.id}`}>{movie.original_title}</NavLink>
        </li>
      ))}
    </ul>
  );
}
