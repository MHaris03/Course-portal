import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/ContactUs.css';
import { BASE_URL } from '../utils/BASE_URL';
function ContactUs() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${BASE_URL}/contact-us`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, subject, message }),
    });

    if (response.ok) {
      navigate('/', { state: { showPopup: true } });
    } else {
      console.error('Form submission failed');
    }
  };

  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className='contactus-form'>
        <label>First Name:</label>
        <input
          type=""
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label>Last Name:</label>
        <input
          type=""
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Subject:</label>
        <input
          type=""
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <label>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ContactUs;
