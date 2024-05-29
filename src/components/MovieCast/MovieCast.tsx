import css from './MovieCast.module.css';
import { RiUserStarFill } from "react-icons/ri";
import { getMoviesCast } from '../../films-api';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

type CastMember = {
  credit_id: string;
  profile_path: string | null;
  original_name: string;
  character: string;
};

type CastResponse = CastMember[];


export default function MovieCast() {
  const { movieId } = useParams<{ movieId?: string | undefined }>();
  const [moviesCast, setMoviesCast] = useState<CastMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchMovieCast() {
      setIsLoading(true);
      try {
        const movieIdNumber = parseInt(movieId || '');
          const data: CastResponse = await getMoviesCast(movieIdNumber);
          setMoviesCast(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieCast();
  }, [movieId]);

  const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Please try again later...</p>}
      <ul className={css.castList}>
        {moviesCast.length > 0 ? (
          moviesCast.map(({ credit_id, profile_path, original_name, character }) => (
            <li key={credit_id}>
              <img
                className={css.img}
                src={profile_path ? `https://image.tmdb.org/t/p/w200${profile_path}` : defaultImg}
                alt={original_name}
                width={200}
              />
              <h2 className={css.castTitle}><RiUserStarFill /> {original_name}</h2>
              <p className={css.castChar}>"{character}"</p>
            </li>
          ))
        ) : (
          <p>No info provided</p>
        )}
      </ul>
    </div>
  );
}

