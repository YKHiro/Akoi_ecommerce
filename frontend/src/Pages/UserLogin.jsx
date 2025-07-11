import React, { useState } from 'react';
import './CSS/user_login.css'; // Import the CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../Context/ShopContest';

export function UserLogin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn, setStoreContext, storeContext } = useStoreContext()
 
  const onLogin = (data) => {
    setStoreContext(prev => ({
      ...prev,
      UserName: data.user.username,
      isAdmin: data.user.is_staff
    }));
    setIsLoggedIn(true)
    navigate('/home')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/user/token/', {
        email,
        password,
      });

      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      onLogin(res.data);  // callback to update UI or redirect

    } catch (err) {
      alert('Login failed!');
    }

    
  };
 

  console.log(storeContext, storeContext.user)

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p>
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
}
