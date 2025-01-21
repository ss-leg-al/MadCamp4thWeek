// AdventCalendar.jsx
import React, { useEffect, useState } from 'react';
import Door from './Door';
import Modal from './Modal';
import './AdventCalendar.css';
import buildingImage from '../assets/hotel2.png';

const AdventCalendar = ({ refreshTrigger }) => {
  const [buildingDimensions, setBuildingDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [messages, setMessages] = useState([]); // 메시지 상태
  const [selectedMessage, setSelectedMessage] = useState(null); // 선택된 메시지
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

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

  useEffect(() => {
    // refreshTrigger가 변경될 때마다 메시지 새로 로드
    const storedMessages = JSON.parse(sessionStorage.getItem('messages')) || [];
    setMessages(storedMessages);
  }, [refreshTrigger]);

  const handleOpenModal = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
    setIsModalOpen(false);
  };

  return (
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
  );
};

export default AdventCalendar;
