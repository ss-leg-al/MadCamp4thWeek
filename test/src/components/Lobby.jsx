import React, { useState } from 'react';
import axios from 'axios'; // Axios 가져오기
import './Lobby.css';

const Lobby = ({ onLoginSuccess }) => { // 부모 컴포넌트에서 onLoginSuccess를 받음
  const [username, setUsername] = useState(''); // 사용자 이름 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const [error, setError] = useState(''); // 오류 메시지 상태

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 백엔드 API 호출
      const response = await axios.post('http://143.248.194.28:3000/api/users/login', {
        name: username, // 백엔드에서 요구하는 필드 이름에 맞춤
        password,
      });

      // 로그인 성공 처리
      const { user } = response.data; // 응답 데이터에서 사용자 정보 추출
      sessionStorage.setItem('username', user.name); // 세션 스토리지에 사용자 이름 저장
      sessionStorage.setItem('messages', JSON.stringify(user.messages)); // 세션 스토리지에 메시지 저장

      onLoginSuccess(); // 부모 컴포넌트에 성공 알림
      alert('Login successful!');
      console.log('User Info:', user); // 응답 데이터 출력
      setError(''); // 오류 메시지 초기화
    } catch (err) {
      // 오류 처리
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // 서버에서 보낸 에러 메시지 출력
      } else {
        setError('An unknown error occurred.'); // 서버 응답 없음 또는 기타 에러
      }
    }
  };

  return (
    <div className="lobby">
      <div className="login-container">
        <h1>a</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="error">{error}</p>} {/* 오류 메시지 출력 */}
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Lobby;