import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style/Homepage.css';
import TopClasses from './TopClasses';
import toast, { Toaster } from 'react-hot-toast';

function Homepage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const [department, setDepartment] = useState('');
  const [courseNumber, setCourseNumber] = useState('');

  useEffect(() => {
    if (location.state?.showPopup) {
      setShowPopup(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSearch = () => {
    if (department.length !== 4) {
      toast.error('Department code must be exactly 4 letters.');
      return;
    }
    navigate('/ViewClasses', { state: { department, courseNumber } });
  };

  const handleAdvancedSearch = () => {
    navigate('/ViewClasses');
  };

  return (
    <div className="app">
      <main className="main-content">
        <Toaster />
        <section className="intro">
          <h2>UGA Course Genie</h2>
          <p>See reviews, get advice, and find helpful resources <br />for university courses</p>
          <div className="search">
            <input
              id="dept-search"
              type="text"
              placeholder="Department (e.g. MATH)"
              value={department}
              onChange={(e) => setDepartment(e.target.value.toUpperCase())}
            />
            <input
              id="course-search"
              type="text"
              placeholder="Course Number (e.g. 3010)"
              value={courseNumber}
              onChange={(e) => setCourseNumber(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button onClick={handleSearch} className="s">Search</button>
            <button onClick={handleAdvancedSearch} className="">Advanced Search</button>
          </div>
        </section>
      </main>
      <TopClasses />
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Thank you!</h2>
            <p>Your message has been sent. Our staff will get back to you within 24 hours.</p>
            <button onClick={() => setShowPopup(false)} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>


  );
}

export default Homepage;
