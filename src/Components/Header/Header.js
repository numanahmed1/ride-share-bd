import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userInfoContext } from "../../App";
import "./Header.css";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userInfoContext);

  return (
    <Container>
      <Navbar className="header" expand="lg">
        <Navbar.Brand className="ride-logo">
          <Link to="/">
            Ride <span>Share</span> BD
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ride-nav-item ml-auto align-items-lg-center">
            <Nav.Link>
              <Link to="/home">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/destination">Destination</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/blog">Blog</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/contact">Contact</Link>
            </Nav.Link>
            <Nav.Link>
              <div className="nav-btn">
                {loggedInUser.name || loggedInUser.displayName ? (
                  loggedInUser.displayName || loggedInUser.name
                ) : (
                  <Link to="/login">Log In</Link>
                )}
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default Header;
