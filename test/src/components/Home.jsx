import React from 'react';
import './Home.css';

const Home = ({ onNext }) => {
  return (
    <div className="home">
      <h1>Welcome to Home</h1>
      <button onClick={onNext} className="next-button">
        Go to Advent Calendar
      </button>
    </div>
  );
};

export default Home;