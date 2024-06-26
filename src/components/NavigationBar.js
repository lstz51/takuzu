import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Takuzu Game</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/scoreboard">Classement</Nav.Link>
            <Nav.Link href="/settings">Paramètres</Nav.Link>
            <Nav.Link href="/rules">Règles</Nav.Link>
            <Nav.Link href="/authentification">Authentification</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
