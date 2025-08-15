

import Pagination from './Pagination';
import MovieCard from './MovieCard';
import Popup from './Popup';
import { useContext, useEffect, useState } from 'react';
import { MovieContext } from './Layout';
import { useLoaderData, useLocation, useNavigate } from 'react-router';
import { getMovieDetails } from '../services/omdbService';

export default function SearchPage() {
  const navigate = useNavigate();
  const location=useLocation();
  const { movies, genre,totalResults, page, type } = useLoaderData();
   const [detailedMovies, setDetailedMovies] = useState([]);
    const {showErrorPopup,setShowErrorPopup}=useContext(MovieContext);
//fetch genre from movie details 
  useEffect(() => {
    if (location.state?.fromDetails) {
      setShowErrorPopup(false);
      window.history.replaceState({}, '', window.location.pathname + window.location.search);
    }
  }, [location.state, setShowErrorPopup]);
 const filtered = movies
    .filter(m => m.Poster !== 'N/A')
    .filter(m => !genre || m.Genre.includes(genre));

 useEffect(() => {
    if (movies.length && filtered.length === 0) {
      setShowErrorPopup(true);
    } else {
      setShowErrorPopup(false);
    }
  }, [movies, filtered, setShowErrorPopup]);
   const handlePageChange = (newPage) => {
    // Get the search parameters from the current URL
    const currentParams = new URLSearchParams(location.search);
    const currentQuery = currentParams.get('q');

    // Build the new search parameters for the next page
    const newParams = new URLSearchParams();
    if (currentQuery) {
      newParams.set('q', currentQuery); // Keep the existing query if it's there
    }
    newParams.set('page', newPage);
    if (type) {
      newParams.set('type', type);
    }
    
    // Navigate to the new URL
    navigate(`/?${newParams.toString()}`);
  };
  return (
    
    <div className="flex flex-col h-full">      
      <div className=" pt-[72px] pb-[64px] p-4 flex-grow ">
      {showErrorPopup && (
          <Popup
            message="No movies found for this search."  
            onClose={() => {
              setShowErrorPopup(false);
              navigate('/'); // Clear query params after user confirms
            }}
          />
        )}

        {movies.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 h-full font-poppins">
             {filtered.map(movie => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))
            }
          </div>
        ) : (

          !showErrorPopup && (
            <Popup
            message="No movies found for this search."  
            onClose={() => {
              setShowErrorPopup(false);
              navigate('/'); // Clear query params after user confirms
            }}
          />
          )
        )}
      </div>
       <div className="fixed bottom-0 left-0 w-full bg-white z-20 p-2 font-poppins">
        <Pagination
          currentPage={page}
          totalResults={totalResults}
          onPageChange={handlePageChange}
        />
      </div>  
    </div>
  );
}
