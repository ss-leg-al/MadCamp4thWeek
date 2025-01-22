import React, { useEffect, useState } from 'react';
import './Train.css';
import trainImage from '../assets/longtrain.png';

const Train = ({ isActive }) => {
  const [animate, setAnimate] = useState(false);
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    // 눈송이 초기 생성
    const generateSnowflakes = () => {
      const flakes = Array.from({ length: 50 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 5 + 5}s`,
        animationDelay: `${Math.random() * 5}s`, // 랜덤 딜레이 설정
        fontSize: `${Math.random() * 1.5 + 1}rem`,
      }));
      setSnowflakes(flakes);
    };

    generateSnowflakes();

    if (isActive) {
      setAnimate(false); // 애니메이션 초기화
      const timeout = setTimeout(() => setAnimate(true), 50); // 딜레이 후 애니메이션 시작
      return () => clearTimeout(timeout); // 클린업
    }
  }, [isActive]); // isActive가 변경될 때 실행

  return (
    <div className="train-container">
      <div className="snow-container">
        {snowflakes.map((flake, index) => (
          <span
            key={index}
            className="snowflake"
            style={{
              left: flake.left,
              animationDuration: flake.animationDuration,
              animationDelay: flake.animationDelay,
              fontSize: flake.fontSize,
            }}
          >
            ❄
          </span>
        ))}
      </div>
      <img
        src={trainImage}
        alt="Train"
        className={`train ${animate ? 'animate' : ''}`}
      />
    </div>
  );
};

export default Train;