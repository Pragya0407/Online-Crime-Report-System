import React from 'react';
import logo from '../img/logo.png';
import '../styles/navbar.css';

const HeaderAdmin = () => {
  return (
    <header className="header">
      <div className="logo-class">
        <img src={logo} alt="Your Logo" className="logo" />
      </div>
      <ul className="nav-list" style={{marginRight:"10%"}}>
        <li><a href="/admin/dashboard">Pending Case</a></li>
        <li><a href="/admin/Completed ">Completed Case</a></li>
        <li><a href="/contact">Contact </a></li>
      </ul>
    </header>
  );
};

export default HeaderAdmin;
