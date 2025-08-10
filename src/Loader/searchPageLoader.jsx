import { getMovieDetails, searchMovies } from "../services/omdbService";



export const searchPageLoader = async ({ request }) => {
  const url = new URL(request.url);
  const qParam = url.searchParams.get('q');
  const page = parseInt(url.searchParams.get('page')) || 1;
  const type = url.searchParams.get('type') || '';
  const year = url.searchParams.get('year') || '';
  const query = qParam === null ? 'avengers' : qParam;
  const genre = url.searchParams.get('genre') || '';
  const data = await searchMovies(query, page, type, year);

  if (data.Response === 'True') {
     const detailedMovies = await Promise.all(
      data.Search.map(m => getMovieDetails(m.imdbID))
    );
    return {
      movies:detailedMovies,
      totalResults: parseInt(data.totalResults, 10),
      query,
      page,
      type,
      year,
      genre,
      error: null,
    };
  } else {
    return {  
      movies: [],
      totalResults: 0,
      query,
      page,
      type,
      year,
      genre,
      error: data.Error || 'No movies found',
    };
  }
};