import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ResultPage from './components/ResultPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/app/users/log-in" element={<LoginForm />} />
        <Route path="/app/users/sign-up" element={<SignupForm />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>
  );
};

export default App;
