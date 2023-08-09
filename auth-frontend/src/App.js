import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/register', { username, password });
      setMessage('Registration successful.');
    } catch (error) {
      setMessage('An error occurred during registration.');
    }
  };

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:5000/login', { username, password });
      setMessage('Login successful.');
    } catch (error) {
      setMessage('Invalid credentials.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>

      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>

      <p>{message}</p>
    </div>
  );
}

export default App;
