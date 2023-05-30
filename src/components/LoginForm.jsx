import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/app/users/log-in', { email, password });
      // 서버로부터의 응답을 확인하고 적절한 처리를 수행합니다.
      console.log(response.data);
      //로그인 성공시 검색창 이동
      navigate('/search');
    } catch (error) {
      // 오류 처리
      setError('로그인 실패');
    }


    // if (email && password) {
    //   setError('');
    //   alert('로그인 성공!');
    //   navigate('/search');
    // } else {
    //   setError('이메일과 비밀번호를 입력해주세요.');
    // }
  };

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
