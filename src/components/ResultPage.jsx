import React, { useState } from 'react';
import ReactWordcloud from 'react-wordcloud';
import { VictoryPie } from 'victory';
import { useNavigate } from 'react-router-dom';
import './ResultPage.css';

const ResultPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  // Example positive and negative data
  const positiveData = [
    { text: '강력한', value: 10 },
    { text: '성능', value: 8 },
    { text: '탁월한', value: 6 },
    { text: '품질', value: 4 },
    { text: '혁신적인', value: 2 },
  ];

  const negativeData = [
    { text: '고가', value: 7 },
    { text: '불안정한', value: 5 },
    { text: '소프트웨어', value: 3 },
    { text: '서비스', value: 9 },
    { text: '품질', value: 1 },
  ];

  // Combine positive and negative data into a single dataset
  const combinedData = [...positiveData, ...negativeData];

  // Word cloud options
  const wordCloudOptions = {
    rotations: 2,
    rotationAngles: [-90, 0],
    fontSizes: [20, 60],
  };

  return (
    <div className="result-page-container">
      <div className="search-bar-container">
        <h1 className="logo">Stocks ing</h1>
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="검색어를 입력하세요"
          />
          <button type="submit">검색</button>
        </form>
      </div>
      <h2 className='keyword'>검색 키워드: 삼성전자</h2>
      <div className='result-container'>
      <div className="word-cloud-container">
        
        <ReactWordcloud words={combinedData} options={wordCloudOptions} />
      </div>

      <div className="chart-container">
        
        <VictoryPie
          data={[
            { x: 'Positive', y: positiveData.length },
            { x: 'Negative', y: negativeData.length },
          ]}
          colorScale={['#2ecc71', '#e74c3c']}
        />
      </div>
      </div>
    </div>
  );
};

export default ResultPage;




// import React, { useState } from 'react';
// import WordCloud from 'react-wordcloud';
// import { VictoryPie } from 'victory';
// import "./ResultPage.css";

// const ResultPage = ({ searchResults }) => {
//   // 검색 결과를 기반으로 단어와 빈도수를 추출합니다.
//   const getWordFrequencies = (results) => {
//     const wordCountMap = new Map();
//     const words = results.split(' ');

//     words.forEach((word) => {
//       const count = wordCountMap.get(word) || 0;
//       wordCountMap.set(word, count + 1);
//     });

//     return Array.from(wordCountMap, ([text, value]) => ({ text, value }));
//   };

//   // 워드 클라우드의 옵션 설정
//   const wordCloudOptions = {
//     rotations: 2,
//     rotationAngles: [-90, 0],
//     fontSizes: [20, 60],
//   };

//   // 파이 차트 데이터 설정
//   const pieChartData = getWordFrequencies(searchResults.join(' '));

//   return (
//     <div>
//       <h2>Word Cloud</h2>
//       <WordCloud words={getWordFrequencies(searchResults.join(' '))} options={wordCloudOptions} />

//       <h2>Search Results</h2>
//       <VictoryPie data={pieChartData} colorScale="qualitative" />
      
//       {/* 검색 결과를 리스트 형태로 표시할 수도 있습니다.
//       <ul>
//         {searchResults.map((result, index) => (
//           <li key={index}>Result {index + 1}: {result}</li>
//         ))}
//       </ul>
//       */}
//     </div>
//   );
// };

// export default ResultPage;
