import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './pages/Calendar';
import Tasks from './pages/Tasks';

function App() {
  return (
    <Router>
      <div>
        <nav style={{ marginBottom: '20px' }}>
          <a href="/" style={{ marginRight: '10px' }}>カレンダー</a>
          <a href="/tasks">課題管理</a>
        </nav>

        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
