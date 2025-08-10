import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';
import {  useEffect, useState } from 'react';

import {  Link, useLoaderData, useLocation, useNavigate } from 'react-router';


export default function Navbar({loaderData}) {
      
 const { movies, query, page, type, error } = useLoaderData();
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
                  <FilterDropdown
                    selectedType={type}
                    onChange={handleTypeChange}
                    setSearchTerm={setSearchTerm}
                  />    
        </div>)}
      </div>
    
    
    </>
  );}
 
