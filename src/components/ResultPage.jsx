import React from 'react';
import WordCloud from 'react-wordcloud';
import { VictoryPie } from 'victory';
import './ResultPage.css';

const PieChart = () => {
  const data = [
    { x: 'A', y: 40 },
    { x: 'B', y: 20 },
  ];

  return (
    <div className='piechart'>
      <h2>Pie Chart Example</h2>
      <VictoryPie
        data={data}
        colorScale={['#FF6384', '#36A2EB']}
      />
    </div>
  );
};

const ResultPage = () => {
  // 워드 클라우드에 사용될 데이터
  const words = [
    { text: 'Lorem', value: 10 },
    { text: 'Ipsum', value: 7 },
    { text: 'Dolor', value: 5 },
    { text: 'Sit', value: 8 },
    { text: 'Amet', value: 12 },
    { text: 'Consectetur', value: 6 },
    { text: 'Adipiscing', value: 9 },
    { text: 'Elit', value: 4 },
    { text: 'Sed', value: 11 },
    { text: 'Eiusmod', value: 7 },
    { text: 'Tempor', value: 6 },
  ];

  return (
    <div>
      <h1>결과창</h1>
      <div className="wordcloud-container">
        <WordCloud words={words} />
      </div>
      <PieChart />
    </div>
  );
};

export default ResultPage;
