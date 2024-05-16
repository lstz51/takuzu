// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import TakuzuGame from './components/TakuzuGame';
import SettingsPage from './components/SettingsPage';
import RulesPage from './components/RulesPage';
import ScoreboardPage from './components/ScoreboardPage';
import AuthentificationPage from './components/AuthentificationPage';
import AuthenticatedWrapper from './components/AuthenticatedWrapper';

const App = () => {
  return (
    <Router>
      <div>
        <AuthenticatedWrapper >
        <NavigationBar />
        <Routes>
          <Route path="/" element={<TakuzuGame />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/scoreboard" element={<ScoreboardPage />} />
          <Route path="/authentification" element={<AuthentificationPage />} />
        </Routes>
        </AuthenticatedWrapper>
      </div>
    </Router>
  );
};

export default App;
