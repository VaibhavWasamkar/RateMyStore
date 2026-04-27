import { useState } from "react";

const RatingStars = ({ currentRating, onRate }) => {
  const [hover, setHover] = useState(0);

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: "pointer",
            fontSize: "20px",
            color: star <= (hover || currentRating) ? "gold" : "gray"
          }}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onRate(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingStars;