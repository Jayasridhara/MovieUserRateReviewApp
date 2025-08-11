import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';
import { useEffect, useRef, useState } from 'react';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router';
import { FaFilter } from 'react-icons/fa';
const years = Array.from({ length: 50 }, (_, i) => `${2001 + i}`);
const genres = ["Action", "Adventure", "Comedy", "Animation", "Sci-Fi"];

export default function Navbar() {
  const { query, page, type, year } = useLoaderData();
  const [genre, setGenre] = useState('');
  const [codeYear, setCodeYear] = useState(year || '');
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

    navigate(`/?q=${termToSearch}&page=1&type=${type}`);
  };

 const applyFilters = () => {
  const params = new URLSearchParams();
  if (type) params.set('type', type);
  if (codeYear) params.set('year', codeYear);
  if (genre) params.set('genre', genre);

  setSearchTerm(''); // Clear the search bar
  navigate(`/?${params.toString()}&page=1`);
  setShowFilter(false);
};

  const resetFilters = () => {
    setCodeYear('');
    setGenre('');
    setShowFilter(false);
    navigate(`/?page=1`);
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
              <div className="absolute top-12 right-0 bg-white shadow-lg border p-4 rounded w-60 z-30">
                <h3 className="font-semibold mb-2">Filters</h3>
                <div className="flex justify-center gap-2">
                <div className="mb-2">
                  <FilterDropdown
                    label="Year"
                    options={years.map(y => ({ value: y, label: y }))}
                    selected={codeYear}
                    onChange={setCodeYear}
                  />
                </div>
                <div className="mb-4">
                  <FilterDropdown
                    label="Genre"
                    options={genres.map(g => ({ value: g, label: g }))}
                    selected={genre}
                    onChange={setGenre}
                  />
                </div>
              </div>
                <div className="flex justify-between gap-2">
                  <button
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    onClick={applyFilters}
                  >
                    Apply
                  </button>
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400"
                    onClick={resetFilters}
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
