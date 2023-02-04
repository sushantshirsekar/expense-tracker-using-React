import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <React.Fragment>
      <Navbar bg="secondary" expand="lg">
        <Container className="d-flex" fluid>
          <Nav className="me-auto px-4">
            <Nav.Item>
              <NavLink ><Link to="/" style={{color:'black', textDecoration:'none'}}>Home</Link></NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink ><Link to="/about" style={{color:'black', textDecoration:'none'}}>About</Link></NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink ><Link to="/signup" style={{color:'black', textDecoration:'none'}}>Login/Signup</Link></NavLink>
            </Nav.Item>
          </Nav>
          <Navbar.Brand className="mx-5" style={{ paddingLeft: "250px" }}>
            Expense Tracker
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        </Container>
      </Navbar>{" "}
    </React.Fragment>
  );
};

export default Navigation;
