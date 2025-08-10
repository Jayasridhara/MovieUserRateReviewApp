import { searchMovies } from "../services/omdbService";


export const searchPageLoader = async ({ request }) => {
  const url = new URL(request.url);
  const qParam  = url.searchParams.get('q');
  const page = parseInt(url.searchParams.get('page')) || 1;
  const type = url.searchParams.get('type') || '';
  const query = qParam === null ? 'avengers' : qParam;
  const data = await searchMovies(query, page, type);

  if (data.Response === 'True') {
    return {
      movies: data.Search || [],
      totalResults: parseInt(data.totalResults,10),
      query,
      page,
      type,
      error: null,
    };
  } else {
    return {
      movies: [],
      totalResults: 0,
      query,
      page,
      type,
      error: data.Error || 'No movies found',
    };
  }
};