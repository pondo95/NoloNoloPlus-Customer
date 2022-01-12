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
    console.log(result);
    if (result) {
      router.push("/");
    } else {
      alert("Credenziali errate");
    }
  }

  return (
    <div className={styles.container}>
      <p>Esegui il login per iniziare ad acquistare</p>
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
        <Button size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
