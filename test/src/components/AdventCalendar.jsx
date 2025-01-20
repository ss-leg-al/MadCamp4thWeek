import React, { useEffect, useState } from 'react';
import Door from './Door';
import './AdventCalendar.css';
import buildingImage from '../assets/hotel.png';

const AdventCalendar = () => {
  const [buildingDimensions, setBuildingDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const buildingElement = document.querySelector('.building-image');
      if (buildingElement) {
        const rect = buildingElement.getBoundingClientRect();
        setBuildingDimensions({
          width: rect.width,
          height: rect.height,
        });
      }
    };

    updateDimensions(); // 초기 크기 설정
    window.addEventListener('resize', updateDimensions); // 윈도우 크기 변경 시 업데이트

    return () => window.removeEventListener('resize', updateDimensions); // 이벤트 리스너 정리
  }, []);

  return (
    <div className="advent-calendar-container">
      <img src={buildingImage} className="building-image" alt="Building" />
      <div className="calendar">
        {Array.from({ length: 20 }).map((_, i) => (
          <Door
            key={i}
            number={i + 1}
            className={`door-${i + 1}`} // 각 창문에 고유 클래스 추가
          />
        ))}
      </div>
    </div>
  );
};

export default AdventCalendar;