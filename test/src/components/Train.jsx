import React, { useEffect, useState } from 'react';
import './Train.css';
import trainImage from '../assets/train.png';

const Train = ({ isActive }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isActive) {
      setAnimate(false); // 애니메이션 초기화
      const timeout = setTimeout(() => setAnimate(true), 50); // 딜레이 후 애니메이션 시작
      return () => clearTimeout(timeout); // 클린업
    }
  }, [isActive]); // isActive가 변경될 때 실행

  return (
    <div className="train-container">
      <img
        src={trainImage}
        alt="Train"
        className={`train ${animate ? 'animate' : ''}`} // 애니메이션 클래스 동적 추가
      />
    </div>
  );
};

export default Train;