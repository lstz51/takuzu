// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import TakuzuGame from './components/TakuzuGame';
import SettingsPage from './components/SettingsPage';
import RulesPage from './components/RulesPage';
import ScoreboardPage from './components/ScoreboardPage';

const App = () => {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<TakuzuGame />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/scoreboard" element={<ScoreboardPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
