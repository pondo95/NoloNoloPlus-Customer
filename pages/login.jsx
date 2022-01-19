import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../styles/Login.module.css";
import * as utility from "../scripts/utils";
import { useRouter } from "next/router";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  const handleChecked = () => {
    setChecked(!checked);
  }

   

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await utility.login(email, password, checked);
    if (result) {
      router.push("/");
    } else {
      alert("Credenziali errate");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="200"
              width="200"
              fill="currentColor"
              className="bi bi-gem icon"
              viewBox="0 0 16 16"
            >
              <title>Privilege</title>
              <desc>
              </desc>
              <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z" />
            </svg>
          </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="py-3" size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Check type="checkbox" label="Resta loggato" onChange={handleChecked}/>
        <Button className={styles.btn} variant="secondary" size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
