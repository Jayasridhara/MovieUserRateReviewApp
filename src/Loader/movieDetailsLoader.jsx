import { getMovieDetails } from "../services/omdbService";


export const movieDetailsLoader = async ({ params }) => {
  const data = await getMovieDetails(params.id);

  if (data.Response === 'True') return data;

  throw new Response('', {
    status: 404,
    statusText: data.Error || 'Movie not found',
  });
};