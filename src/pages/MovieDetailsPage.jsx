
import defaultImage from '../assets/default-image.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useLoaderData, useNavigate } from 'react-router';
import Stars from '../component/Stars';


const MovieDetailsPage = () => {
 
const movie = useLoaderData();
const navigate=useNavigate();
const posterUrl =movie.Poster && movie.Poster !== "N/A"? movie.Poster: defaultImage;

 return (
  
<>

  <div className="p-4 max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 font-poppins">
    <img
      src={posterUrl}
      alt={movie.Title}
       onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = defaultImage;
        }}
      className="w-full md:w-full rounded-lg shadow-lg object-cover"
    />

    <div className="flex flex-col">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.Title} <span className="text-gray-500">({movie.Year})</span></h1>
      <p className="text-indigo-600 mb-4">{movie.Genre}</p>
      <p className="text-gray-800 mb-6 leading-relaxed">{movie.Plot}</p>

      <div className="space-y-2 mb-6">
        <p><strong>🎭 Cast:</strong> <span className="text-gray-700">{movie.Actors}</span></p>
        <p><strong>🎬 Director:</strong> <span className="text-gray-700">{movie.Director}</span></p>
      </div>

      <div className="mb-6">
        <p className="font-semibold mb-2">⭐ Ratings</p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {movie.Ratings.map((r,i) => (
            <li key={i}>{r.Source}: {r.Value}</li>
          ))}
        </ul>
      </div>
           <div className="mb-6">
        <p className="font-semibold mb-2">Your Rating</p>
        <Stars movieId={movie.imdbID} count={5} />
      </div>
   <button
      onClick={() => navigate((-1), { state: { fromDetails: true } })} 
      className=" cursor-pointer group self-start bg-blue-600 text-white px-5 py-2 rounded-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 inline-flex items-center"
    >
      <span>Back to Search</span>
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="text-white group-hover:text-white transform group-hover:translate-x-1 transition duration-200"
      />
    </button>
  
    </div>
  </div>

</>
);};

export default MovieDetailsPage;
