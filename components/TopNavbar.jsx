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
import { useEffect } from "react";

function TopNavbar() {
  const [isLogged, setLogged] = useState();
  const router = useRouter();
  const [userID, setUserID] = useState();

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
        <div style={{justifyContent: "space-between", display: "flex" }}>
              <FontAwesomeIcon
                icon={faUserCircle}
                size="2x"
                title="Prova"
                onClick={()=>{router.push(`/auth/user/${userID}`)}}
                style={{ marginRight: "3px" }}
              />
          <Button variant="secondary" onClick={handleLogoutClick}>
            Logout
          </Button>
        </div>

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
