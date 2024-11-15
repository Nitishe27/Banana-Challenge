import React from 'react';
import { Link } from 'react-router-dom';



function LeaderBoardNavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/home" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/home" className="navbar-link">Play</Link>
        </li>
        <li className="navbar-item logout-item">
          <Link to="/" className="navbar-link">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default LeaderBoardNavBar;
