import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';
import image from './newsimage.png';

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
          'Content-Type': 'application/json'
        },
      });
console.log(response.data.result.jwt)
      if (response.data.result) {
        const userIdx = response.data.result.userIdx;
        const token = response.data.jwt;
        const { jwt } = response.data.result;
        localStorage.setItem('userIdx', userIdx);
        localStorage.setItem('jwt', jwt); // Use 'x-access-token' as the key
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
    <div className='newsimage'>
    <img src={image} alt="Image" />
    </div>


      <h2 className="real-search-bar-logo">Stock.ing</h2>
      <h2 className='real-search-bar-d'>뉴스 홍수시대, 흐름이 궁금하다면?</h2>
      <h2 className='real-search-bar-d2'>내가 관심있는 종목의 수 많은 뉴스 기사들을 한눈에 파악하자</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="form-title">Log In</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="이메일 주소"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login1"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login2"
        />
        <button type="submit" className="loginbutton">로그인</button>
      </form>
      <p className="register">
        계정이 없으신가요? </p><a className='link' href="/app/users/sign-up">회원가입</a>
        


    </div>
   

  );
};

export default LoginForm;