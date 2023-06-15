import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './MyPage.css';
import mypage from './mypage.png';
import stocklist from './stocklist.png';
import lastlist from './lastlist.png';
import arrowi from './arrow.png';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

const MyPage = () => {
  const { userIdx } = useParams();
  const [userData, setUserData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const jwt = localStorage.getItem('jwt');
      const userIdx = localStorage.getItem('userIdx');

      try {
        const response = await api.get(`/app/users/${userIdx}`, {
          headers: {
            'x-access-token': jwt,
          },
        });

        console.log(response.data.result);
        setUserData(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (

    <div className="my-page-container">
          <img className='mypageshin' src={mypage} alt=""/>
      <h2 className="my-page-title">신주호 님, 안녕하세요  </h2>
      <h3 className='mystock'>나의 주식</h3>
      <div>
        <img className='stocklist' src={stocklist} alt="" />
        {/* <img className='lastlist' src={lastlist} alt="" />
        <img className='arrow' src={arrowi} alt="" /> */}
      </div>
      <h3 className='myhistory'>나의 검색 기록</h3>
      <div className="list-container">
      <div className="rectangleinme">        <ul className="search-history-list">
          {userData.length > 0 ? (
            userData.map((user, index) => (
              <div key={index}>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.updatedAt} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {user.companyName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {user.page} 페이지&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {user.days} 일 전까지
                </p>

                
              </div>
            ))
          ) : (
            <li>No userdata found.</li>
          )}
        </ul></div>

      </div>
    </div>
  );
};

export default MyPage;
