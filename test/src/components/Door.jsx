import React, { useState } from 'react';
import './Door.css';
import Modal from './Modal';
import leftDoor from '../assets/leftdoor.png';
import rightDoor from '../assets/rightdoor.png';
import brightLeftDoor from '../assets/brightleftdoor.png';
import brightRightDoor from '../assets/brightrightdoor.png';

const Door = ({ number, message }) => {
  const [isOpen, setIsOpen] = useState(false); // 문 열림 상태
  const [isChanged, setIsChanged] = useState(false); // 이미지 변경 여부
  const [showModal, setShowModal] = useState(false);

  const toggleDoor = () => {
    if (!showModal) {
      setIsOpen(!isOpen);

      // 문이 닫히면 이미지 변경
      if (isOpen) {
        console.log('문이 닫힙니다. 이미지가 변경됩니다.');
        setTimeout(() => setIsChanged(true)); // 애니메이션 후 이미지 변경
      }
    }
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
          <div
            className="door-front"
            style={{
              backgroundImage: isChanged ? `url(${brightLeftDoor})` : `url(${leftDoor})`,
            }}
          ></div>
          <div className="door-back"></div>
        </div>

        {/* 오른쪽 문 반쪽 */}
        <div className="door-right">
          <div
            className="door-front"
            style={{
              backgroundImage: isChanged ? `url(${brightRightDoor})` : `url(${rightDoor})`,
            }}
          ></div>
          <div className="door-back"></div>
        </div>

        {/* 배경 및 보상 아이콘 */}
        <div className="door-background">
          <span className="reward" onClick={openModal}>
            🎁
          </span>
        </div>
      </div>

      {/* 보상 모달 */}
      <Modal isOpen={showModal} onClose={closeModal}>
        <h2>Message from {message.sender}</h2>
        <p>{message.content}</p>
      </Modal>
    </div>
  );
};

export default Door;