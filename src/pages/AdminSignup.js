import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminSignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Password and Confirm Password do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/admin/signup', {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        window.location.href = '/admin/login';
      } else {
        console.error('Admin signup failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-container">
      <section className="signup-section">
        <h2>Admin Sign Up</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
        <p className="switch">
          Already have an account? <Link to="/admin/login">Log in</Link>
        </p>
      </section>
    </div>
  );
};

export default AdminSignupForm;
