import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/signup', formData);
      console.log(response.data);
      if (response.status === 201) {
        window.location.href = '/';
      } else {
        console.error('Signup failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-container">
      <section className="signup-section">
        <h2>Sign Up</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
          <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
          <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
          <input type="tel" placeholder="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required style={{ marginBottom: '20px'}}/>
          <button type="submit">Sign Up</button>
        </form>
        <p className="switch">
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </section>
    </div>
  );
};

export default SignupForm;
