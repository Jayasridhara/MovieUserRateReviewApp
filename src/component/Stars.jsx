import { useState } from "react";

function Stars({ count = 5, movieId }) {
  const initial = Number(localStorage.getItem(`rating-${movieId}`)) || 0;
  const [rating, setRating] = useState(initial);
  const [hover, setHover] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    localStorage.setItem(`rating-${movieId}`, value);
  };

  return (
    <div className="stars">
      {[...Array(count)].map((_, i) => {
        const idx = i + 1;
        return (
          <span
            key={idx}
            style={{ cursor: "pointer", color: idx <= (hover || rating) ? "gold" : "lightgray", fontSize: "24px" }}
            onMouseEnter={() => setHover(idx)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleClick(idx)}
          >★</span>
        );
      })}
    </div>
  );
}

export default Stars;