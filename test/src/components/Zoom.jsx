import React from 'react';
import './Zoom.css';
import zoomDoorImage from '../assets/zoom-door.png'; // 이미지 import

const Zoom = ({ onClickNext }) => {
  return (
    <div className="zoom">
      <div className="zoom-door-container" onClick={onClickNext}>
        <img src={zoomDoorImage} alt="Zoom Door" className="zoom-door" />
      </div>
    </div>
  );
};

export default Zoom;