import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

 

  return (
    <nav style={styles.navbar}>
      <div style={styles.heading}>Admin</div>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/admin" style={styles.navLink}>Dashboard</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/login" style={styles.navLink}>Logout</Link>
        </li>
        
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#2A47A7',
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    color: 'white',
    marginLeft: '20px',
  },
  navList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
  },
};

export default Navbar;
