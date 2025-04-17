import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../style/MyReviews.css';
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL } from '../utils/BASE_URL';

function MyReviews() {

  const [reviews, setReviews] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const location = useLocation();
  const userId = location.state?.userId;

  useEffect(() => {
    if (!userId) {
      toast.error(' Cannot fetch reviews.');
      return;
    }

    const fetchReviews = async () => {
      try {
        const reviewsResponse = await fetch(
          `${BASE_URL}/reviews?userId=${userId}`, {
          method: "GET",
          credentials: "include"
        }
        );
        if (reviewsResponse.ok) {
          const reviewsData = await reviewsResponse.json();
          console.log(reviewsData);
          setReviews(reviewsData);
        } else {
          toast.error('Failed to fetch reviews');
        }
      } catch (error) {
        toast.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [userId]);

  const handleDeleteReview = async () => {
    if (reviewToDelete) {
      try {
        const response = await fetch(
          `${BASE_URL}/delete-review/${reviewToDelete.reviewId}`,
          {
            method: 'DELETE',
            credentials: "include"
          }
        );

        if (response.ok) {
          setReviews(reviews.filter((review) => review.reviewId !== reviewToDelete.reviewId));
          setShowPopup(false);
        } else {
          toast.error('Failed to delete the review');
        }
      } catch (error) {
        toast.error('Error deleting review:', error);
      }
    }
  };

  const openDeletePopup = (review) => {
    setReviewToDelete(review);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setReviewToDelete(null);
  };

  const renderStars = (rating) => {
    // Ensure the rating is between 0 and 5
    const safeRating = Math.max(0, Math.min(rating, 5));
    const filledStars = '★'.repeat(safeRating);
    const emptyStars = '☆'.repeat(5 - safeRating);
    return (
      <span className="star-rating">
        {filledStars}{emptyStars}
      </span>
    );
  };
  return (
    <div className='reviews-main'>
      <div className="my-reviews-container">
        <h2>What students say about our courses</h2>
        {reviews.length > 0 ? (
          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <div key={index} className="review-card">
                <p className="quote-icon">“</p>
                <h3 className="course-title">{review.class.CourseTitle}</h3>
                <p><strong>Professor:</strong> {review.professorName}</p>
                <p><strong>Year:</strong> {review.year}</p>
                <p><strong>Online Class:</strong> {review.onlineClass ? 'Yes' : 'No'}</p>
                <p><strong>Concept Difficulty:</strong> {renderStars(review.conceptDifficulty)}</p>
                <p><strong>Assignment Difficulty:</strong> {renderStars(review.assignmentDifficulty)}</p>
                <p><strong>Grade Difficulty:</strong> {renderStars(review.gradeDifficulty)}</p>
                <p><strong>Usefulness:</strong> {renderStars(review.usefulness)}</p>
                <p><strong>Interest:</strong> {renderStars(review.interest)}</p>

                <button className="delete-button" onClick={() => openDeletePopup(review)}>
                  🗑️
                </button>
              </div>

            ))}
          </div>
        ) : (
          <p>No reviews written yet.</p>
        )}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <p>Are you sure you want to delete this review?</p>
              <button onClick={handleDeleteReview}>Yes</button>
              <button onClick={closePopup}>No</button>
            </div>
          </div>
        )}
        <Toaster />
      </div>
    </div>
  );
}

export default MyReviews;
