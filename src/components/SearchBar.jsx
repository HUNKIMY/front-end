import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = () => {
const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState([]);

const handleSearchChange = (event) => {
setSearchQuery(event.target.value);
};

const handleSearchSubmit = async (event) => {
event.preventDefault();
try {
const response = await axios.get(`/api/search?query=${encodeURIComponent(searchQuery)}`);

// 서버로부터의 응답을 확인하고 적절한 처리를 수행합니다.
setSearchResults(response.data);
} catch (error) {
// 오류 처리
console.error('검색 실패:', error);
setSearchResults([]);
}
};

return (
<div className="search-bar-container">
<h1 className='logo'>Stocks ing</h1>
<form className="search-bar" onSubmit={handleSearchSubmit}>
<input
       type="text"
       value={searchQuery}
       onChange={handleSearchChange}
       placeholder="검색어를 입력하세요"
     />
<button type="submit">검색</button>
</form>
{searchResults.length > 0 && (
<ul className="search-results">
{searchResults.map((result) => (
<li key={result.id}>{result.title}</li>
))}
</ul>
)}
</div>
);
};

export default SearchBar;