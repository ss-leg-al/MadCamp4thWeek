import React, { useState } from 'react';
import axios from 'axios';
import './Lobby.css';

const Lobby = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showLogin, setShowLogin] = useState(false); // 대사와 로그인 폼 표시 상태

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

      onLoginSuccess();
      alert('Login successful!');
      setError('');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="lobby" onClick={() => setShowLogin(true)}>
      <div className="login-container">
        {showLogin ? (
          <form onSubmit={handleLogin}>
            <div className="form-group1">
              <label htmlFor="username">성함</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="성함을 입력해주세요"
              />
            </div>
            <div className="form-group2">
              <label htmlFor="password">예약번호</label>
              <input
                type="text"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="예약번호를 입력해주세요"
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="login-button">
              체크인 하기
            </button>
          </form>
        ) : (
          <div className="dialogue">
            <p>안녕하세요, 저는 조성제입니다.<br />체크인 도와드리겠습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lobby;