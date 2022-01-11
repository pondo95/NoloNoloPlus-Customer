import React from "react";
import {
  Navbar,
  Form,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import { useState} from "react";
import styles from "../styles/Navbar.module.css"
import * as utility from "../scripts/utils";
import config from "../scripts/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function TopNavbar() {
  
  const [isLogged, setLogged] = useState();
  const router = useRouter();

  async function checkLogged() {
    setLogged(await utility.check());
  };
  checkLogged();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    config.logout();
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
    console.log(userId);
    router.push(`/auth/user/userinfo/${userId._id}`);
  };

  const authButton = () => {
    if (!isLogged) {
      return (
        <ButtonGroup>
          <Button className={styles.btn} variant="secondary" onClick={handleLoginClick}>
            Login
          </Button>
          <Button className={styles.btn} variant="secondary" onClick={handleSignUpClick}>
            Signup
          </Button>
        </ButtonGroup>
      );
    } else {
      return (
        <ButtonGroup
          style={{ justifyContent: "space-between", display: "flex" }}
        >
          <Button className={styles.btn} variant="secondary" onClick={handleUserButton}>
            <FontAwesomeIcon
              icon={faUserCircle}
              size="2x"
              title="Homepage utente"              
              style={{ marginRight: "3px" }}
            />
          </Button>
          <Button className={styles.btn} variant="secondary" onClick={()=>{router.push(`/auth/user/selection`)}}>
            <FontAwesomeIcon
              icon={faFileInvoice}
              size="2x"
              title="Homepage utente"              
              style={{ marginRight: "3px" }}
            />
          </Button>
          <Button className={styles.btn} variant="secondary" onClick={handleLogoutClick}>
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
      variant="light"
      className={`d-flex justify-content-between ${styles.myNavbar}`}
    >
      <Navbar.Brand className="mx-3">
        <Link href="/">
          <img src="/img/logo.png" alt="" width="160px" height="69px" />
        </Link>
      </Navbar.Brand>
      <Form className="mx-3">{authButton()}</Form>
    </Navbar>
  );
}

export default TopNavbar;
