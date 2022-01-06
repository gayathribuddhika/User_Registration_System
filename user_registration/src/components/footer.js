import React from "react";
import {Navbar, Container} from 'react-bootstrap';

const Footer = () => {
  return (
    <div>
      <Navbar fixed="bottom" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand></Navbar.Brand>
        </Container>
      </Navbar>
      <br/>
    </div>
  );
}

export default Footer;
