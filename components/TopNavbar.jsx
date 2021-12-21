import Image from "next/image";
import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import Link from "next/link";

function TopNavbar() {
  let currentUser = true;
  let history = useRouter();

  const handleLogoutClick = () => {
    currentUser = false;
    history("/login");
  };
  const authButton = () => {
    if (currentUser) {
      return (
        <ButtonGroup>
          <Button variant="secondary">Login</Button>
          <Button variant="secondary">Signup</Button>
        </ButtonGroup>
      );
    } else {
      return (
        <Button variant="secondary" onClick={handleLogoutClick}>
          Logout
        </Button>
      );
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      bg="light"
      variant="light"
      className="mb-3"
    >
      <Navbar.Brand className="mx-3">
        <a href="/">
          <Image src="/img/logo.png" alt="" width="160px" height="69px" />
        </a>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>Discover</Nav.Link>
          <Nav.Link>Plays</Nav.Link>
          <NavDropdown title="Collection" id="collasible-nav-dropdown">
            <NavDropdown.Item>Owned</NavDropdown.Item>
            <NavDropdown.Item>Wishlist</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      <Form inline className="mx-3">
        {authButton()}
      </Form>
    </Navbar>
  );
}

export default TopNavbar;
