import React from 'react';
import { Link } from 'react-router-dom';
import '../style/header.css';
import ugabanner from '../assets/images/ugabanner.png';
import { FaUser } from "react-icons/fa";

function Header({ loggedIn, onProfileClick, onLoginClick }) {
  return (
    <header className="header">
      <Link to="/" className="header-title">
        <img src={ugabanner} alt="UGA Course Genie Logo" className="header-logo" />
        <h1 className="heading">UGA Course Genie</h1>
      </Link>
      {loggedIn ? (
        <button onClick={onProfileClick} className="profile-button">View Profile</button>
      ) : (
        <button onClick={onLoginClick} className="login-button">
          <FaUser size={20} />
          <span className="login-text">Log In</span>
        </button>
      )}
    </header>
  );
}

export default Header;
