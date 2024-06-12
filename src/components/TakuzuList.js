// src/TakuzuList.js
import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TakuzuList = () => {
  const takuzuCount = 14;

  return (
    <Container>
      <h1>Liste des Takuzus</h1>
      <ListGroup>
        {[...Array(takuzuCount)].map((_, index) => (
          <ListGroup.Item key={index}>
            <Link to={`/${index + 1}`}>Takuzu {index + 1}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default TakuzuList;
