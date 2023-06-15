import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArticleSummary = ({ companyName }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get('https://apis/1160100/service/GetStockSecuritiesInfoService', {
        params: {
          serviceKey: import.meta.env.VITE_APP_GA_TRACKING_ID,
          likeItmsNm: companyName,
          resultType: 'json'
        }
      })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [companyName]);
  
  console.log(companyName);
  console.log(data);

  return (
    <div>
      <h2>검색 결과</h2>
      <ul>
        {data &&
          data.map(item => (
            <li key={item.srtnCd}>
              <p>종목명: {item.itmsNm}</p>
              <p>현재가: {item.clpr}</p>
              <p>대비: {item.vs}</p>
              <p>등락률: {item.fltRt}</p>
              <p>시가총액: {item.mrktTotAmt}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ArticleSummary;
