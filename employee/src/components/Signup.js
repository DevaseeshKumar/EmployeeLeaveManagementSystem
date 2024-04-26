import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom';
import backgroundImage from './login.jpg';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async (e) => {
    const data = {
      username: email,
      password: password
    };
    console.log(data);
    e.preventDefault();
    try {
      const response = await axios.post('https://elms-sdp-project-backend.onrender.com/adminlogin', data);

      if (response.status === 200) {
        console.log('Signup successful');
        navigate('/admin');
        // Redirect or do something after successful signup
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const styles = {
    signupContainer: {
      margin: '0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      backgroundImage: `url(${backgroundImage})`, // Add background image
      backgroundSize: 'cover', // Cover the entire container
      height: '100vh', // Full height of the viewport
      backdropFilter: 'blur(5px)', // Add blur effect
    },
    formsContainer: {
      width: '280px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.7)', // Add background color with opacity
      padding: '30px',
      borderRadius: '30px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '2.5em',
      color: '#2e2e2e',
      fontWeight: '700',
      margin: '15px 0 30px 0',
    },
    inputField: {
      width: '100%',
      height: '40px',
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: '2px solid rgb(173, 173, 173)',
      borderRadius: '30px',
      margin: '10px 0',
      color: 'black',
      fontSize: '.8em',
      fontWeight: '500',
      boxSizing: 'border-box',
      paddingLeft: '30px',
    },
    button: {
      position: 'relative',
      width: '100%',
      border: '2px solid #8000ff',
      backgroundColor: '#8000ff',
      height: '40px',
      color: 'white',
      fontSize: '.8em',
      fontWeight: '500',
      letterSpacing: '1px',
      borderRadius: '30px',
      margin: '10px',
      cursor: 'pointer',
      overflow: 'hidden',
    },
  };

  return (
    <div className="signup-container" style={styles.signupContainer}>
      <div className='forms-container' style={styles.formsContainer}>
        <form className="sign-up-form">
          <h2 className="title" style={styles.title}>Admin Login</h2>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              autoComplete="off"
              style={styles.inputField}
            />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="off"
              style={styles.inputField}
            />
          </div>
          <button className="btn" onClick={handleSignup} style={styles.button}>Signup</button>
          
        </form>
      </div>
    </div>
  );
};

export default Signup;
