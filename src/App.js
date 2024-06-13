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
import { ThemeProvider } from './components/ThemeContext';
import HomePage from './components/HomePage';
import TakuzuList from './components/TakuzuList';
import TakuzuGameList from './components/TakuzuGameList';

const App = () => {
  return (
    <ThemeProvider>
    <Router>
      <div>
        <AuthenticatedWrapper >
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/daily" element={<TakuzuGame />} />
          <Route path="/:id" element={<TakuzuGameList />} />
          <Route path="list" element={<TakuzuList />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/scoreboard" element={<ScoreboardPage />} />
          <Route path="/authentification" element={<AuthentificationPage />} />
        </Routes>
        </AuthenticatedWrapper>
      </div>
    </Router>
    </ThemeProvider>
  );
};

export default App;
