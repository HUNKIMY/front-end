import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ResultPage from './components/ResultPage';
import MyPage from './components/MyPage';
import axios from 'axios';

const App = () => {
  const baseUrl = 'http://localhost:8080';
  const [isLogin, setIsLogin] = useState(false);
  const [userIdx, setUserIdx] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [results, setResults] = useState(null);
  

  useEffect(() => {
    const storedJwt = localStorage.getItem('jwt');
    const storedUserIdx = localStorage.getItem('userIdx');

    if (storedJwt && storedUserIdx) {
      setIsLogin(true);
      setUserIdx(storedUserIdx);
      setJwt(storedJwt);
    }
  }, []);

  function loginCallBack(login, userIdx, token) {
    setIsLogin(login);
    setUserIdx(userIdx);
    setJwt(token);
  }

  const handleMyPageClick = async () => {
    try {
      if (userIdx) {
        navigate(`/app/users/${userIdx}`);
      } else {
        console.log('userIdx is null or undefined');
      }
    } catch (ex) {
      console.log('mypage request failed:', ex);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  async function getResults() {
    const jwt = localStorage.getItem('jwt');
    const userIdx = localStorage.getItem("userIdx");
    if (userIdx) { // Add this conditional check
      try {
        const response = await axios.get(`${baseUrl}/app/users/${userIdx}/search`, {
          headers: {
            'x-access-token': jwt,
          },
        });
        console.log(response.data);
        setResults(response.data.result);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('userIdx is null or undefined');
    }
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/app/users/log-in" element={<LoginForm loginCallBack={loginCallBack} />} />
        <Route path="/app/users/sign-up" element={<SignupForm />} />
        <Route
          path="/app/users/:userIdx/search"
          element={<SearchBar jwt ={jwt} userIdx={userIdx} handleMyPageClick={handleMyPageClick} />}
        />
        <Route path="/app/users/result" getResults ={getResults} element={<ResultPage jwt ={jwt} userIdx={userIdx}/>} />
        <Route
          path="/app/users/:userIdx"
          element={<MyPage userIdx={userIdx} loginCallBack={loginCallBack} />}
        />
        <Route
          path="/"
          element={
              <LoginForm loginCallBack={loginCallBack} />
            
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
