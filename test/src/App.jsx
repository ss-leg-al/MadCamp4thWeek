import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdventCalendar from './components/AdventCalendar';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/calendar">Advent Calendar</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<AdventCalendar />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;