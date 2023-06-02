import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = (props) => {
  const [searchQuery1, setSearchQuery1] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('');
  const [searchQuery3, setSearchQuery3] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  useEffect(() => {
    // 로그인 상태가 변경될 때마다 토큰을 업데이트
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleSearchChange1 = (event) => {
    setSearchQuery1(event.target.value);
  };

  const handleSearchChange2 = (event) => {
    setSearchQuery2(event.target.value);
  };

  const handleSearchChange3 = (event) => {
    setSearchQuery3(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const searchQuery = `${searchQuery1} ${searchQuery2} ${searchQuery3}`; // Combine the search queries
    try {
      const response = await axios.get(`/api/search?query=${encodeURIComponent(searchQuery)}`, {
        headers: {
          Authorization: `Bearer ${token}` // 토큰을 헤더에 포함하여 요청
        }
      });
      setSearchResults(response.data);
      navigate('/app/users/result'); // Navigate to the result page
    } catch (error) {
      console.error('검색 실패:', error);
      setSearchResults([]);
    }
  };

  const handleMyPageClick = (event) => {
    event.preventDefault();
    navigate(`/app/users/${localStorage.getItem('userIdx')}`);
  };
  

  return (
    <div className="real-search-bar-container">
      <button className="mypage-button" onClick={handleMyPageClick}>
        My Page 검색 히스토리
      </button>
      <h1 className="real-search-bar-logo">Stocks ing</h1>
      <form className="real-search-bar-form" onSubmit={handleSearchSubmit}>
        <div>
        <h4>주식 키워드</h4>
        <input
          type="text"
          value={searchQuery1}
          onChange={handleSearchChange1}
          placeholder="예:티맥스 소프트"
        />
        </div>
        <div>
        <h4>조회 일</h4>
        <input
          type="text"
          value={searchQuery2}
          onChange={handleSearchChange2}
          placeholder="예: 3"
        />
        </div>
        <div>
        <h4>조회 페이지</h4>
        <input
          type="text"
          value={searchQuery3}
          onChange={handleSearchChange3}
          placeholder="예: 3"
        />
        </div>
        <button type="submit">검색</button>
      </form>
    </div>
  );
};

export default SearchBar;
