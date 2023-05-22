import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupForm.css';

// axios.create를 사용하여 baseURL 설정
const api = axios.create({
  baseURL: 'http://localhost:8080'
});

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setName] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    // 회원가입 로직 구현
    if (email && password && nickname) {
        try {
          const response = await api.post('/app/users/sign-up', {
            email: email,
            password: password,
            nickname: nickname
          })
          .then(function (response){
            console.log();
          });
          
          // 회원가입 성공 시 처리
          setError('');
          alert('회원가입이 완료되었습니다!');
          navigate('/app/users/log-in');
        } catch (error) {
          // 회원가입 실패 시 처리
          setError('회원가입에 실패했습니다.');
        }
      } else {
        setError('모든 필드를 입력해주세요.');
      }
    };
  return (
    <div className="signup-container">
      <h1>Stocks.ing</h1>
      <form className="signup-form" onSubmit={handleSignup}>
        <h2 className="form-title">회원가입</h2>
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
        <input
          type="text"
          placeholder="이름"
          value={nickname}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
        />
        <button type="submit" className="submit-button" onSubmit={handleSignup}>회원가입</button>
      </form>
      <p className="login-link">
        이미 계정이 있으신가요? <a href="/app/users/log-in">로그인</a>
      </p>
    </div>
  );
};

export default SignupForm;
