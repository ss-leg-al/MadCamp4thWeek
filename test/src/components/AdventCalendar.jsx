import React, { useEffect, useState } from 'react';
import Door from './Door';
import Modal from './Modal';
import './AdventCalendar.css';
import buildingImage from '../assets/realhotel.png';

const AdventCalendar = ({ refreshTrigger }) => {
  const [messages, setMessages] = useState([]); // 메시지 상태
  const [selectedMessage, setSelectedMessage] = useState(null); // 선택된 메시지
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [snowflakes, setSnowflakes] = useState([]); // 눈송이 상태

  useEffect(() => {
    // refreshTrigger가 변경될 때마다 메시지 새로 로드
    const storedMessages = JSON.parse(sessionStorage.getItem('messages')) || [];
    setMessages(storedMessages);
  }, [refreshTrigger]);

  // 눈송이 생성 로직
  useEffect(() => {
    const createSnowflakes = () => {
      const snowflakeCount = 100; // 눈송이 개수
      const snowflakeArray = Array.from({ length: snowflakeCount }).map(() => ({
        left: `${Math.random() * 100}%`, // 랜덤 위치
        animationDuration: `${Math.random() * 2 + 5}s`, // 랜덤 속도
        fontSize: `${Math.random() * 1.5 + 0.5}rem`, // 랜덤 크기
      }));
      setSnowflakes(snowflakeArray);
    };

    createSnowflakes();
  }, []); // 컴포넌트가 처음 렌더링될 때 실행

  const handleOpenModal = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* 눈 내리는 애니메이션 */}
      <div className="snow-container">
        {snowflakes.map((flake, index) => (
          <span
            key={index}
            className="snowflake"
            style={{
              left: flake.left,
              animationDuration: flake.animationDuration,
              fontSize: flake.fontSize,
            }}
          >
            ❄
          </span>
        ))}
      </div>

      <div className="advent-calendar-container">
        <img src={buildingImage} className="building-image" alt="Building" />
        <div className="calendar">
          {messages.map((message, index) => (
            <Door
              key={index}
              number={index + 1}
              message={message}
              onClick={() => handleOpenModal(message)}
            />
          ))}
        </div>
        {isModalOpen && selectedMessage && (
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <h2>Message from {selectedMessage.sender}</h2>
            <p>{selectedMessage.content}</p>
          </Modal>
        )}
      </div>
    </>
  );
};

export default AdventCalendar;