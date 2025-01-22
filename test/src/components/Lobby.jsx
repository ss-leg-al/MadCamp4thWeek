import React, { useState } from 'react';
import axios from 'axios';
import './Lobby.css';

const Lobby = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [dialogue, setDialogue] = useState(`안녕하세요, 저는 조성제입니다.
    체크인 도와드리겠습니다.`);
  const [dialogueClass, setDialogueClass] = useState('dialogue'); // 대사 애니메이션 클래스
  const [loginContainerClass, setLoginContainerClass] = useState('login-container'); // 로그인 컨테이너 애니메이션 클래스

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://143.248.194.28:3000/api/users/login', {
        name: username,
        password,
      });

      const { user } = response.data;
      sessionStorage.setItem('username', user.name);
      sessionStorage.setItem('messages', JSON.stringify(user.messages));

      setLoginContainerClass('login-container fade-out');
      setTimeout(() => {
        setShowLogin(false); // 로그인 폼 숨김
        setDialogueClass('dialogue fade-out');
        setTimeout(() => {
          setDialogue(`편안한 숙박 되세요, 
            필요하신 사항은 언제든 말씀해 주세요.`);
          setDialogueClass('dialogue fade-in');
        }, 500);
      }, 500);

      setTimeout(() => {
        onLoginSuccess(); // 다음 페이지로 전환
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  const handleShowLogin = () => {
    setDialogueClass('dialogue fade-out');
    setTimeout(() => {
      setShowLogin(true);
      setLoginContainerClass('login-container fade-in');
    }, 500);
  };

  return (
    <div className="lobby" onClick={handleShowLogin}>
      <div className={loginContainerClass}>
        {!showLogin ? (
          <div className={dialogueClass}>
            {dialogue.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="login-dialogue">
              <p>고객님 성함과 예약 코드를 알려 주시겠습니까?</p>
            </div>
            <div className="form-group1">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="성함을 입력해주세요"
              />
            </div>
            <div className="form-group2">
              <input
                type="text"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="예약코드를 입력해주세요"
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="login-button">
              Check-in
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Lobby;