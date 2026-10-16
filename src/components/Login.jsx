import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { authApi } from '../api';

const Login = ({ setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await authApi.login({ email, password });
      login(data.user, data.token);
      setActiveTab('Dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const data = await authApi.login({ email: 'admin@billing.com', password: 'admin123' });
      login(data.user, data.token);
      setActiveTab('Dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-view fade-in">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to your <span className="rainbow-text">YourBill</span> account</p>
        </div>
        {error && <div style={{color: '#ef4444', marginBottom: '1rem', textAlign: 'center', padding: '0.75rem', background: 'rgba(239,68,68,0.1)', borderRadius: '8px'}}>{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" placeholder="name@company.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button className="btn-primary rainbow-bg full-width" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div style={{margin: '1rem 0', textAlign: 'center', color: 'var(--text-secondary)'}}>— or —</div>
        <button
          className="btn-secondary full-width"
          onClick={handleDemoLogin}
          disabled={loading}
          style={{width: '100%'}}
        >
          🚀 Try Demo (admin@billing.com)
        </button>
        <p className="auth-footer">
          Don't have an account? <a href="#" onClick={() => setActiveTab('Registration')} className="rainbow-text">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
