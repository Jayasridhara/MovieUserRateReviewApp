const SearchBar = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  searchHistory = [],
  isSearchFocused,
  setIsSearchFocused,
  error
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsSearchFocused(false); // hide dropdown on search
      onSearch(searchTerm);
      setSearchTerm(item); 
    }
  };

  return (  
    <div className="relative w-full sm:w-auto">
      <div className="flex gap-1 items-center justify-center w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)} // delay to allow click
          onKeyDown={handleKeyDown}
          placeholder="Search movies..."
          className="p-2 border border-gray-300 rounded w-full"
        />
        <button
          onClick={() => {
            setIsSearchFocused(false);
            onSearch(searchTerm);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Dropdown Panel */}
      {isSearchFocused && (
        <div className="absolute bg-white border border-gray-300 shadow-md mt-1 w-full rounded z-10">
          {searchHistory.length > 0 ? (
            searchHistory.map((item, idx) => (
              <div
                key={idx}
                onMouseDown={() => {
                   setIsSearchFocused(false);
                    onSearch(item);
                    setSearchTerm(item);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer text-left"
              >
                🔍 {item}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No search history</div>
          )}

         
        </div>
      )}
    </div>
  );
};
export default SearchBar;
