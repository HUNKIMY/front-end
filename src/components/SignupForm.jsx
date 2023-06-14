import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupForm.css';
import image from './newsimage.png';

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
        setError('');
      }
    };
  return (
    <div className="signup-container">
          <div className='newsimage'>
    <img src={image} alt="Image" />
    </div>


      <h2 className="real-search-bar-logo">Stock.ing</h2>
      <h2 className='real-search-bar-d'>뉴스 홍수시대, 흐름이 궁금하다면?</h2>
      <h2 className='real-search-bar-d2'>내가 관심있는 종목의 수 많은 뉴스 기사들을 한눈에 파악하자</h2>
      <form className="signup-form" onSubmit={handleSignup}>
      <h2 className="form-title">Sign Up</h2>
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
        <input
          type="text"
          placeholder="이름"
          value={nickname}
          onChange={(e) => setName(e.target.value)}
          className="signupname"
        />
        <button type="submit" className="signupbutton" onSubmit={handleSignup}>회원가입</button>
      </form>
      <p className="logintext">
        이미 계정이 있으신가요? </p> <a className='loginlink' href="/app/users/log-in">로그인</a>
      
    </div>
  );
};

export default SignupForm;
