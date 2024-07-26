import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.css';
import LoginSuccess from './pages/LoginSuccess';
import HomePage from './pages/HomePage';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/Contact';
import CrimeDetails from './pages/CrimeDetails';
import AdminLoginForm from './pages/AdminLogin';
import AdminSignupForm from './pages/AdminSignup';
import AdminPage from './pages/AdminPage';
import CrimeHistory from './pages/CrimeHistory';
import CompletedCase from './pages/CompletedCase';

const App = () => {
  return (
    <div className="app">
      <Router>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<LoginSuccess />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/about_us" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs/>} />
            <Route path="/crime_details" element={<CrimeDetails/>} />
            <Route path="/crime_history" element={<CrimeHistory/>} />
            <Route path="/admin/login" element={<AdminLoginForm />} />
            <Route path="/admin/signup" element={<AdminSignupForm/>} />
            <Route path="/admin/dashboard" element={<AdminPage/>} />
            <Route path="/admin/completed" element={<CompletedCase/>} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
