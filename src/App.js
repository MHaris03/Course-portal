import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Homepage from './pages/homepage';
import UsersPage from './pages/userpage';
import RateCourse from './pages/RateCourse';
import ViewReviews from './pages/ViewReviews';
import Profile from './pages/profile';
import Register from './pages/Register';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import TermsAndConditions from './pages/TermsandConditions';
import ViewClasses from './pages/ViewClasses';
import ClassDetails from './pages/ClassDetails';
import MyReviews from './pages/MyReviews';
import Header from './pages/Header';
import LoginPopUp from './pages/LoginPopUp';
import Footer from './pages/Footer';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [needLogin, setNeedLogin] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';
    setLoggedIn(isLoggedIn);

    if (location.state?.showPopup) {
      setShowPopup(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleRateCourse = (classId) => {
    if (loggedIn) {
      navigate('/rate-course', {
        state: {
          classId: classId,
        }
      });
    } else {
      setNeedLogin(true);
      setShowLoginForm(true);
    }
  };

  return (
    <>
      <div className="">
        <Header
          loggedIn={loggedIn}
          onProfileClick={() => navigate('/profile')}
          onLoginClick={() => setShowLoginForm(true)}
        />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/rate-course" element={<RateCourse />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/ViewClasses" element={<ViewClasses />} />
          <Route path="/class/:classId" element={<ClassDetails onRateCourse={handleRateCourse} />} />

          {/* Private routes */}
          <Route element={<PrivateRoute loggedIn={loggedIn} redirectTo="/" />}>
            <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
            <Route path="/my-reviews" element={<MyReviews />} />
            <Route path="/reviews" element={<ViewReviews />} />
          </Route>
        </Routes>
        <LoginPopUp
          show={showLoginForm}
          needLogin={needLogin}
          onClose={() => {
            setShowLoginForm(false);
            setNeedLogin(false);
          }}
          onLoginSuccess={handleLoginSuccess}
        />

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h2>Thank you!</h2>
              <p>Your message has been sent. Our staff will get back to you within 24 hours.</p>
              <button onClick={() => setShowPopup(false)}>Close</button>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>

  );
}

export default App;
