import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav id="navbar">
      <div id="logo">
        <Link to="/">My Life in Weeks</Link>
      </div>
      <div id="user-info">
        {currentUser && (
          <>
            <span id="user-name">{currentUser.email}</span>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;