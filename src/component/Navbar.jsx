import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';
import { useEffect, useRef, useState } from 'react';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router';
import { FaFilter, FaSyncAlt } from 'react-icons/fa';
const years = Array.from({ length: 50 }, (_, i) => `${2001 + i}`);
const genres = ["Action", "Adventure", "Comedy", "Animation", "Sci-Fi"];
const ratings = [
  { value: 'below5', label: 'Below 5' },
  { value: '5to8', label: '5 - 8' },
  { value: 'above8', label: 'Above 8' }
];

export default function Navbar() {
  const { query, type, year, genre: initialGenre, rating: initialRating } = useLoaderData();
  const [genre, setGenre] = useState(initialGenre || '');
  const [codeYear, setCodeYear] = useState(year || '');
  const [rating, setRating] = useState(initialRating || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isDetailPage = location.pathname.startsWith('/movie/');

  const filterRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlQuery = params.get('q');
    setSearchTerm(urlQuery || '');
  }, [location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (termOverride) => {
    const termToSearch = (typeof termOverride === 'string' ? termOverride : searchTerm).trim();
    if (termToSearch === '') return;

    setSearchHistory(prev => {
      const newHistory = [termToSearch, ...prev.filter(item => item !== termToSearch)];
      return newHistory.slice(0, 5);
    });

    const params = new URLSearchParams();
    params.set('q', termToSearch);
    if (type) params.set('type', type);
    navigate(`/?${params.toString()}&page=1`);
  };

  const updateFilters = (updatedYear, updatedGenre, updatedRating) => {
    const params = new URLSearchParams();
    if (updatedYear) params.set('year', updatedYear);
    if (updatedGenre) params.set('genre', updatedGenre);
    if (updatedRating) params.set('rating', updatedRating);
    if (type) params.set('type', type);

    setSearchTerm(''); // clear search bar when filters used
    navigate(`/?${params.toString()}&page=1`);
  };

  const handleYearChange = (selectedYear) => {
    setCodeYear(selectedYear);
    updateFilters(selectedYear, genre, rating);
  };

  const handleGenreChange = (selectedGenre) => {
    setGenre(selectedGenre);
    updateFilters(codeYear, selectedGenre, rating);
  };

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
    updateFilters(codeYear, genre, selectedRating);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white z-20 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <Link to="/" className="text-2xl font-bold font-lexend">🎬 Cine Search X</Link>

      {!isDetailPage && (
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
            searchHistory={searchHistory}
            isSearchFocused={isSearchFocused}
            setIsSearchFocused={setIsSearchFocused}
          />

          <div className="relative" ref={filterRef}>
            <button
              className="p-2 rounded bg-gray-200 hover:bg-gray-300 focus:outline-none"
              onClick={() => setShowFilter(prev => !prev)}
              title="Filter"
            >
              <FaFilter />
            </button>

            {showFilter && (
              <div
                  className="
                    absolute
                    top-full left-0 w-47 rounded-none border-t border-gray-200 bg-white p-4 z-30
                    sm:top-12 sm:right-0 sm:left-auto sm:w-60 sm:rounded sm:border sm:shadow-lg sm:border-gray-200
                  "
                >
                <div className='flex justify-between'>
                  <h3 className="font-semibold mb-2">Filters</h3>
                  {(codeYear || genre || rating) && (
                    <button
                      title="Reset filters"
                      className="p-2 text-red-600 bg-red-100 rounded hover:bg-red-200"
                      onClick={() => {
                        setCodeYear('');
                        setGenre('');
                        setRating('');
                        setSearchTerm('');
                        navigate(`/?page=1`);
                      }}
                    >
                      <FaSyncAlt />
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <FilterDropdown
                    label="Year"
                    options={years.map(y => ({ value: y, label: y }))}
                    selected={codeYear}
                    onChange={handleYearChange}
                  />
                  <FilterDropdown
                    label="Genre"
                    options={genres.map(g => ({ value: g, label: g }))}
                    selected={genre}
                    onChange={handleGenreChange}
                  />
                  <FilterDropdown
                    label="Rating"
                    options={ratings}
                    selected={rating}
                    onChange={handleRatingChange}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}