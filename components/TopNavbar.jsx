import React from "react";
import { Navbar, Form, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Navbar.module.css";
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
  }
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
    router.push("/signup");
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
          <Button
            className={styles.btn}
            variant="secondary"
            onClick={handleLoginClick}
          >
            Login
          </Button>
          <Button
            className={styles.btn}
            variant="secondary"
            onClick={handleSignUpClick}
          >
            Signup
          </Button>
        </ButtonGroup>
      );
    } else {
      return (
        <ButtonGroup
          style={{ justifyContent: "space-between", display: "flex" }}
        >
          <Button
            className={styles.btn}
            variant="secondary"
            onClick={handleUserButton}
          >
            <FontAwesomeIcon
              icon={faUserCircle}
              size="2x"
              title="Homepage utente"
              style={{ marginRight: "3px" }}
            />
          </Button>
          <Button
            className={styles.btn}
            variant="secondary"
            onClick={() => {
              router.push(`/auth/user/selection`);
            }}
          >
            <FontAwesomeIcon
              icon={faFileInvoice}
              size="2x"
              title="Homepage utente"
              style={{ marginRight: "3px" }}
            />
          </Button>
          <Button
            className={styles.btn}
            variant="secondary"
            onClick={handleLogoutClick}
          >
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
          <div className={styles.logo}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              width="40"
              fill="currentColor"
              className="bi bi-gem icon"
              viewBox="0 0 16 16"
            >
              <title>Privilege</title>
              <desc>
              </desc>
              <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z" />
            </svg><b>Privilege</b>
          </div>
        </Link>
      </Navbar.Brand>
      <Form className="mx-3">{authButton()}</Form>
    </Navbar>
  );
}

export default TopNavbar;
//<img src="/img/logo.png" alt="" width="160px" height="69px" />
