import axios, { AxiosResponse } from "axios";

const TOKEN_API = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjQ4YTI2Y2JiYTc1MDg4YTIwNTY3ZDk1MDM5ZTUyYiIsInN1YiI6IjY2MjUwMTRiMmUyYjJjMDE0OTY1YTc5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NlXNL9ofisAknDUXPQLlGivQpe5PqyAzMoQF2K0RlyY';

const base_url = 'https://api.themoviedb.org/3';

type Movie = {
  id: number;
  original_title: string;
  // Додайте інші властивості фільму за потреби
};

type Cast = {
  credit_id: string;
  profile_path: string | null;
  original_name: string;
  character: string;
  // Додайте інші властивості за потреби
};

type Review = {
  id: string;
  author: string;
  content: string;
  // Додайте інші властивості за потреби
};

const options = {
    headers: {
        Authorization: `Bearer ${TOKEN_API}`
    },
    language: 'en-US',
    include_adult: false
};

export const getTrendingMovies = async (): Promise<Movie[]> => {
    const response: AxiosResponse<Movie[]> = await axios.get(`${base_url}/trending/movie/day`, options);
    return response.data.results;
}

export const getMovieByTitle = async (query: string): Promise<Movie[]> => {
    const response: AxiosResponse<Movie[]> = await axios.get(`${base_url}/search/movie`, {
        ...options,
        params: {
            query: query
        }
    });
    return response.data.results;
}

export const getMovieById = async (movieId: number): Promise<Movie> => {
    const response: AxiosResponse<Movie> = await axios.get(`${base_url}/movie/${movieId}`, options);
    return response.data;
}

export const getMoviesCast = async (movieId: number): Promise<Cast[]> => {
    const response: AxiosResponse<{ cast: Cast[] }> = await axios.get(`${base_url}/movie/${movieId}/credits`, options);
    return response.data.cast;
}

export const getMoviesReviews = async (movieId: number): Promise<Review[]> => {
    const response: AxiosResponse<{ results: Review[] }> = await axios.get(`${base_url}/movie/${movieId}/reviews`, options);
    return response.data.results;
}
