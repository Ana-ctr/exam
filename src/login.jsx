import React, { useState } from 'react';
import './App.css'; // Assuming you have some styles defined in App.css

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    const { email, password } = formData;
    // Simple validation
    if (email === 'user' && password === '123') {
      window.location.href = '/main';
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-logo">Money</h1> {/* Text-based logo */}
        <div className="login-form">
          <h2>Login</h2>
          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
          </div>
          <button onClick={handleLogin}>Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </header>
    </div>
  );
}

export default Login;
