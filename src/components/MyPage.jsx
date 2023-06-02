import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

const MyPage = () => {
  const { userIdx } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/app/users/${userIdx}`);
        const userData = response.data;
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };

    if (userIdx) {
      fetchUser();
    }
  }, [userIdx]);

  return (
    <div>
      <h1>My page 검색 히스토리</h1>
      <ul>
        {user && (
          <li key={user.userIdx}>
            company: {user.companyName}, page: {user.page}, days: {user.days}, created at: {user.createdAt}, updated at: {user.updatedAt}
          </li>
        )}
      </ul>
    </div>
  );
};

export default MyPage;

