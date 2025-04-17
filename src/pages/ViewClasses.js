import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/ViewClasses.css';
import StarRating from './StarRating';
import AdvancedSearch from './AdvancedSearch';
import { BASE_URL } from '../utils/BASE_URL';
import Loader from "../pages/Loader"

function ViewClasses() {
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsData, setReviewsData] = useState({});
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const navigate = useNavigate();
  const classesPerPage = 21;

  const location = useLocation();
  const { department: initialDepartment, courseNumber: initialCourseNumber } = location.state || {};

  const [searchParams, setSearchParams] = useState({
    department: initialDepartment || '',
    courseNumber: initialCourseNumber || '',
    minReviews: 0,
    minDifficulty: 0,
    maxDifficulty: 10,
    minUsefulness: 0,
    minInterest: 0,
    minAvgHours: 0,
    maxAvgHours: null,
    minConceptDifficulty: 0,
    maxConceptDifficulty: 10,
    minAssignmentDifficulty: 0,
    maxAssignmentDifficulty: 10,
    minGradeDifficulty: 0,
    maxGradeDifficulty: 10,
    creditHours: 0,
    sortBy: '',
    classLevels: {
      level1000: false,
      level2000: false,
      level3000: false,
      level4000: false,
      level5000: false,
    },
  });

  useEffect(() => {
    let query = '';
    console.log(searchParams)
    const { department, courseNumber, minReviews, minDifficulty, maxDifficulty, minUsefulness, minInterest, minAvgHours, maxAvgHours, minConceptDifficulty, maxConceptDifficulty, minAssignmentDifficulty, maxAssignmentDifficulty, minGradeDifficulty, maxGradeDifficulty, creditHours, sortBy, classLevels } = searchParams;
    console.log(creditHours)
    if (department) {
      const departmentsArray = department.split(',').map(dept => dept.trim());
      if (departmentsArray.length > 0) {
        query += `?department=${departmentsArray.join(',')}`;
      }
    }
    if (courseNumber) {
      query += `${query ? '&' : '?'}courseNumber=${courseNumber}`;
    }
    if (minReviews) {
      query += `${query ? '&' : '?'}minReviews=${minReviews}`;
    }
    if (minDifficulty || maxDifficulty) {
      query += `${query ? '&' : '?'}minDifficulty=${minDifficulty}&maxDifficulty=${maxDifficulty}`;
    }
    if (minUsefulness) {
      query += `${query ? '&' : '?'}minUsefulness=${minUsefulness}`;
    }
    if (minInterest) {
      query += `${query ? '&' : '?'}minInterest=${minInterest}`;
    }
    if (minAvgHours) {
      query += `${query ? '&' : '?'}minAvgHours=${minAvgHours}`;
    }
    if (maxAvgHours !== null) {
      query += `${query ? '&' : '?'}maxAvgHours=${maxAvgHours}`;
    }
    if (minConceptDifficulty || maxConceptDifficulty) {
      query += `${query ? '&' : '?'}minConceptDifficulty=${minConceptDifficulty}&maxConceptDifficulty=${maxConceptDifficulty}`;
    }
    if (minAssignmentDifficulty || maxAssignmentDifficulty) {
      query += `${query ? '&' : '?'}minAssignmentDifficulty=${minAssignmentDifficulty}&maxAssignmentDifficulty=${maxAssignmentDifficulty}`;
    }
    if (minGradeDifficulty || maxGradeDifficulty) {
      query += `${query ? '&' : '?'}minGradeDifficulty=${minGradeDifficulty}&maxGradeDifficulty=${maxGradeDifficulty}`;
    }
    if (creditHours) {
      query += `${query ? '&' : '?'}creditHours=${creditHours}`;
    }
    if (sortBy) {
      query += `${query ? '&' : '?'}sortBy=${sortBy}`;
    }
    
    if (Object.values(classLevels).some(value => value)) {
      query += `${query ? '&' : '?'}classLevels=`;
      if (classLevels[1000]) query += '1000,';
      if (classLevels[2000]) query += '2000,';
      if (classLevels[3000]) query += '3000,';
      if (classLevels[4000]) query += '4000,';
      if (classLevels[5000]) query += '5000,';
      query = query.slice(0, -1);
    }
console.log(query)
    fetch(`${BASE_URL}/classes${query}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setClasses(data);

        const reviewsData = {};
        data.forEach(course => {
          reviewsData[course.classId] = {
            avgHours: course.avgHours,
            conceptDifficulty: course.conceptDifficulty,
            assignmentDifficulty: course.assignmentDifficulty,
            gradeDifficulty: course.gradeDifficulty,
            difficulty: course.difficulty,
            usefulness: course.usefulness,
            interest: course.interest,
            creditHours: course.creditHours,
            count: course.numReviews,
          };
        });
        console.log(reviewsData)
        setReviewsData(reviewsData);
      })
      .catch(error => console.error('Error fetching classes:', error));
  }, [searchParams]);

  const handleViewClass = (classId, averages) => {
    navigate(`/class/${classId}`, {
      state: { averages }
    });
  };
  const handleAdvancedSearch = (filters) => {
    setSearchParams({
      ...filters,
      creditHours: filters.creditHours,
    });
  };

  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = classes.slice(indexOfFirstClass, indexOfLastClass);
  const totalPages = Math.ceil(classes.length / classesPerPage);

  useEffect(() => {
    if (currentClasses.length > 0) {
      setLoadingClasses(false);
    }
  }, [currentClasses]);

  useEffect(() => {
    if (Object.keys(reviewsData).length > 0) {
      setLoadingReviews(false);
    }
  }, [reviewsData]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  const renderPageNumbers = () => {
    const pages = [];
    const firstPageGroup = 4;
    const lastPageGroup = totalPages - 2;

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </button>
        );
      }
    } else {
      for (let i = 1; i <= firstPageGroup; i++) {
        if (i <= totalPages) {
          pages.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={currentPage === i ? "active" : ""}
            >
              {i}
            </button>
          );
        }
      }

      if (currentPage > firstPageGroup + 1) {
        pages.push(<span key="dots1">...</span>);
      }

      const startPage = Math.max(currentPage - 1, firstPageGroup + 1);
      const endPage = Math.min(currentPage + 1, lastPageGroup);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </button>
        );
      }

      if (currentPage < lastPageGroup) {
        pages.push(<span key="dots2">...</span>);
      }

      for (let i = totalPages - 1; i <= totalPages; i++) {
        if (i > 0 && i !== startPage) {
          pages.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={currentPage === i ? "active" : ""}
            >
              {i}
            </button>
          );
        }
      }
    }

    return pages;
  };


  return (
    <div className="view-classes-container">
      <h1>Class Search Results</h1>
      <AdvancedSearch
        initialDepartment={searchParams.department}
        initialCourseNumber={searchParams.courseNumber}
        onSearch={handleAdvancedSearch}
      />
      <div className='Loadingclass'>
        {loadingClasses ? (
          <Loader />
        ) : currentClasses.length > 0 ? (
          // <div className="classes-grid">
          //   {currentClasses.map((course) => (
          //     <div className="class-card">
          //       <h2>{course.CourseTitle}</h2>
          //       <p ><strong>Department:</strong> {course?.department}</p>
          //       <p ><strong>Class Number:</strong> {course?.classNum}</p>
          //       {loadingReviews ? (
          //         <Loader />
          //       ) : reviewsData[course.classId] ? (
          //         <div className="ratings">
          //           <p className="info-text"><strong>Number of Reviews:</strong> {reviewsData[course.classId]?.count ?? 0}</p>
          //           <p className="info-text"><strong>Average Hours:</strong> {reviewsData[course.classId]?.avgHours ?? 0}</p>
          //           <div className="rating-item">
          //             <span>Concept:</span>
          //             <div className="stars">
          //               <StarRating rating={reviewsData[course.classId].conceptDifficulty} max={10} />
          //             </div>
          //           </div>
          //           <div className="rating-item">
          //             <span>Assignment :</span>
          //             <div className="stars"><StarRating rating={reviewsData[course.classId].assignmentDifficulty} max={10} /></div>
          //           </div>

          //           <div className="rating-item">
          //             <span>Grade :</span>
          //             <div className="stars"><StarRating rating={reviewsData[course.classId].gradeDifficulty} max={10} /></div>
          //           </div>

          //           <div className="rating-item">
          //             <span>Overall :</span>
          //             <div className="stars"><StarRating rating={reviewsData[course.classId].difficulty} max={10} /></div>
          //           </div>

          //           <div className="rating-item">
          //             <span>Usefulness:</span>
          //             <div className="stars"><StarRating rating={reviewsData[course.classId].usefulness} max={10} /></div>
          //           </div>

          //           <div className="rating-item">
          //             <span>Interest:</span>
          //             <div className="stars"><StarRating rating={reviewsData[course.classId].interest} max={10} /></div>
          //           </div>
          //         </div>
          //       ) : (
          //         <Loader />
          //       )}
          //       <button onClick={() => handleViewClass(course.classId, reviewsData[course.classId])} className='view-class'>
          //         View Class
          //       </button>
          //     </div>
          //   ))}
          // </div>
          <ul className="classes-list">
            {currentClasses.map((course) => (
              <li key={course.classId} className="class-card">
                <div className="class-content">
                  <h3>{course.CourseTitle}</h3>
                  <div className='heading'>
                    <p><strong>Department:</strong> {course.department}</p>
                    <p><strong>Class Number:</strong> {course.classNum}</p>
                    <p><strong>Credit Hours:</strong> {course.creditHours}</p>
                    <p><strong>Number of Reviews:</strong> {reviewsData[course.classId]?.count ?? 0}</p>
                    <p><strong>Average Hours Spent on the Class Weekly:</strong> {reviewsData[course.classId]?.avgHours ?? 0}</p>
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
                <button onClick={() => handleViewClass(course.classId, reviewsData[course.classId])} className='view-class'>
                  View Class
                </button>
              </li>
            ))}

          </ul>
        ) : (
          <p>No classes found.</p>
        )}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="prev"
        >
          &laquo; Prev
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="next"
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
}

export default ViewClasses;
