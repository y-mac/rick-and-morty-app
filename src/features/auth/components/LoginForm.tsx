import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(username)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (username === 'yahir.ramirez23@gmail.com' && password === 'Nyc2cali!') {
      login(username, 'fake-token'); // Use a fake token for now
      navigate('/rick-morty');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className={styles['login-form']}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
