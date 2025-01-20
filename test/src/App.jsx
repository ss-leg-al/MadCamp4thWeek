import React, { useState } from 'react';
import './App.css';
import AdventCalendar from './components/AdventCalendar';
import Home from './components/Home';

function App() {
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태 (0: Home, 1: AdventCalendar)

  const handleScrollToNextPage = () => {
    setCurrentPage(1); // AdventCalendar로 이동
  };
  const handleScroll = (event) => {
    if (event.deltaY > 0 && currentPage === 0) {
      setCurrentPage(1); // 다음 페이지로
    } else if (event.deltaY < 0 && currentPage === 1) {
      setCurrentPage(0); // 이전 페이지로
    }
  };
  
  
  return (
    <div
      className="app-container"
      onWheel={handleScroll}
      style={{
        transform: `translateY(-${currentPage * 100}vh)`, // 현재 페이지 위치에 따라 이동
        transition: 'transform 1s ease-in-out',
      }}
    >
      <div className="page">
        <Home onNext={handleScrollToNextPage} />
      </div>
      <div className="page">
        <AdventCalendar />
      </div>
    </div>
  );
}

export default App;