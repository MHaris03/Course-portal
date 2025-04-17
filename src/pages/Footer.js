import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Footer.css';

function Footer() {

  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/about">About</Link>
        <Link to="/contact-us">Contact Us</Link>
        <Link to="/terms-and-conditions">Terms and Conditions</Link>
      </div>
      <p>&copy; {new Date().getFullYear()} UGA Course Genie. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
