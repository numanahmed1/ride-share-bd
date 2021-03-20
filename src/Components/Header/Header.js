import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userInfoContext } from "../../App";
import "./Header.css";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userInfoContext);

  return (
    <Container>
      <Navbar className="header">
        <Navbar.Brand className="ride-logo">
          <Link to="/">Ride Share BD</Link>
        </Navbar.Brand>
        <Nav className="ride-nav-item ml-auto">
          <Link to="/home">Home</Link>
          <Link to="/destination">Destination</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          <div>
            {loggedInUser.name || loggedInUser.displayName ? (
              loggedInUser.displayName || loggedInUser.name
            ) : (
              <Link to="/login">Log In</Link>
            )}
          </div>
        </Nav>
      </Navbar>
    </Container>
  );
};

export default Header;
