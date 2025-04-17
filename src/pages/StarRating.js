import React from "react";
import "../style/StarRating.css";

function StarRating({ rating, max = 10 }) {
  const numericRating = parseFloat(rating);
  const safeRating = isNaN(numericRating) ? 0 : Math.min(numericRating, max);
  const fullStars = Math.floor(safeRating); 
  const hasHalfStar = safeRating % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <div className="star-rating">
      {Array.from({ length: fullStars }).map((_, index) => (
        
        <span key={`full-${index}`} className="star full-star">
          ★
        </span>
      ))}
      {hasHalfStar && (
        <span className="star half-star">
          ★
        </span>
      )}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <span key={`empty-${index}`} className="star empty-star">
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;
