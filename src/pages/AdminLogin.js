import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/admin/login', formData);

      if (response.status === 200) {
          window.location.href = '/admin/dashboard';

      } else if (response.status === 401) {
        const errorMessage = response.data.error;
        setError(errorMessage); // Set the error message
      } else {
        console.error('Login failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <section className="login-section">
        <h2>Admin Login</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <p className="switch">
          Don't have an account? <Link to="/admin/signup">Sign up</Link>
        </p>
      </section>
    </div>
  );
};

export default AdminLoginForm;
