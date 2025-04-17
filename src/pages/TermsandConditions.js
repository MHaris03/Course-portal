import React from 'react';
import { Link } from 'react-router-dom';
import '../style/TermsAndConditions.css';

function TermsAndConditions() {
  return (
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      <p>
        Welcome to UGA Course Genie. These terms and conditions outline the rules and regulations for the use of our website.
      </p>

      <h2>Introduction</h2>
      <p>
        By accessing this website we assume you accept these terms and conditions. Do not continue to use UGA Course Genie if you do not agree to all of the terms and conditions stated on this page.
      </p>

      <h2>Cookies</h2>
      <p>
        We employ the use of cookies. By accessing UGA Course Genie, you agreed to use cookies in agreement with our Privacy Policy.
      </p>

      <h2>License</h2>
      <p>
        Unless otherwise stated, UGA Course Genie and/or its licensors own the intellectual property rights for all material on UGA Course Genie. All intellectual property rights are reserved. You may access this from UGA Course Genie for your own personal use subjected to restrictions set in these terms and conditions.
      </p>

      <h2>Content Liability</h2>
      <p>
        We shall not be hold responsible for any content that appears on your website. You agree to protect and defend us against all claims that is rising on your website.
      </p>

      <h2>Your Privacy</h2>
      <p>
        Please read our Privacy Policy.
      </p>

      <h2>Reservation of Rights</h2>
      <p>
        We reserve the right to request that you remove all links or any particular link to our website. You approve to immediately remove all links to our website upon request.
      </p>

      <p>
        These terms and conditions are subject to change without notice. By using this website you are agreeing to be bound by the then current version of these terms and conditions.
      </p>

      <p>
        If you have any questions about these Terms and Conditions, please 
        <Link to="/contact-us">Contact Us</Link>.
      </p>
    </div>
  );
}

export default TermsAndConditions;
