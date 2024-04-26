import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from './login.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const signupEmail = location.state && location.state.email;

  useState(() => {
    if (signupEmail) {
      setEmail(signupEmail);
    }
  }, [signupEmail]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleLogin = () => {
    // Check if any of the fields are empty
    if (!email || !password || !role) {
      alert('Please fill in all fields.');
      return;
    }

    // Check email and password for HR
    if (role === 'HR' && email === 'hr@gmail.com' && password === 'hr@123') {
      navigate('/hr');
      return;
    }

    // Check email and password for Employee
    if (role === 'Employee' && email === 'employee@gmail.com' && password === 'employee') {
      navigate('/employee');
      return;
    }

    // If credentials don't match, show an alert
    alert('Invalid email or password for the selected role.');
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password clicked');
  };

  return (
    <div style={styles.loginContainer}>
      <div style={{ ...styles.card, ...styles.blurEffect }}>
        <h2>Login</h2>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          style={styles.inputField}
          required // Adding the required attribute
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          style={styles.inputField}
          required // Adding the required attribute
        />

        <label>Role:</label>
        <select value={role} onChange={handleRoleChange} style={styles.inputField} required>
          <option value="">Select Role</option>

          <option value="HR">HR</option>
          <option value="Employee">Employee</option>
        </select>

        <button onClick={handleLogin} style={styles.loginButton}>
          Login
        </button>

        <button onClick={handleForgotPassword} style={styles.forgotPasswordButton}>
          Forgot Password
        </button>
      </div>
    </div>
  );
};

const styles = {
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '30px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    width: '280px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blurEffect: {
    backdropFilter: 'blur(5px)',
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
  loginButton: {
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
  forgotPasswordButton: {
    backgroundColor: '#2e2e2e',
    color: 'white',
    fontSize: '.7em',
    fontWeight: '500',
    textDecoration: 'none',
    padding: '8px 15px',
    borderRadius: '20px',
    cursor: 'pointer',
  },
};

export default Login;
