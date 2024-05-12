import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import './TakuzuGame.css';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Code pour sauvegarder le choix de l'utilisateur dans le stockage local ou les préférences utilisateur
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <Container>
      <h1>Settings</h1>
      <Form>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Dark Mode"
          checked={darkMode}
          onChange={handleToggleDarkMode}
        />
      </Form>
    </Container>
  );
};

export default SettingsPage;
