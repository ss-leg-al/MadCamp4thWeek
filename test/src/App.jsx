import React, { useState } from 'react';
import './App.css';
import AdventCalendar from './components/AdventCalendar';
import Home from './components/Home';
import Train from './components/Train';
import Zoom from './components/Zoom'; // Zoom 컴포넌트 추가
import Lobby from './components/Lobby'; // Lobby 컴포넌트 추가

function App() {
  const [currentPage, setCurrentPage] = useState(0); // 0: Home, 1: Train, 2: Zoom, 3: Lobby, 4: AdventCalendar
  const [isScrolling, setIsScrolling] = useState(false); // 스크롤 잠금 상태
  const [refreshTrigger, setRefreshTrigger] = useState(false); // AdventCalendar 새로고침 트리거
  const [isTransitioning, setIsTransitioning] = useState(false); // 암전 효과 상태

  const fadeDuration = 1000; // 1초
  const deltaThreshold = 30; // 스크롤 임계값

  const handleLoginSuccess = () => {
    setRefreshTrigger(!refreshTrigger); // AdventCalendar 데이터 새로고침
    setCurrentPage((prevPage) => prevPage + 1); // 로그인 성공 시 다음 페이지로 이동
  };

  const handleScroll = (event) => {
    if (isScrolling || isTransitioning) {
      event.preventDefault(); // 이벤트 중복 방지
      return;
    }

    // deltaY 임계값 체크
    if (Math.abs(event.deltaY) < deltaThreshold) return;

    // Zoom 페이지(2번)에서는 스크롤 이벤트를 차단
    if (currentPage === 2) return;

    setIsScrolling(true);

    if (event.deltaY > 0 && currentPage < 4) {
      // 아래로 스크롤 시 다음 페이지로 이동
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (event.deltaY < 0 && currentPage > 0) {
      // 위로 스크롤 시 이전 페이지로 이동
      setCurrentPage((prevPage) => prevPage - 1);
    }

    setTimeout(() => setIsScrolling(false), 1000); // 애니메이션 시간과 일치
  };

  // Zoom 페이지에서 Lobby 페이지로 넘어가는 핸들러
  const handleZoomToLobby = () => {
    setIsTransitioning(true); // 암전 시작

    setTimeout(() => {
      setCurrentPage(3); // 페이지 변경
      setTimeout(() => {
        setIsTransitioning(false); // 암전 해제
      }, fadeDuration); // 암전 해제 타이밍
    }, fadeDuration); // 암전 완료 후 페이지 변경
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
        <Zoom onClickNext={handleZoomToLobby} />
      </div>
      <div
        className={`page ${currentPage === 3 ? 'visible' : 'hidden'}`}
        style={{ zIndex: currentPage === 3 ? 10 : 0 }}
      >
        <Lobby onLoginSuccess={handleLoginSuccess} />
      </div>
      <div
        className={`page ${currentPage === 4 ? 'visible' : 'hidden'}`}
        style={{ zIndex: currentPage === 4 ? 10 : 0 }}
      >
        <AdventCalendar refreshTrigger={refreshTrigger} />
      </div>
      {/* 암전 오버레이 */}
      <div className={`transition-overlay ${isTransitioning ? 'visible' : ''}`}></div>
    </div>
  );
}

export default App;