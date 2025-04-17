import React from 'react';
import '../style/ReviewItem.css';

function ReviewItem({ review }) {
  const getRatingColor = (rating, isDifficulty = false) => {
    // Invert the colors for difficulty ratings
    if (isDifficulty) {
      if (rating > 6) return 'red';
      if (rating > 3) return 'orange';
      return 'green';
    }

    // Default behavior for non-difficulty ratings
    if (rating >= 7) return 'green';
    if (rating >= 4) return 'orange';
    return 'red';
  };

  const renderBar = (rating, isDifficulty = false) => (
    <div className="rating-bar-container">
      <div
        className="rating-bar"
        style={{
          width: `${rating * 10}%`,
          backgroundColor: getRatingColor(rating, isDifficulty),
        }}
      ></div>
    </div>
  );

  const renderBooleanBadge = (value, label) => (
    <span className={`boolean-badge ${value ? 'yes' : 'no'}`}>
      {value ? `${label}: Yes` : `${label}: No`}
    </span>
  );

  const renderTagBadge = (tagValue, label) => (
    <span className={`tag-badge ${tagValue ? 'active' : 'inactive'}`}>
      {label}
    </span>
  );
  const getAttendanceMessage = (attendanceValue) => {
    switch (attendanceValue) {
      case 1:
        return 'Mandatory, and you should go';
      case 2:
        return 'Mandatory, but you should skip';
      case 3:
        return 'Not mandatory, but you should go';
      case 4:
        return 'Not mandatory, and you can attend 3 classes all year and get an A';
      default:
        return 'Attendance information not provided';
    }
  };

  return (
    <div className="review-item-container">
      <h3>Professor: {review.professorName}</h3>
      <p><strong>What Year Did You Take This Class:</strong> {review.year}</p>

<p><strong>Attendance:</strong> {getAttendanceMessage(review.attendanceMandatory)}</p>
      <div className="rating-section">
        <p><strong>Concept Difficulty:</strong></p>
        {renderBar(review.conceptDifficulty, true)}
      </div>

      <div className="rating-section">
        <p><strong>Assignment Difficulty:</strong></p>
        {renderBar(review.assignmentDifficulty, true)}
      </div>

      <div className="rating-section">
        <p><strong>Grade Difficulty:</strong></p>
        {renderBar(review.gradeDifficulty, true)}
      </div>

      <div className="rating-section">
        <p><strong>Overall Difficulty:</strong></p>
        {renderBar(review.difficulty, true)}
      </div>
      <div className="rating-section">
        <p><strong>Usefulness:</strong></p>
        {renderBar(review.usefulness)}
      </div>

      <div className="rating-section">
        <p><strong>Interest:</strong></p>
        {renderBar(review.interest)}
      </div>
      <div className="boolean-section">
        {renderBooleanBadge(review.onlineClass, 'Online Class')}
        {renderBooleanBadge(review.wouldTakeAgain, 'Would Take Again')}
      </div>
      <div className="tags-section">
        <p><strong>Tags:</strong></p>
        {renderTagBadge(review.testHeavy, 'Test Heavy')}
        {renderTagBadge(review.lotsOfHomework, 'Lots of Homework')}
        {renderTagBadge(review.projectHeavy, 'Project Heavy')}
        {renderTagBadge(review.textbookNeeded, 'Textbook Needed')}
        {renderTagBadge(review.easyButBoring, 'Easy but Boring')}
        {renderTagBadge(review.hardButInteresting, 'Hard but Interesting')}
        {renderTagBadge(review.hardButLearnedALot, 'Hard but Learned a Lot')}
        {renderTagBadge(review.nightTests, 'Night Tests')}
        {renderTagBadge(review.onlineTests, 'Online Tests')}
      </div>
      <p><strong>Comments:</strong> {review.comments || 'No comments provided'}</p>
      <p><strong>Advice:</strong> {review.advice || 'No advice provided'}</p>
      <p><strong>Hardest Part of Class:</strong> {review.hardestPartOfClass || 'Not specified'}</p>
    </div>
  );
}

export default ReviewItem;
