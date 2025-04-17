import React from 'react';
import '../style/ProgressBar.css';

function ProgressBar({ rating, max = 5 }) {
  const percentage = (rating / max) * 100;

  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${percentage}%` }}></div>
      <span className="rating-number">{rating}</span>
    </div>
  );
}

export default ProgressBar;