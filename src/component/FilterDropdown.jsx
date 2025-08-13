// component/FilterDropdown new update.jsx

import { useEffect, useRef, useState } from "react";


const FilterDropdown = ({ label, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const currentLabel = options.find((o) => o.value === selected)?.label || label;

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="w-full" ref={ref}>
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="p-2 w-full bg-gray-100 rounded hover:bg-gray-200 focus:outline-none flex justify-between items-center"
      >
        <span>{currentLabel}</span>
        <svg
          className={`w-4 h-4 transition-transform transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {/* KEY CHANGE: The dropdown menu is no longer absolutely positioned. */}
      {/* It now renders as a normal block element, creating an accordion effect. */}
      {isOpen && (
        <div className="mt-1 w-full bg-white border rounded-b-md shadow-inner max-h-48 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false); // Close the accordion after selection
              }}
              className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                opt.value === selected ? "font-semibold text-blue-600" : ""
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