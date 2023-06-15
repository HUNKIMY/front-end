import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactWordcloud from 'react-wordcloud';
import { VictoryPie } from 'victory';
import { useNavigate, useParams } from 'react-router-dom';
import './ResultPage.css';
import Button from 'react-bootstrap/Button';
import mypage from './mypage.png';


const ResultPage = () => {
  const baseUrl = 'http://localhost:8080';
  const { userIdx } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [userData, setUserData] = useState([]);
  const [input, setInput] = useState({
    companyName: '',
    page: '',
    days: ''
  });
  const [positive, setPositive] = useState(''); 

  useEffect(() => {
    let isMounted = true; // Add a flag to track the component's mounted state
  
    getResults();
  
    return () => {
      isMounted = false; // Set the flag to false when the component is unmounted
    };
  
    async function getResults() {
      const jwt = localStorage.getItem('jwt');
      const userIdx = localStorage.getItem("userIdx");

  
      try {
        const response = await axios.get(`${baseUrl}/app/users/${userIdx}/search`, {
          headers: {
            'x-access-token': jwt,
          },
        });
  
        if (isMounted) {
          console.log(response.data.result);
          setResults(response.data.result);
          setPositive(response.data.result[0].keyword);
          console.log(response.data.result[0].keyword);
          // const negative = responseData;
          
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, []);
  

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };
  function insertData(e) {
    e.preventDefault();
    const jwt = localStorage.getItem('jwt');
    const userIdx = localStorage.getItem("userIdx");
    

    const { companyName, page, days } = input;

    const insertData = async () => {
      await axios
        .post(`${baseUrl}/app/users/${userIdx}/search`, {
          companyName,
          page,
          days
        }, {
          headers: {
            'x-access-token': jwt
          }
        })
        .then((response) => {
          console.log(response.data);
          setInput({
            companyName: '',
            page: '',
            days: ''
          });
          getResults();
          navigate(`/app/users/result`);
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


  // Word cloud options
  const wordCloudOptions = {
    size: [800, 600],
    rotations: 2,
    rotationAngles: [0, 0],
    fontSizes: [20, 60],
    padding: 5,
  };
  
  const keywords = positive.split(' ').map((keyword) => ({
    text: keyword,
    value: 10,
  }));



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
    <div className="result-page-container">
       <div className="rectangle-9"></div>
      <div className="rectangle-5"></div>
      <div className="rectangle-6"></div>
      <div className="rectangle-7"></div>
      <div className="page">페이지</div>
      {results && <div className="analysis-time"> {results[0].date} 기준으로 분석된 결과입니다</div>}
      <div className="until">일 전까지</div>
      <div className="stocks-ing">Stock.ing</div>
      {results &&<div className="rectangle-8">  <div className='ratioimage2'>{results[0].img2} </div></div>}
      <div className="group-5"></div>
      {results && <div className="group-6">{results[1].companyName} 주식 정보
    
      </div>}
      <div className="chartcircle-icon"></div>
      <div className="group-2"></div>
      <div className="group-4">긍・부정 비율
      {results &&<div className='ratioimage'><img className='ratioimage'src={results[0].img1} alt="Image 1" /></div>}
      </div>
      <div className="group-7">긍정단어순위</div>

      {<div className="arrangeverticalsquare-icon"></div> }
      <div className="rectangle-10"></div>
      <div className="group-8">부정 단어 순위</div>
      { <div className="arrangeverticalsquare-icon-2"></div>}
      <div className="rectangle-11">

      </div>
      <div className="group-11">긍・부정 워드 클라우드<div className="word-cloud-container">
        
        <ReactWordcloud words={keywords} options={wordCloudOptions} />
      </div></div>
      <div className="group-10"></div>
      {<div className="category-icon"></div> }
      
      {results && <div className="rectangle-12"><div><br /><br /><br /></div>
      <div className='summary'>{results[0].summary}</div><br /> <div className='summary'>{results[1].summary}</div><br />
      <div className='summary'>{results[2].summary}</div><br /> <div className='summary'>{results[3].summary}</div>
      </div>}

      
      <div className="group-12">기사 요약</div>
      <div className="removebg-preview-1">
      
      </div>
      {<div className="book1-icon"></div>}
      {results && <div className="rectangle-13"><div><br /><br /><br /></div>
      <div className='summary1'>{results[0].title}</div><br /> <div className='summary1'>{results[1].title}</div><br />
      <div className='summary1'>{results[2].title}</div><br /> <div className='summary1'>{results[3].title}</div>
      <div className='summary1'>{results[4].title}</div><br /> <div className='summary1'>{results[5].title}</div><br />
     
      </div>}

      <div className="group-13">기사 제목</div>

      { <div className="image-5"></div> }
      {<div className="image-6"></div> }
      { <div className="image-7"></div>}

      <img className='resultmypage' src={mypage} alt="" onClick={handleMyPageClick} />


    </div>
  );
};

export default ResultPage;




