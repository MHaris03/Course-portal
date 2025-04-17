import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import "../style/Topclass.css"
import Loader from "./Loader"
import { BASE_URL } from '../utils/BASE_URL';

function TopClasses() {
  const [topClasses, setTopClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/top_classes`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setTopClasses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching top classes:', error);
        setLoading(false);
      });
  }, []);

  const handleViewClass = (classId, course) => {
    const averages = {
      avgHours: course.avgHours,
      conceptDifficulty: course.conceptDifficulty,
      assignmentDifficulty: course.assignmentDifficulty,
      gradeDifficulty: course.gradeDifficulty,
      difficulty: course.difficulty,
      usefulness: course.usefulness,
      interest: course.interest,
      creditHours: course.creditHours,
      numReviews: course.numReviews,
    };

    navigate(`/class/${classId}`, {
      state: {
        averages: averages,
      },
    });
  };
  return (
    <section className="popular-classes">
      <h2>Popular Classes</h2>
      {loading ? (
        <Loader />
      ) : (
        <ul className="classes-list">
          {topClasses.map((course) => (
            <li key={course.classId} className="class-card">
              <div className="class-content">
                <h3>{course.CourseTitle}</h3>
                <div className='heading'>
                <p><strong>Department:</strong> {course.department}</p>
                <p><strong>Class Number:</strong> {course.classNum}</p>
                <p><strong>Credit Hours:</strong> {course.creditHours ?? "N/A"}</p>
                <p><strong>Number of Reviews:</strong> {course.numReviews ?? 0}</p>
                <p><strong>Average Hours Spent on the Class Weekly:</strong> {course.avgHours ?? 0}</p>
                </div>
                <div className="ratings">
                  <div className="rating-item">
                    <span>Overall :</span>
                    <StarRating rating={course.difficulty} max={10} />
                  </div>
                  <div className="rating-item">
                    <span>Concept :</span>
                    <StarRating rating={course.conceptDifficulty} max={10} />
                  </div>
                  <div className="rating-item">
                    <span>Assignment :</span>
                    <StarRating rating={course.assignmentDifficulty} max={10} />
                  </div>
                  <div className="rating-item">
                    <span>Grade :</span>
                    <StarRating rating={course.gradeDifficulty} max={10} />
                  </div>
                  <div className="rating-item">
                    <span>Usefulness:</span>
                    <StarRating rating={course.usefulness} max={10} />
                  </div>
                  <div className="rating-item">
                    <span>Interest:</span>
                    <StarRating rating={course.interest} max={10} />
                  </div>
                </div>
              </div>
              <button onClick={() => handleViewClass(course.classId, course)} className='viewbtn'>
                View Class
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TopClasses;

