// src/HomePage.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Bienvenue sur le Takuzu</h1>
      <Row>
        <Col>
          <Button onClick={() => navigate('/daily')}>Takuzu du Jour</Button>
        </Col>
        <Col>
          <Button onClick={() => navigate('/list')}>Liste des Takuzus</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
