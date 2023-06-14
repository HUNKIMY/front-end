import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './SearchBar.css';
import image from './newsimage.png';
import mypage from './mypage.png'
import orange from './orangebutton.png'
import rectangle from './Rectangle.png'

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
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const { companyName, page, days } = input;
      if (companyName && page && days) {
        insertData(event);
      }
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    async function getResults() {
      const jwt = localStorage.getItem('jwt');

      try {
        const response = await axios.get(`${baseUrl}/app/users/${userIdx}/search`, {
          headers: {
            'x-access-token': jwt
          },
          cancelToken: source.token
        });

        setResults(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getResults();

    return () => {
      source.cancel();
    };
  }, [userIdx]);

  async function insertData(e) {
    e.preventDefault();
    const jwt = localStorage.getItem('jwt');
    const userIdx = localStorage.getItem("userIdx");

    const { companyName, page, days } = input;

    try {
      const response = await axios.post(`${baseUrl}/app/users/${userIdx}/search`, {
        companyName,
        page,
        days
      }, {
        headers: {
          'x-access-token': jwt
        }
      });

      setInput({
        companyName: '',
        page: '',
        days: ''
      });

      navigate(`/app/users/result`);
    } catch (error) {
      console.error(error);
      navigate(`/app/users/result`);
    }
  }

  function changeText(e) {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleMyPageClick = async (e) => {
    e.preventDefault();
    const jwt = localStorage.getItem('jwt');
    const userIdx = localStorage.getItem("userIdx");

    try {
      const response = await axios.get(`${baseUrl}/app/users/${userIdx}`, {
        headers: {
          'x-access-token': jwt,
        },
      });

      setUserData(response.data.result);
      navigate(`/app/users/${userIdx}`);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>

    <div className="real-search-bar-container">
     
    <div className='newsimage'>
    <img src={image} alt="Image" />
    </div>

    <img className='mypageshin' src={mypage} alt="" onClick={handleMyPageClick} />
      <h2 className="real-search-bar-logo">Stock.ing</h2>
      <h2 className='real-search-bar-d'>뉴스 홍수시대, 흐름이 궁금하다면?</h2>
      <h2 className='real-search-bar-d2'>내가 관심있는 종목의 수 많은 뉴스 기사들을 한눈에 파악하자</h2>
      <form className="real-search-bar-form" action="" onSubmit={insertData}>
      <div>

        <input
          className='firstbox'
          type=""
          required={true}
          name="companyName"
          value={input.companyName}
          onChange={changeText}
          placeholder="종목을 입력하세요"
        />
        </div>
        <div>
        <h4 className='pagetext'>페이지</h4>
        <input
        className='secondbox'
          type=""
          required={true}
          name="page"
          value={input.page}
          onChange={changeText}
          placeholder="예: 3"
        />
        </div>
        <div>
        <h4 className='daysagotext'>일 전까지</h4>
        <input
          className='thirdbox'
          type=""
          required={true}
          name="days"
          value={input.days}
          onChange={changeText}
          placeholder="예: 3"
          onKeyDown={handleKeyDown}
        />
        </div>
        <img className='orange' src={orange} alt="" onClick={insertData} />
  

      </form>

      <h3 className='firstrec'>인기검색 종목</h3>
      <img className='firsty' src={rectangle} alt="Image" />
      <h3 className='secondrec'>긍정 급상승 순위</h3>
      <img className='secondy' src={rectangle} alt="Image" />
      <h3 className='thirdrec'>부정 급상승 순위</h3>
      <img className='thirdy' src={rectangle} alt="Image" />
      {results && (
        <div>
          {/* {Array.isArray(results) ? (
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
          )} */}
        </div>
      )}
    </div>
    </div>
  );
};

export default SearchBar;
