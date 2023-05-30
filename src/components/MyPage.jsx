import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080' // Update with your API URL
});

const MyPage = ({ userIdx }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/app/users/${userIdx}`); // Update the API endpoint with the appropriate route
        const userData = response.data;
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [userIdx]);

  return (
    <div>
      {user ? (
        <div>
          <h1>User Profile</h1>
          <p>User ID: {user.userIdx}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Render additional user information as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyPage;
