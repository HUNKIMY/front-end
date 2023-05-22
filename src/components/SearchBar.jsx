import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`/api/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchResults(response.data);
      navigate('/result'); // 결과 페이지로 이동
    } catch (error) {
      console.error('검색 실패:', error);
      setSearchResults([]);
    }
  };

  return (
    <div className="real-search-bar-container">
      <h1 className="real-search-bar-logo">Stocks ing</h1>
      <form className="real-search-bar-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="검색어를 입력하세요"
        />
        <button type="submit">검색</button>
      </form>
    </div>
  );
};

export default SearchBar;
