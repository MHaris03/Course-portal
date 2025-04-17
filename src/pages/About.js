import React from 'react';
import { Link } from 'react-router-dom';
import '../style/About.css';

function About() {
  return (
    <div className="center-container">
      <div className="about-container">
        <h1>About UGA Course Genie</h1>
        <p>Welcome to UGA Course Genie! This platform is designed to help students make informed decisions about their courses by reading and sharing reviews from other students. Whether you're trying to pick the best professor, find a course that matches your interests, or just see what others think, we've got you covered.</p>

        <h2>Our Mission</h2>
        <p>Our mission is to create a transparent and helpful community where students can share their honest opinions about their courses and professors. We believe that the more information students have, the better decisions they can make about their education.</p>

        <h2>How It Works</h2>
        <p>Students can rate their courses on a variety of factors, including difficulty, usefulness, workload, and more. These reviews are then made available for other students to read when deciding on their course schedules.</p>

        <h2>Contact Us</h2>
        <p>If you have any questions or feedback, feel free to reach out to us here <Link to="/contact-us">Contact Us</Link>.</p>
      </div>
    </div>
  );
}

export default About;
