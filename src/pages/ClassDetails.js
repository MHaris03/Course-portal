import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ReviewItem from './ReviewItem';
import SuccessBanner from './SuccessBanner';
import '../style/ClassDetails.css';
import StarRating from './StarRating';
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL } from '../utils/BASE_URL';
import Loader from "../pages/Loader";

function ClassDetails({ onRateCourse }) {
  const { classId } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [classInfoLoading, setClassInfoLoading] = useState(true); 
  const [reviewsLoading, setReviewsLoading] = useState(true); 
  const location = useLocation();
  const [showBanner, setShowBanner] = useState(false);
  const reviewSuccess = location.state?.reviewSuccess;
  // const averages = location.state?.averages || null;

  useEffect(() => {
    setClassInfoLoading(true);
    fetch(`${BASE_URL}/classes/${classId}`)
      .then(response => response.json())
      .then(data => {
        setClassInfo(data);
        setClassInfoLoading(false);
      })
      .catch(error => {
        toast.error('Error fetching class info:', error);
        setClassInfoLoading(false);
      });

    setReviewsLoading(true);
    fetch(`${BASE_URL}/reviews?classId=${classId}`)
      .then(response => response.json())
      .then(data => {
        setReviews(data);
        setReviewsLoading(false);
      })
      .catch(error => {
        toast.error('Error fetching reviews:', error);
        setReviewsLoading(false);
      });
  }, [classId]);

  useEffect(() => {
    if (reviewSuccess) {
      setShowBanner(true);
    }
  }, [reviewSuccess, reviews]);

  return (
    <div className="details-container">
      <div className="class-details-container">
        <Toaster />
        {showBanner && (
          <SuccessBanner
            message="Your review has been successfully recorded!"
            onClose={() => setShowBanner(false)}
          />
        )}
        {classInfoLoading ? (
          <Loader />
        ) : classInfo ? (
          <>
          <h1>Class Details</h1>
            <h1 className="class-title">{classInfo.CourseTitle}</h1>
            <p><strong>Class Number:</strong> {classInfo.classNum}</p>
            <p><strong>Department:</strong> {classInfo.department}</p>
            <p><strong>Description:</strong> {classInfo.courseDescription}</p>
            {/* {averages ? ( */}
              <div className="averages">
                <h2>Ratings Averages</h2>
                <p><strong>Number of Reviews:</strong> {classInfo.count ?? 0}</p>
                <p><strong>Average Hours Spent on the Class Weekly:</strong> {classInfo.avgHours ?? 'N/A'}</p>
                <div className="average-item">
                  <span>Concept Difficulty:</span>
                  <StarRating rating={classInfo.conceptDifficulty} max={10} />
                </div>
                <div className="average-item">
                  <span>Assignment Difficulty:</span>
                  <StarRating rating={classInfo.assignmentDifficulty} max={10} />
                </div>
                <div className="average-item">
                  <span>Grade Difficulty:</span>
                  <StarRating rating={classInfo.gradeDifficulty} max={10} />
                </div>
                <div className="average-item">
                  <span>Overall Difficulty:</span>
                  <StarRating rating={classInfo.difficulty} max={10} />
                </div>
                <div className="average-item">
                  <span>Usefulness:</span>
                  <StarRating rating={classInfo.usefulness} max={10} />
                </div>
                <div className="average-item">
                  <span>Interest:</span>
                  <StarRating rating={classInfo.interest} max={10} />
                </div>
              </div>
            {/* // ) : (
            //   <p>Loading average ratings...</p>
            // )} */}
            <button
              onClick={() => onRateCourse(classId)}
              className="rate-course-button"
            >
              Rate this Course
            </button>
            <h2>Reviews for this Class</h2>
            {reviewsLoading ? (
              <Loader />
            ) : reviews.length > 0 ? (
              <div className="review-list-container">
                {reviews.map((review, index) => (
                  <ReviewItem key={index} review={review} />
                ))}
              </div>
            ) : (
              <p>No reviews available for this class.</p>
            )}
          </>
        ) : (
          <p>Class information not found</p>
        )}
      </div>
    </div>
  );
}

export default ClassDetails;
