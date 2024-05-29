import css from './MovieReviews.module.css';
import { FaUser } from "react-icons/fa";
import { getMoviesReviews } from '../../films-api';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

type Review = {
  id: string;
  author: string;
  content: string;
};

export default function MovieReviews() {
  const { movieId } = useParams<{ movieId: string }>();
  const [moviesReviews, setMoviesReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchMovieReviews() {
      setIsLoading(true);
      try {
        const movieIdNumber = parseInt(movieId || '');
        const data = await getMoviesReviews(movieIdNumber);
        setMoviesReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Please try again later...</p>}
      <ul className={css.reviewsList}>
        {moviesReviews.length > 0 ? (
          moviesReviews.map(({ id, author, content }) => (
            <li className={css.reviewItem} key={id}>
              <p><FaUser /> {author}</p>
              <p>{content}</p>
            </li>
          ))
        ) : (
          <p>There are still no reviews for this movie</p>
        )}
      </ul>
    </div>
  );
}
