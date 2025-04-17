import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Profile.css';
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL } from '../utils/BASE_URL'
function Profile({ onLogout }) {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserInfo = async () => {
      fetch(`${BASE_URL}/profile`, {
        method: "GET",
        credentials: "include"
      })
        .then((response) => response.text())
        .then((result) => setUserInfo(JSON.parse(result)))
        .catch((error) => console.error(error));
    };

    fetchUserInfo();
  }, []);



  const handleLogout = async () => {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      credentials:"include",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      sessionStorage.removeItem('loggedIn');
      toast.success("Logout Success")
      onLogout();
      navigate('/');
    } else {
      toast.error('Failed to log out');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleMyReviews = () => {
    console.log(userInfo)
    navigate('/my-reviews', { state: { userId: userInfo.userId } });
  };

  return (
    <div className="profile-container">
      <Toaster />
      <div className="profile-header">
        <h1>Your Profile</h1>
      </div>
      <p><strong>Username:</strong> {userInfo.username}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      <p><strong>Major:</strong> {userInfo.major}</p>
      <p><strong>Grade:</strong> {userInfo.grade}</p>
      <div className="profile-buttons">
        <button onClick={handleBackToHome} className="profile-button">Back to Homepage</button>
        <button onClick={handleMyReviews} className="profile-button my-reviews-button">My Reviews</button>
        <button onClick={handleLogout} className="profile-button logout-button">Log Out</button>
      </div>
    </div>

  );
}

export default Profile;
