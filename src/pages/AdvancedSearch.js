import React, { useState, useEffect } from 'react';
import { Range } from 'react-range';
import "../style/AdvancedSearch.css"

function AdvancedSearch({ onSearch, initialDepartment = '', initialCourseNumber = '' }) {
  const [department, setDepartment] = useState(initialDepartment);
  const [courseNumber, setCourseNumber] = useState(initialCourseNumber);
  const [minReviews, setMinReviews] = useState(0);
  const [difficultyRange, setDifficultyRange] = useState([0, 10]);
  const [minUsefulness, setMinUsefulness] = useState(0);
  const [minInterest, setMinInterest] = useState(0);
  const [minAvgHours, setMinAvgHours] = useState(0);
  const [maxAvgHours, setMaxAvgHours] = useState(30);
  const [conceptDifficulty, setConceptDifficulty] = useState([0, 10]);
  const [assignmentDifficulty, setAssignmentDifficulty] = useState([0, 10]);
  const [gradeDifficulty, setGradeDifficulty] = useState([0, 10]);
  const [sortBy, setSortBy] = useState('');
  const [creditHours, setCreditHour] = useState(0); // New state for credit hour
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [classLevels, setClassLevels] = useState({
    '1000': false,
    '2000': false,
    '3000': false,
    '4000': false,
    '5000+': false,
    
  });

  useEffect(() => {
    setDepartment(initialDepartment);
    setCourseNumber(initialCourseNumber);
  }, [initialDepartment, initialCourseNumber]);

  const handleSearch = () => {
    const searchParams = {
      department,
      courseNumber,
      minReviews,
      minDifficulty: difficultyRange[0],
      maxDifficulty: difficultyRange[1],
      minUsefulness,
      minInterest,
      minAvgHours,
      maxAvgHours,
      minConceptDifficulty: conceptDifficulty[0],
      maxConceptDifficulty: conceptDifficulty[1],
      minAssignmentDifficulty: assignmentDifficulty[0],
      maxAssignmentDifficulty: assignmentDifficulty[1],
      minGradeDifficulty: gradeDifficulty[0],
      maxGradeDifficulty: gradeDifficulty[1],
      creditHours, // Include credit hour in search parameters
      sortBy,
      classLevels
    };
    onSearch(searchParams);
  };

  const handleClassLevelChange = (level) => {
    setClassLevels((prevLevels) => ({
      ...prevLevels,
      [level]: !prevLevels[level]
    }));
  };
  const toggleFilter = () => setIsFilterOpen((prev) => !prev);

  return (
    <div className="advanced-search-container">
      <div style={{ display: "flex", alignItems: "center", width: "full" }}>
        <div className="form-group">
          <label>Department(s):</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Enter up to 5 departments (e.g. MATH,CS,PHYS)"
          />
        </div>
        <div className="form-group">
          <label>Class Number:</label>
          <input
            type="text"
            value={courseNumber}
            onChange={(e) => setCourseNumber(e.target.value)}
          />
        </div>
      </div>
      {isFilterOpen && (
        <div className="advance-filter-form">
          {/* Minimum Reviews */}
          <div style={{ display: "flex", alignItems: "center", width: "full", justifyContent: "space-between" }}>
            <div className="form-group">
              <label>Minimum Number of Reviews:</label>
              <input
                type="number"
                value={minReviews}
                onChange={(e) => setMinReviews(Number(e.target.value))}
              />
            </div>

            {/* Difficulty Range */}
            <div className="range-section">
              <label>Difficulty (Min - Max):</label>
              <Range
                step={0.1}
                min={0}
                max={10}
                values={difficultyRange}
                onChange={(values) => setDifficultyRange(values)}
                renderTrack={({ props, children }) => (
                  <div {...props} className="range-track">
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div {...props} className="range-thumb" />
                )}
              />
              <div className="range-values">
                <span>Min: {difficultyRange[0]}</span>
                <span className="range-max">Max: {difficultyRange[1]}</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", width: "full", justifyContent: "space-between" }}>
            {/* Minimum Usefulness */}
            <div className="form-group">
              <label>Minimum Usefulness:</label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={minUsefulness}
                onChange={(e) => setMinUsefulness(Number(e.target.value))}
              />
              <span>{minUsefulness}</span>
            </div>

            {/* Minimum Interest */}
            <div className="form-group">
              <label>Minimum Interest:</label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={minInterest}
                onChange={(e) => setMinInterest(Number(e.target.value))}
              />
              <span>{minInterest}</span>
            </div>
          </div>

          {/* Average Hours per Week */}
          <div className="form-group">
            <label>Average Hours per Week:</label>
            <div className="hours-inputs">
              <input
                type="number"
                value={minAvgHours}
                onChange={(e) => setMinAvgHours(Number(e.target.value))}
                placeholder="Min Hours"
              />
              <input
                type="number"
                value={maxAvgHours || ''}
                style={{ marginTop: '7px' }}
                onChange={(e) => setMaxAvgHours(Number(e.target.value))}
                placeholder="Max Hours"
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", width: "full", justifyContent: "space-between" }}>
            {/* Concept Difficulty */}
            <div className="range-section">
              <label>Concept Difficulty (Min - Max):</label>
              <Range
                step={0.1}
                min={0}
                max={10}
                values={conceptDifficulty}
                onChange={(values) => setConceptDifficulty(values)}
                renderTrack={({ props, children }) => (
                  <div {...props} className="range-track">
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div {...props} className="range-thumb" />
                )}
              />
              <div className="range-values">
                <span>Min: {conceptDifficulty[0]}</span>
                <span className="range-max">Max: {conceptDifficulty[1]}</span>
              </div>
            </div>

            {/* Assignment Difficulty */}
            <div className="range-section">
              <label>Assignment Difficulty (Min - Max):</label>
              <Range
                step={0.1}
                min={0}
                max={10}
                values={assignmentDifficulty}
                onChange={(values) => setAssignmentDifficulty(values)}
                renderTrack={({ props, children }) => (
                  <div {...props} className="range-track">
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div {...props} className="range-thumb" />
                )}
              />
              <div className="range-values">
                <span>Min: {assignmentDifficulty[0]}</span>
                <span className="range-max">Max: {assignmentDifficulty[1]}</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", width: "full", justifyContent: "space-between" }}>
            {/* Grade Difficulty */}
            <div className="range-section">
              <label>Grade Difficulty (Min - Max):</label>
              <Range
                step={0.1}
                min={0}
                max={10}
                values={gradeDifficulty}
                onChange={(values) => setGradeDifficulty(values)}
                renderTrack={({ props, children }) => (
                  <div {...props} className="range-track">
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div {...props} className="range-thumb" />
                )}
              />
              <div className="range-values">
                <span>Min: {gradeDifficulty[0]}</span>
                <span className="range-max">Max: {gradeDifficulty[1]}</span>
              </div>
            </div>

            {/* Sort By */}
            <div className="form-group">
              <label>Sort By:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="">Select...</option>
                <option value="difficulty">Difficulty</option>
                <option value="usefulness">Usefulness</option>
                <option value="interest">Interest</option>
              </select>
            </div>
            <div className="form-group">
            <label>Credit Hour:</label>
            <input
              type="number"
              value={creditHours}
              onChange={(e) => setCreditHour(Number(e.target.value))}
              placeholder="Enter Credit Hour"
            />
          </div>

          </div>
          {/* Class Levels */}
          <div className="form-group">
            <label>Class Levels:</label>
            <div style={{ display: 'flex',gap:"40px" }}>
              {Object.keys(classLevels).map((level) => (
                <div key={level}>
                  <input
                    type="checkbox"
                    checked={classLevels[level]}
                    onChange={() => handleClassLevelChange(level)}
                  />
                  <label>{level}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Search BTN */}
      <div className='bottom-btnsubmit'>
        <button onClick={handleSearch} className='search-btn'>Search</button>
        <button
          onClick={toggleFilter}
          style={{
            backgroundColor: '#c20f2f',
            border: 'none',
            padding: '10px 15px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="filter" fill="white" width="24" height="24" style={{ marginRight: '8px' }}>
            <path d="M4 10h7.09a6 6 0 0 0 11.82 0H44a1 1 0 0 0 0-2H22.91A6 6 0 0 0 11.09 8H4a1 1 0 0 0 0 2zM17 5a4 4 0 1 1-4 4A4 4 0 0 1 17 5zM44 23H36.91a6 6 0 0 0-11.82 0H4a1 1 0 0 0 0 2H25.09a6 6 0 0 0 11.82 0H44a1 1 0 0 0 0-2zM31 28a4 4 0 1 1 4-4A4 4 0 0 1 31 28zM44 38H22.91a6 6 0 0 0-11.82 0H4a1 1 0 0 0 0 2h7.09a6 6 0 0 0 11.82 0H44a1 1 0 0 0 0-2zM17 43a4 4 0 1 1 4-4A4 4 0 0 1 17 43z"></path>
          </svg>
          <span style={{ color: 'white', fontSize: '16px' }}>Filters</span>
        </button>
      </div>
    </div>
  );
}

export default AdvancedSearch;
