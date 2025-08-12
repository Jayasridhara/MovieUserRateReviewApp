import { getMovieDetails, searchMovies } from "../services/omdbService";
export const searchPageLoader = async ({ request }) => {
  const url = new URL(request.url);
  const qParam = url.searchParams.get('q');
  const page = parseInt(url.searchParams.get('page')) || 1;
  const type = url.searchParams.get('type') || '';
  const year = url.searchParams.get('year') || '';
   const ratingFilter = url.searchParams.get('rating') || '';
  const query = qParam === null ? 'avengers' : qParam;
  const genre = url.searchParams.get('genre') || '';

  const data = await searchMovies(query, page, type, year);

  if (data.Response === 'True') {
     const detailedMovies = await Promise.all(
      data.Search.map(m => getMovieDetails(m.imdbID))
    );
    let filteredMovies = detailedMovies;
    if (genre) {
      filteredMovies = filteredMovies.filter(m =>
        m.Genre && m.Genre.toLowerCase().includes(genre.toLowerCase())
      );
    }

       if (ratingFilter) {
      filteredMovies = filteredMovies.filter(m => {
        const rating = parseFloat(m.imdbRating);
        if (isNaN(rating)) return false;

        if (ratingFilter === 'below5') return rating < 5;
        if (ratingFilter === '5to8') return rating >= 5 && rating <= 8;
        if (ratingFilter === 'above8') return rating > 8;
        return true;
      });
    }

     return {
      movies: filteredMovies,
     totalResults: parseInt(data.totalResults),
      query,
      page,
      type,
      year,
      genre,
      rating: ratingFilter,
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
      rating: ratingFilter,
      error: data.Error || 'No movies found',
    };
  }
};