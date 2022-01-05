import Image from "next/image";
import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  ButtonGroup,
  Tooltip,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import { useState } from "react";
import * as utility from "../scripts/utils";
import config from "../scripts/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

function TopNavbar() {
  const [isLogged, setLogged] = useState();
  const router = useRouter();

  const checkLogged = async () => {
    setLogged(await utility.check());
  };
  checkLogged();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    config.setToken("", true);
    router.push("/login");
    console.log("sloggato");
  };
  const handleLoginClick = (e) => {
    e.preventDefault();
    router.push("/login");
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    router.push("/login");
    console.log("signup");
  };

  const handleUserButton = async (e) => {
    e.preventDefault();
    const userId = await config.user();
    router.push(`/auth/user/${userId._id}`);
  };

  const authButton = () => {
    if (!isLogged) {
      return (
        <ButtonGroup>
          <Button variant="secondary" onClick={handleLoginClick}>
            Login
          </Button>
          <Button variant="secondary" onClick={handleSignUpClick}>
            Signup
          </Button>
        </ButtonGroup>
      );
    } else {
      return (
        <ButtonGroup
          style={{ justifyContent: "space-between", display: "flex" }}
        >
          <Button variant="secondary" onClick={handleUserButton}>
            <FontAwesomeIcon
              icon={faUserCircle}
              size="2x"
              title="Prova"              
              style={{ marginRight: "3px" }}
            />
          </Button>
          <Button variant="secondary" onClick={handleLogoutClick}>
            Logout
          </Button>
        </ButtonGroup>
      );
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      bg="light"
      variant="light"
      className="mb-3 d-flex justify-content-between"
    >
      <Navbar.Brand className="mx-3">
        <a href="/">
          <Image src="/img/logo.png" alt="" width="160px" height="69px" />
        </a>
      </Navbar.Brand>
      <Form className="mx-3">{authButton()}</Form>
    </Navbar>
  );
}

export default TopNavbar;
