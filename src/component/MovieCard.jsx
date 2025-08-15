
import { Link } from 'react-router';
import defaultImage from '../assets/default-image.jpg';
const MovieCard = ({ movie }) =>{
  const posterUrl =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : defaultImage;
      
return(
  <Link to={`/movie/${movie.imdbID}`} className="block  group h-full">
    <div className=" bg-white rounded shadow py-2  flex flex-col justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full font-poppins" >
         <img
          src={posterUrl}
          alt={movie.Title}
          onError={(e) => {
            e.currentTarget.onerror = null; // Prevent infinite loop
            e.currentTarget.src=defaultImage;
          }}  
          className="w-full h-45  object-cover rounded"
        />
      <div className="mt-2 flex flex-col justify-between flex-grow px-2">
        <h3 className="font-semibold text-base md:text-lg group-hover:text-blue-600 transition-colors">
          {movie.Title}
        </h3>
       <div className="flex justify-between items-center text-gray-500 text-sm mt-auto gap-2">
            <span className='truncate max-w-[70%]'>
              {movie.Year} • {movie.Genre || "Unknown Genre"}
            </span>
            <span className="font-semibold text-yellow-500 whitespace-nowrap">
              ⭐ {movie.imdbRating || "N/A"}
            </span>
          </div>
      </div>
    </div>
  </Link>
);
} 

export default MovieCard;
