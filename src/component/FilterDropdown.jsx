import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const FilterDropdown = ({ selectedType, onChange,setSearchTerm }) => {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);
 
  useEffect(() => {
   setSearchTerm('')
    const handleClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options = [
    { value: '', label: 'All Types' },
    { value: 'movie', label: 'Movie' },
    { value: 'series', label: 'Series' },
  ];

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="p-2 sm:p-0 sm:px-4 sm:py-2 bg-gray-100 sm:bg-blue-600 text-gray-700 sm:text-white rounded hover:bg-gray-200 sm:hover:bg-blue-700 focus:outline-none"
      >
        <FontAwesomeIcon icon={faFilter} className="h-5 w-5 sm:hidden" />
        <span className="hidden sm:inline">
          {options.find(o => o.value === selectedType)?.label || 'All Types'}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md text-sm z-10">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                opt.value === selectedType ? 'font-semibold text-blue-600' : ''
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
