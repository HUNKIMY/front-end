import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ResultPage from './components/ResultPage';
import MyPage from './components/MyPage';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userIdx, setUserIdx] = useState(false);

  useEffect(() => {

  }, []);

  function loginCallBack(login, userIdx) {
    setIsLogin(login);
    setUserIdx(userIdx);
  }

  return (
    <Router>
      <Routes>
        <Route path="/app/users/log-in" element={<LoginForm loginCallBack={loginCallBack} />} />
        <Route path="/app/users/sign-up" element={<SignupForm />} />
        <Route path="/app/users/:userIdx/search" element={<SearchBar userIdx={userIdx} />} />
        <Route path="/app/users/result" element={<ResultPage />} />
        <Route path="/app/users/:userIdx" element={<MyPage userIdx={userIdx}/>} />
        <Route path="/" element={isLogin ? <SearchBar userIdx={userIdx} /> : <LoginForm loginCallBack={loginCallBack} />} />
      </Routes>
    </Router>
  );
};

export default App;