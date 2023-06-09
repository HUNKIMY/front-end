import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './MyPage.css';

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
      <h1 className="my-page-title">My page</h1>
      <div className="list-container">
        <ul className="search-history-list">
          {userData.length > 0 ? (
            userData.map((user, index) => (
              <div key={index}>
                <li>Company Name: {user.companyName}</li>
                <li>Page: {user.page}</li>
                <li>Days: {user.days}</li>
                <li>Created At: {user.createdAt}</li>
                <li>Updated At: {user.updatedAt}</li>
              </div>
            ))
          ) : (
            <li>No userdata found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MyPage;
