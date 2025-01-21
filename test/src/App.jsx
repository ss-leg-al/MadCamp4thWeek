import React, { useState } from 'react';
import './App.css';
import AdventCalendar from './components/AdventCalendar';
import Home from './components/Home';
import Train from './components/Train';
import Lobby from './components/Lobby'; // Lobby 컴포넌트 추가

function App() {
  const [currentPage, setCurrentPage] = useState(0); // 0: Home, 1: Train, 2: Lobby, 3: AdventCalendar
  const [isScrolling, setIsScrolling] = useState(false); // 스크롤 잠금 상태
  const [refreshTrigger, setRefreshTrigger] = useState(false); // AdventCalendar 새로고침 트리거

  const handleLoginSuccess = () => {
    setRefreshTrigger(!refreshTrigger); // AdventCalendar 데이터 새로고침
    setCurrentPage((prevPage) => prevPage + 1); // 로그인 성공 시 다음 페이지로 이동
  };

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

    setTimeout(() => setIsScrolling(false), 1000); // 애니메이션 시간과 일치
  };

  return (
    <div className="app-container" onWheel={handleScroll}>
      <div
        className={`page ${currentPage === 0 ? 'visible' : 'hidden'}`}
        style={{ zIndex: currentPage === 0 ? 10 : 0 }}
      >
        <Home />
      </div>
      <div
        className={`page ${currentPage === 1 ? 'visible' : 'hidden'}`}
        style={{ zIndex: currentPage === 1 ? 10 : 0 }}
      >
        <Train isActive={currentPage === 1} />
      </div>
      <div
        className={`page ${currentPage === 2 ? 'visible' : 'hidden'}`}
        style={{ zIndex: currentPage === 2 ? 10 : 0 }}
      >
        <Lobby onLoginSuccess={handleLoginSuccess} />
      </div>
      <div
        className={`page ${currentPage === 3 ? 'visible' : 'hidden'}`}
        style={{ zIndex: currentPage === 3 ? 10 : 0 }}
      >
        <AdventCalendar refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}

export default App;