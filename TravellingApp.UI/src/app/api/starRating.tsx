import React, { useState } from 'react';
import './StarRating.css';

interface StarRatingProps {
  totalStars: number;
  initialRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ totalStars, initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (value: number) => {
    setRating(value);
  };

  return (
    <div className="stars">
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          className={index < rating ? 'star active' : 'star'}
          onClick={() => handleClick(index + 1)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
