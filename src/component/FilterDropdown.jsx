// component/FilterDropdown.jsx

import { useEffect, useRef, useState } from "react";


const FilterDropdown = ({ label, options, selected, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const currentLabel = options.find((o) => o.value === selected)?.label || label;

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
      >
        {currentLabel}
      </button>

      {open && (
        <div className="absolute mt-1 w-30 bg-white border rounded shadow-md z-10">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
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
