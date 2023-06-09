import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = ({ loginCallBack }) => {
  const baseUrl = 'http://localhost:8080';
  const { userIdx } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    companyName: '',
    page: '',
    days: ''
  });
  const [results, setResults] = useState(null);
  const [userData, setUserData] = useState([]);

  async function getResults() {
    const jwt = localStorage.getItem('jwt');

    try {
      const response = await axios.get(`${baseUrl}/app/users/${userIdx}/search`, {
        headers: {
          'x-access-token': jwt
        }
      });
      console.log(response.data);
      setResults(response.data);

    } catch (error) {
      console.error(error);
    }
  }

  function insertData(e) {
    e.preventDefault();

    const { companyName, page, days } = input;

    const insertData = async () => {
      await axios
        .post(`${baseUrl}/app/users/${userIdx}/search`, {
          companyName,
          page,
          days
        })
        .then((response) => {
          console.log(response.data);
          setInput({
            companyName: '',
            page: '',
            days: ''
          });
          getResults();
          navigate(`$/app/users/result`);
        })
        .catch((error) => {
          console.error(error);
          navigate(`/app/users/result`);
        });
    };
    insertData();
    console.log('입력 추가됨');
  }

  function changeText(e) {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleMyPageClick = async(e) =>{
    e.preventDefault();
    const jwt = localStorage.getItem('jwt');
    const userIdx = localStorage.getItem("userIdx");

    try {
      const response = await axios.get(`${baseUrl}/app/users/${userIdx}`, {
        headers: {
          'x-access-token': jwt,
        },
      });

      console.log(response.data.result);
      setUserData(response.data.result);
      navigate(`/app/users/${userIdx}`);
  
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <div className="real-search-bar-container">
    <button className="mypagebutton" onClick={handleMyPageClick}>
      My Page: 검색 히스토리
    </button>
      <h1 className="real-search-bar-logo">Stocks.ing</h1>
      <form className="real-search-bar-form" action="" onSubmit={insertData}>
      <div>
      <h4>주식 키워드</h4>
        <input
          type=""
          required={true}
          name="companyName"
          value={input.companyName}
          onChange={changeText}
          placeholder="예:티맥스 소프트"
        />
        </div>
        <div>
        <h4>조회 페이지</h4>
        <input
          type=""
          required={true}
          name="page"
          value={input.page}
          onChange={changeText}
          placeholder="예: 3"
        />
        </div>
        <div>
        <h4>조회 일</h4>
        <input
          type=""
          required={true}
          name="days"
          value={input.days}
          onChange={changeText}
          placeholder="예: 3"
        />
        </div>
        <button variant="dark" type="submit">검색</button>
      </form>
      {results && (
        <div>
          {Array.isArray(results) ? (
            results.length > 0 ? (
              results.map((result) => (
                <div key={result.companyIdx}>
                  <h2>{result.companyName}</h2>
                  <img src={result.img1} alt="Image 1" />
                  <img src={result.img2} alt="Image 2" />
                </div>
              ))
            ) : (
              <>
                <h2>{results.companyName}</h2>
                <img src={results.img1} alt="Image 1" />
                <img src={results.img2} alt="Image 2" />
              </>
            )
          ) : (
            <>
              <h2>{results.companyName}</h2>
              <img src={results.img1} alt="Image 1" />
              <img src={results.img2} alt="Image 2" />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
