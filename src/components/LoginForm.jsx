import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';

const api = axios.create({
  baseURL: 'http://localhost:8080'
});

const LoginForm = ({ loginCallBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      let data = { email, password };
      const response = await api.post('/app/users/log-in', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data && response.data.result && response.data.result.userIdx) {
        const userIdx = response.data.result.userIdx;
        const token = response.data.token;
        localStorage.setItem('userIdx', userIdx);
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        loginCallBack(true);
        navigate(`/app/users/${userIdx}/search`);
      } else {
        console.log('Invalid response data:', response.data);
      }
    } catch (ex) {
      console.log('login request failed:', ex);
    }
  };

  useEffect(() => {
    console.log("LoginPage render ... ")
  });

  return (
    <div className="login-container">
      <h1>Stocks.ing</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="form-title">로그인</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="이메일 주소"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        <button type="submit" className="submit-button">로그인</button>
      </form>
      <p className="register-link">
        계정이 없으신가요? <a href="/app/users/sign-up">회원가입</a>
      </p>
    </div>
  );
};

export default LoginForm;
