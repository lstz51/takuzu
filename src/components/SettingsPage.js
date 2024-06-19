import React, { useContext } from 'react';
import { Container, Form } from 'react-bootstrap';
import ThemeContext from './ThemeContext';

const SettingsPage = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <Container>
      <h1>Paramètres</h1>
      <Form>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Dark Mode"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
      </Form>
    </Container>
  );
};

export default SettingsPage;
