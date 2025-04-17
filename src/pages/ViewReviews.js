import React, { useState, useEffect } from 'react';
import '../style/ViewReviews.css'; // You can create a CSS file to style your component
import { BASE_URL } from '../utils/BASE_URL';
function ViewReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from the backend
    fetch(`${BASE_URL}/reviews`)
      .then(response => response.json())
      .then(data => {
        setReviews(data);
        console.log('Fetched reviews:', data); // Debugging line
      })
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  return (
    <div className="view-reviews-container">
      <h1>Course Reviews</h1>
      {reviews.length > 0 ? (
        <ul className="reviews-list">
          {reviews.map((review, index) => (
            <li key={index} className="review-item">
              <h2>Review for: {review.class.courseTitle}</h2>
              <p><strong>Professor Name:</strong> {review.professorName}</p>

              {/* Class Information Section */}
              <div className="class-info">
                <h3>Class Information</h3>
                <p><strong>Class Number:</strong> {review.class.classNum}</p>
                <p><strong>Department:</strong> {review.class.department}</p>
                <p><strong>Course Title:</strong> {review.class.CourseTitle}</p>
              </div>

              {/* User Information Section */}
              <div className="user-info">
                <h3>User Information</h3>
                <p><strong>Username:</strong> {review.user.userName}</p>
                <p><strong>Email:</strong> {review.user.email}</p>
                <p><strong>Major:</strong> {review.user.major}</p>
                <p><strong>Grade:</strong> {review.user.grade}</p>
              </div>

              {/* Review Details Section */}
              <div className="review-details">
                <h3>Review Details</h3>
                <p><strong>Course Grade:</strong> {review.grade}</p>
                <p><strong>Year:</strong> {review.year}</p>
                <p><strong>Online Class:</strong> {review.onlineClass ? 'Yes' : 'No'}</p>
                <p><strong>Textbook Use:</strong> {review.textbookUse ? 'Yes' : 'No'}</p>
                <p><strong>Would Take Again:</strong> {review.wouldTakeAgain ? 'Yes' : 'No'}</p>
                <p><strong>Attendance Mandatory:</strong> {review.attendanceMandatory ? 'Yes' : 'No'}</p>
                <p><strong>Workload:</strong> {review.workLoad}</p>
                <p><strong>Overall Rating:</strong> {review.overallRating}</p>
                <p><strong>Difficulty:</strong> {review.difficulty}</p>
                <p><strong>Interest:</strong> {review.interest}</p>
                <p><strong>Usefulness:</strong> {review.usefulness}</p>
                <p><strong>Professor Rating:</strong> {review.professorRating}</p>
                <p><strong>Test Heavy:</strong> {review.testHeavy ? 'Yes' : 'No'}</p>
                <p><strong>Lots of Homework:</strong> {review.lotsOfHomework ? 'Yes' : 'No'}</p>
                <p><strong>Group Projects:</strong> {review.groupProjects ? 'Yes' : 'No'}</p>
                <p><strong>Good Lectures:</strong> {review.goodLectures ? 'Yes' : 'No'}</p>
                <p><strong>Elective:</strong> {review.elective ? 'Yes' : 'No'}</p>
                <p><strong>Comments:</strong> {review.comments || 'N/A'}</p>
                <p><strong>Advice:</strong> {review.advice || 'N/A'}</p>
                <p><strong>Professor Comments:</strong> {review.professorComments || 'N/A'}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}

export default ViewReviews;
