import {  useLoaderData, useNavigate, useOutletContext } from 'react-router';

import Pagination from './Pagination';
import MovieCard from './MovieCard';
import Popup from './Popup';
import { useContext } from 'react';
import { MovieContext } from './Layout';

export default function SearchPage() {
  const navigate = useNavigate();
  const { movies, totalResults, query, page, type, error } = useLoaderData();
 const {showErrorPopup,setShowErrorPopup}=useContext(MovieContext);
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full font-poppins">
            {movies.filter(m => m.Poster !== 'N/A').slice(0, 9).map(movie => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">No movies found.</p>
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
