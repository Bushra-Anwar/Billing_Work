import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { authApi } from '../api';

const Registration = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    password: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await authApi.register(formData);
      login(data.user, data.token);
      setActiveTab('Dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-view fade-in">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join <span className="rainbow-text">YourBill</span> today — free forever</p>
        </div>
        {error && <div style={{color: '#ef4444', marginBottom: '1rem', textAlign: 'center', padding: '0.75rem', background: 'rgba(239,68,68,0.1)', borderRadius: '8px'}}>{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Your Name</label>
            <input type="text" name="name" placeholder="e.g. Rahul Sharma" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Business / Shop Name</label>
            <input type="text" name="companyName" placeholder="e.g. Sharma Electronics" value={formData.companyName} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" placeholder="+91 9876543210" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" name="email" placeholder="name@company.com" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Create a strong password" value={formData.password} onChange={handleChange} required minLength={6} />
          </div>
          <button className="btn-primary rainbow-bg full-width" type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : '🚀 Create Account & Start'}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <a href="#" onClick={() => setActiveTab('Login')} className="rainbow-text">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
