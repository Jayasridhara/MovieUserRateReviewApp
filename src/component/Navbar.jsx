import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';
import { useEffect, useState } from 'react';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router';
const years = Array.from({ length: 50 }, (_, i) => `${2001 + i}`);
const genres = ["Action", "Adventure", "Comedy", "Animation", "Sci-Fi"];
export default function Navbar({loaderData}) {
      
  const { query, page, type, year } = useLoaderData();
  const [genre, setGenre] = useState('');
  const [codeYear, setCodeYear] = useState(year || '');

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();
   const isDetailPage = location.pathname.startsWith('/movie/');

 useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlQuery = params.get('q');

    // If there is a 'q' parameter in the URL, set the search term to its value.
    if (urlQuery) {
      setSearchTerm(urlQuery);
    } else {
      // Otherwise (like after a filter is applied), ensure the search term is empty.
      setSearchTerm('');
    }
  }, [location.search]); // This effect now runs whenever the URL search string changes.

  const handleSearch = (termOverride) => {
    const termToSearch = (typeof termOverride === 'string' ? termOverride : searchTerm).trim();
    
    if (termToSearch === '') return;

    setSearchHistory(prev => {
      const newHistory = [termToSearch, ...prev.filter(item => item !== termToSearch)];
      return newHistory.slice(0, 5);
    });

    // When searching, we always include the 'q' parameter.
    navigate(`/?q=${termToSearch}&page=1&type=${type}`);
  };

  const handleTypeChange = (selectedType) => {
    setSearchTerm(''); // Clear the search bar visually.
    // Navigate without a 'q' parameter. The useEffect above will handle keeping the search bar empty.
    navigate(`/?page=1&type=${selectedType}`);
  };
    const applyFilters = () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (type) params.set('type', type);
    if (codeYear) params.set('year', codeYear);
      if (genre) params.set('genre', genre);
    navigate(`/?${params.toString()}&page=1`);
  };

  return (
        <>
        <div className="fixed top-0 left-0 w-full bg-white z-20 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center ">
        <div>
          <Link to={"/"} className="text-2xl font-bold whitespace-nowrap sm:mr-4 font-lexend ">🎬 Cine Search X</Link>
        </div>
        {!isDetailPage && (
        <div className='flex gap-4 font-poppins'>
                    <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    searchHistory={searchHistory}
                    isSearchFocused={isSearchFocused}
                    setIsSearchFocused={setIsSearchFocused}
                  />
                  <div className="filters">
                    <FilterDropdown
                      label="Year"
                      options={years.map(y => ({ value: y, label: y }))}
                      selected={codeYear}
                      onChange={setCodeYear}
                    />
                    <FilterDropdown
                      label="Genre"
                      options={genres.map(g => ({ value: g, label: g }))}
                      selected={genre}
                      onChange={setGenre}
                    />
                    <button onClick={applyFilters}>Apply</button>
                </div>
        </div>)}
      </div>
    
    
    </>
  );}
 
