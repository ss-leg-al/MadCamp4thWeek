// src/components/Ending.js
import React from 'react';
import './Ending.css';

// 이미지 파일을 정적으로 import
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';
import img6 from '../assets/6.png';
import img7 from '../assets/7.png';
import img8 from '../assets/8.png';
import img9 from '../assets/9.png';
import img10 from '../assets/10.png';
import img11 from '../assets/11.png';
import img12 from '../assets/12.png';
import img13 from '../assets/13.png';
import img14 from '../assets/14.png';
import img15 from '../assets/15.png';
import img16 from '../assets/16.png';
import img17 from '../assets/17.png';
import img18 from '../assets/18.png';
import img19 from '../assets/19.png';
import img20 from '../assets/20.png';

const Ending = () => {
  const credits = [
    { img: img1, description: '2025. 12. 26 (목)\n구노포차 삼치 ,,, 계산 하기 싫다 ,,, ' },
    { img: img2, description: '2025. 12. 27 (금)\n눈사람 만들고 카이스트 교수님께 따봉 받은 썰 푼다.' },
    { img: img3, description: '2025. 12. 30 (월)\n내게 사랑이 뭐냐고 물어본다면 ,,,' },
    { img: img4, description: '2025. 12. 31 (화)\n우리만의 소소한 연말&새해 파티 ' },
    { img: img5, description: '2025. 12. 31 (화)\n민우야 오빠한테 기대. 승재 오빠 어깨 넓당 .. ❤️' },
    { img: img6, description: '2025. 01. 01 (수)\n함께 보낸 2025년 새해 첫 날 ☀️❤️' },
    { img: img7, description: '2025. 01. 02 (목)\n침착하니까, 더 안전하게 ! 침착해 !!' },
    { img: img8, description: '2025. 01. 03 (금)\n지옥에서 온 딸기 시루 절망편️' },
    { img: img9, description: '2025. 01. 03 (금)\n카이스트가 믿는 ‘행복과 발전의 원동력’은 ‘오줌싸는 강아지’ - 우먼타임즈' },
    { img: img10, description: '2025. 01. 08 (수)\n저는 인공지능으로, 헬스 트레이너가 아닙니다.' },
    { img: img11, description: '2025. 01. 09 (목)\n3단계? 3단계? 3단계? 쫄? 쫄? 쫄?' },
    { img: img12, description: '2025. 01. 11 (토)\n윤지표 설빙 보은데이 >.<' },
    { img: img13, description: '2025. 01. 15 (수)\n아침에 ,,, 그녀의 이름으로 눈 뜨고 싶어 ...' },
    { img: img14, description: '2025. 01. 16 (목)\n️여우들의 비밀스런 걸스나잇 >< ❤️❤️❤️' },
    { img: img15, description: '2025. 01. 17 (금)\n꼼짝마! 두두두두두두두두시 ~' },
    { img: img16, description: '2025. 01. 17 (금)\n내가 이걸 왜 사줘야 해 ??' },
    { img: img17, description: '2025. 01. 17 (금)\n나 바람 좀 쐬고 올게' },
    { img: img18, description: '2025. 01. 21 (화)\n02대장 나현서 문신 진짜 없음' },
    { img: img19, description: '2025. 01. 21 (화)\n준명❤민우, 우리 사랑하게 됐어요 ...️' },
    { img: img20, description: '2025. 01. 22 (수)\nchill guy 박준호의 두근두근 첫 데이트' },
  ];
  const renderDescription = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="ending-container">
      {/* 두 번 렌더링하여 무한 반복 구현 */}
      <div className="credits">
        {credits.map((credit, index) => (
          <div className="credit-item" key={index}>
            <img src={credit.img} alt={`Credit ${index + 1}`} />
            <p>{renderDescription(credit.description)}</p>
          </div>
        ))}
        {credits.map((credit, index) => (
          <div className="credit-item" key={index + credits.length}>
            <img src={credit.img} alt={`Credit ${index + 1}`} />
            <p>{renderDescription(credit.description)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ending;