import React from 'react';
import logo from '../img/logo.png';
import '../styles/navbar.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-class">
        <img src={logo} alt="Your Logo" className="logo" />
      </div>
      <ul className="nav-list">
        <li><a href="/home">Home</a></li>
        <li><a href="/about_us">About Us</a></li>
        <li><a href="/crime_details">Crime Details</a></li>
        <li><a href="/crime_history ">Crime History</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </header>
  );
};

export default Header;
