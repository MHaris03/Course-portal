import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Register.css';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL } from '../utils/BASE_URL';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [major, setMajor] = useState('');
  const [grade, setGrade] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [emailError, setEmailError] = useState('');
  const [filteredMajors, setFilteredMajors] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const majors = [
    "Biology/biological sciences",
    "Psychology",
    "Finance",
    "Marketing/marketing management",
    "Management information systems",
    "Computer science",
    "Insurance",
    "Business administration and management",
    "International relations and affairs",
    "Political science and government",
    "Accounting",
    "Business/managerial economics",
    "Mechanical engineering",
    "Human development and family studies",
    "Advertising",
    "Journalism",
    "Public relations/image management",
    "Sport and fitness administration/management",
    "Kinesiology and exercise science",
    "Real estate",
    "Early childhood education and teaching",
    "Speech communication and rhetoric",
    "Public health education and promotion",
    "International business/trade/commerce",
    "Nutrition sciences",
    "English language and literature",
    "Economics",
    "Art/art studies",
    "Digital communication and media/multimedia",
    "Fashion merchandising",
    "Communication sciences and disorders",
    "Sociology",
    "Family resource management studies",
    "Biological and physical sciences",
    "Criminal justice/law enforcement administration",
    "Animal sciences",
    "Genetics",
    "Mathematics",
    "Consumer economics",
    "Biological/biosystems engineering",
    "Biochemistry and molecular biology",
    "Civil engineering",
    "Cognitive science",
    "Business/commerce",
    "History",
    "Philosophy",
    "Agribusiness/agricultural business operations",
    "Social work",
    "Landscape architecture",
    "Ecology",
    "Wildlife, fish and wildlands science and management",
    "Special education and teaching",
    "Statistics",
    "Electrical and electronics engineering",
    "Housing and human environments",
    "Chemistry",
    "Anthropology",
    "Linguistics",
    "Microbiology",
    "Environmental health",
    "Spanish language and literature",
    "Agricultural economics",
    "Biochemical engineering",
    "Cell/cellular biology and histology",
    "Computer engineering",
    "Pharmaceutical sciences",
    "Geography",
    "Environmental/environmental health engineering",
    "Fine/studio arts",
    "Atmospheric sciences and meteorology",
    "Hospitality administration/management",
    "Health and physical education/fitness",
    "Drama and dramatics/theatre arts",
    "Biotechnology",
    "Horticultural science",
    "Women's studies",
    "Mathematics teacher education",
    "Music",
    "Music performance",
    "Soil science and agronomy",
    "Geology/earth science",
    "Film/cinema/video studies",
    "Natural resource recreation and tourism",
    "Social studies teacher education",
    "German language and literature",
    "Poultry science",
    "Junior high/intermediate/middle school education and teaching",
    "Agriculture",
    "English/language arts teacher education",
    "Forestry",
    "Agricultural teacher education",
    "Music teacher education",
    "Comparative literature",
    "Classics and classical languages, literatures, and linguistics",
    "Agricultural communication/journalism",
    "Physics",
    "Religion/religious studies",
    "Food science",
    "Science teacher education/general science teacher education",
    "Agricultural engineering"
  ];

  const handleMajorChange = (e) => {
    const value = e.target.value;
    setMajor(value);

    if (value) {
      const filtered = majors.filter((majorOption) =>
        majorOption.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMajors(filtered);
    } else {
      setFilteredMajors(majors);
    }
    setShowDropdown(true);
  };

  const handleMajorSelect = (selectedMajor) => {
    setMajor(selectedMajor);
    setShowDropdown(false);
  };

  const handleFocus = () => {
    if (major === '') {
      setFilteredMajors(majors);
    }
    setShowDropdown(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };
  const handleBackClick = () => {
    navigate('/');
  }
  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password, major, grade }),
      });

      if (response.status === 409) {
        setEmailError('Email already exists');
      } else if (response.ok) {
        setShowVerificationPopup(true);
      } else {
        toast.error('Registration failed');
      }
    } catch (error) {
      toast.error('Network error:', error);
    }
  };

  const handleVerifySubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verification_code: verificationCode }),
      });

      if (response.ok) {
        const loginResponse = await fetch(`${BASE_URL}/login`, {
          method: 'POST',
          credentials:"include",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (loginResponse.ok) {
          sessionStorage.setItem('loggedIn', 'true');
          navigate('/');
        } else {
          toast.error('Login failed after verification');
        }
      } else {
        toast.error('Verification failed');
      }
    } catch (error) {
      toast.error('Network error:', error);
    }
  };

  return (
    <div className='Register-container'>
      <div className="registration-container">
        <h1 className="registration-title">Create Your Account</h1>
        <form className="registration-form" onSubmit={handleRegisterSubmit}>
          <label className="form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
            placeholder="you@example.com"
          />
          {emailError && <p className="error-message">{emailError}</p>}

          <label className="form-label">Username:</label>
          <input
            type=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-input"
            placeholder="enter name"
          />

          <label className="form-label">Password:</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="write password"
            />
            <span onClick={togglePasswordVisibility} className="password-toggle">
              {showPassword ? <IoIosEyeOff size={25} /> : <IoIosEye size={25} />}
            </span>
          </div>
          <label className="form-label">Major:</label>
          <input
            type=""
            value={major}
            onChange={handleMajorChange}
            onFocus={handleFocus}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            required
            className="form-input"
            placeholder="Select your major"
          />
          {showDropdown && (
            <ul className="dropdown-list">
              {filteredMajors.map((majorOption, index) => (
                <li
                  key={index}
                  onMouseDown={() => handleMajorSelect(majorOption)}
                  className="dropdown-item"
                >
                  {majorOption}
                </li>
              ))}
            </ul>
          )}
          <label className="form-label">Grade:</label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
            className="form-select"
          >
            <option value="">Select Grade</option>
            <option value="Freshman">Freshman</option>
            <option value="Sophomore">Sophomore</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
            <option value="Alumni">Alumni</option>
          </select>

          <button type="submit" className="register-button">Register</button>
          <button type="button" className="back-button" onClick={handleBackClick}>Back</button> {/* Back button */}
        </form>

        {showVerificationPopup && (
          <div className="overlay" onClick={() => setShowVerificationPopup(false)}>
            <div className="verification-popup" onClick={(e) => e.stopPropagation()}>
              <h2 className="verification-title">Enter Verification Code</h2>
              <form onSubmit={handleVerifySubmit}>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                  maxLength={4}
                  placeholder="4-digit code"
                  className="verification-input"
                />
                <button type="submit" className="verify-button">Verify</button>
              </form>
              <button onClick={() => setShowVerificationPopup(false)} className="close-button">Close</button>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default Register;
