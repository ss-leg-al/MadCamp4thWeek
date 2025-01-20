// src/components/Door.jsx
import React, { useState } from 'react';
import './Door.css';
import Modal from './Modal';

const Door = ({ number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleDoor = () => {
    if (!showModal) setIsOpen(!isOpen);
  };

  const openModal = (event) => {
    event.stopPropagation(); // 클릭 이벤트 전파 방지
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div>
      <div className={`door-container ${isOpen ? 'open' : ''}`} onClick={toggleDoor}>
        {/* 왼쪽 문 반쪽 */}
        <div className="door-left">
          <div className="door-front">
            <span className="door-number">{number}</span>
          </div>
          <div className="door-back"></div>
        </div>
        
        {/* 오른쪽 문 반쪽 */}
        <div className="door-right">
          <div className="door-front">
         
          </div>
          <div className="door-back"></div>
        </div>
        
        {/* 배경 및 보상 아이콘 */}
        <div className="door-background">
          <span className="reward" onClick={openModal}>🎁</span>
        </div>
      </div>
      
      {/* 보상 모달 */}
      <Modal isOpen={showModal} onClose={closeModal}>
        <h2>축하합니다!</h2>
        <p>문 {number}을(를) 열었습니다!</p>
      </Modal>
    </div>
  );
};

export default Door;