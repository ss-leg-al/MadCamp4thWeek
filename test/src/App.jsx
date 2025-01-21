import React, { useState } from 'react';
import './App.css';
import AdventCalendar from './components/AdventCalendar';
import Home from './components/Home';
import Train from './components/Train';
import Lobby from './components/Lobby'; // Lobby 컴포넌트 추가

function App() {
  const [currentPage, setCurrentPage] = useState(0); // 0: Home, 1: Train, 2: Lobby, 3: AdventCalendar
  const [isScrolling, setIsScrolling] = useState(false); // 스크롤 잠금 상태

  const handleScroll = (event) => {
    if (isScrolling) return; // 애니메이션이 진행 중이면 처리하지 않음
    setIsScrolling(true);
    if (event.deltaY > 0 && currentPage < 3) {
      // 아래로 스크롤 시 다음 페이지로 이동
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (event.deltaY < 0 && currentPage > 0) {
      // 위로 스크롤 시 이전 페이지로 이동
      setCurrentPage((prevPage) => prevPage - 1);
    }
    setTimeout(() => setIsScrolling(false), 1000);
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
        <Home />
      </div>
      <div className="page">
        <Train />
      </div>
      <div className="page">
        <Lobby /> {/* Lobby 페이지 추가 */}
      </div>
      <div className="page">
        <AdventCalendar />
      </div>
    </div>
  );
}

export default App;