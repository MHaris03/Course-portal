import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/RateCourse.css';
import YesNoPicker from './YesNoPicker.js';
import { BASE_URL } from '../utils/BASE_URL.js';
import toast, { Toaster } from 'react-hot-toast';

function RateCourse() {
  const location = useLocation();
  const navigate = useNavigate();
  const { classId } = location.state || {};
  const [classInfo, setClassInfo] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  // Review data states
  const [professorName, setProfessorName] = useState('');
  const [onlineClass, setOnlineClass] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [wouldTakeAgain, setWouldTakeAgain] = useState(false);
  const [attendanceMandatory, setAttendanceMandatory] = useState(1);
  const [workLoad, setWorkLoad] = useState(1);

  // Difficulty and evaluation scores
  const [conceptDifficulty, setConceptDifficulty] = useState(0);
  const [assignmentDifficulty, setAssignmentDifficulty] = useState(0);
  const [gradeDifficulty, setGradeDifficulty] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [interest, setInterest] = useState(0);
  const [usefulness, setUsefulness] = useState(0);

  // Tags
  const [tags, setTags] = useState({
    testHeavy: false,
    lotsOfHomework: false,
    projectHeavy: false,
    textbookNeeded: false,
    easyButBoring: false,
    hardButInteresting: false,
    hardButLearnedALot: false,
    nightTests: false,
    onlineTests: false,
  });

  // Text fields
  const [comments, setComments] = useState('');
  const [advice, setAdvice] = useState('');
  const [hardestPartOfClass, setHardestPartOfClass] = useState('');

  useEffect(() => {
    if (classId) {
      fetch(`${BASE_URL}/classes/${classId}`)
        .then((response) => response.json())
        .then((data) => setClassInfo(data))
        .catch((error) => console.error('Error fetching class info:', error));
    }
  }, [classId]);

  const validateFields = () => {
    if (!professorName) return 'Professor name is required';
    if (!year) return 'Year is required';
    if (!difficulty) return 'Overall difficulty is required';
    if (!interest) return 'Interest rating is required';
    if (!usefulness) return 'Usefulness rating is required';
    if (!comments) return 'Comments are required';
    if (!advice) return 'Advice is required';
    if (!hardestPartOfClass) return 'Hardest part of the class is required';
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorMessage = validateFields();

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    const reviewData = {
      professorName,
      onlineClass,
      year,
      wouldTakeAgain,
      attendanceMandatory,
      workLoad,
      conceptDifficulty,
      assignmentDifficulty,
      gradeDifficulty,
      difficulty,
      interest,
      usefulness,
      ...tags,
      comments,
      advice,
      hardestPartOfClass,
      classId,
    };
    try {
      const response = await fetch(`${BASE_URL}/add_review`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to submit review');

      toast.success('Review submitted successfully!');
      setResponseMessage(result.message);

      await fetch(`${BASE_URL}/update_class_averages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ classId }),
      });

      navigate(`/class/${classId}`, { state: { reviewSuccess: true } });
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(error.message || 'Error submitting review. Please try again.');
    }
  };
  return (
    <div className="rate-course-container">
      <Toaster position="top-center" reverseOrder={false} />
      <h1>Writing a review for {classInfo?.department} {classInfo?.classNum}: {classInfo?.courseTitle}</h1>
      {responseMessage && <p className="response-message">{responseMessage}</p>}

      <form onSubmit={handleSubmit} className="rate-course-form">
        <div className="form-group">
          <label>What Was Your Professor's Name</label>
          <input type="text" value={professorName} onChange={(e) => setProfessorName(e.target.value)} placeholder="Enter professor's name" />
        </div>

        <div className="form-group">
          <label>Was This An Online Class</label>
          <YesNoPicker onChange={setOnlineClass} />
        </div>

        <div className="form-group" style={{ padding: '10px', maxWidth: '480px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>What Year Did You Take This Class</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            min="1900"
            max={new Date().getFullYear()}
            placeholder="Enter year"
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              width: '100%',
            }}
          />
        </div>

        <div className="form-group">
          <label>Would You Take This Class Again</label>
          <YesNoPicker onChange={setWouldTakeAgain} />
        </div>

        <div className="form-group">
          <label>What Was Attendance Like In This Class</label>
          <select value={attendanceMandatory} onChange={(e) => setAttendanceMandatory(Number(e.target.value))}>
            <option value={1}>Mandatory and you should go</option>
            <option value={2}>Mandatory but you can skip</option>
            <option value={3}>Not Mandatory but you should go</option>
            <option value={4}>Not Mandatory and you can go to 3 classes all year and get an A</option>
          </select>
        </div>

        <div className="form-group">
          <label>How Many Hours a Week On Average Did You Spend On the Class </label>
          <input type="number" min="1" max="30" value={workLoad} onChange={(e) => setWorkLoad(Number(e.target.value))} />
        </div>

        {/* Difficulty Ratings */}
        {[["Concept Difficulty", conceptDifficulty, setConceptDifficulty], ["Assignment Difficulty", assignmentDifficulty, setAssignmentDifficulty], ["Grade Difficulty", gradeDifficulty, setGradeDifficulty], ["Overall Difficulty", difficulty, setDifficulty], ["Interest", interest, setInterest], ["Usefulness", usefulness, setUsefulness]].map(([label, value, setter]) => (
          <div key={label} className="form-group">
            <label>{label} (1-10)</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
                <span key={v} className={`star ${value >= v ? 'filled' : ''}`} onClick={() => setter(v)}>★</span>
              ))}
            </div>
          </div>
        ))}

        {/* Tags */}
        <div className="form-group">
          <label>Tags</label>
          <div className="tags">
            {Object.keys(tags).map((tag) => (
              <button type="button" key={tag} className={`tag ${tags[tag] ? 'active' : 'unactive'}`} onClick={() => setTags({ ...tags, [tag]: !tags[tag] })}>
                {tag.replace(/([A-Z])/g, ' $1').trim()}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Comments</label>
          <textarea value={comments} onChange={(e) => setComments(e.target.value)} placeholder="General Comments About the Class" className='textarea' />
        </div>
        <div className="form-group">
          <label>Advice</label>
          <textarea value={advice} onChange={(e) => setAdvice(e.target.value)} placeholder="Something you Wish you Knew Before Taking the Class" />
        </div>
        <div className="form-group">
          <label>Hardest Part of the Class</label>
          <textarea value={hardestPartOfClass} onChange={(e) => setHardestPartOfClass(e.target.value)} placeholder="Describe the hardest part" />
        </div>

        <div className="form-group">
          <button type="submit" className='btnsubmit'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default RateCourse;
