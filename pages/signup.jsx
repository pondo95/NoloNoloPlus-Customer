import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import SpinnerLoad from "../components/SpinnerLoad";
import * as utils from "../scripts/utils";
import api from "../scripts/api";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";

function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState();
  const [image, setImage] = useState();
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    loginInfo: {
      username: "",
      email: "",
      password: "",
    },
    address: {
      country: "",
      city: "",
      zipcode: "",
      streetAddress: "",
    },
    dateOfBirth: "",
  });
  useEffect(async () => {
    if (await utils.check()) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, []);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlerImage = (e) => {
    //setImage(e.target.files[0]);
    console.log(e);
    setImage(e.target.files[0]);
  };
  const createCustomer = async (e) => {
    e.preventDefault();
    console.log("qui");
    if (customer.loginInfo.password == confirmPassword) {
      try {
        const formData = new FormData();
        formData.append("firstname", customer.firstname);
        formData.append("lastname", customer.lastname);
        formData.append("loginInfo[username]", customer.loginInfo.username);
        formData.append("loginInfo[email]", customer.loginInfo.email);
        formData.append("loginInfo[password]", customer.loginInfo.password);
        formData.append("address[country]", customer.address.country);
        formData.append("address[city]", customer.address.city);
        formData.append("address[zipcode]", customer.address.zipcode);
        formData.append(
          "address[streetAddress]",
          customer.address.streetAddress
        );
        formData.append("dateOfBirth", new Date().toJSON());
        formData.append("profilePicture", image);
        console.log(customer.loginInfo);
        setLoading(true);
        await api.customers.post(formData);
        setLoading(false);
        console.log("Richiesta inviata");
        alert("Richiesta inviata");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Le password inserite non corrispondono");
    }
  };

  return (
    <Container>
      <h3 className="sub-title">Inserisci le tue info per la registrazione</h3>
      <br />
      {!loading ? (
        <Form id="formSignUp" onSubmit={createCustomer}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label htmlFor="username" column sm={2}>
              Username
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                required
                id="username"
                type="text"
                value={customer.loginInfo.username}
                placeholder="Username"
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    loginInfo: {
                      ...customer.loginInfo,
                      username: e.target.value,
                    },
                  })
                }
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label htmlFor="name" column sm={2}>
              Nome
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                id="name"
                type="text"
                value={customer.firstname}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    firstname: e.target.value,
                  })
                }
                placeholder="Name"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label htmlFor="surname" column sm={2}>
              Cognome
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                id="surname"
                type="text"
                value={customer.lastname}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    lastname: e.target.value,
                  })
                }
                placeholder="Surname"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label htmlFor="birth" column sm={2}>
              Data di Nascita
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                id="Birth"
                type="date"
                required
                value={customer.dateOfBirth}
                onChange={(e) => {
                  const data = new Date(e.target.value).toJSON();
                  console.log(data);
                  setCustomer({
                    ...customer,
                    dateOfBirth: e.target.value,
                  });
                }}
                placeholder="Birth"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label htmlFor="email" column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                required
                id="email"
                type="text"
                value={customer.loginInfo.email}
                placeholder="Email"
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    loginInfo: { ...customer.loginInfo, email: e.target.value },
                  })
                }
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label htmlFor="password" column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                id="password"
                type="password"
                value={customer.loginInfo.password}
                required
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    loginInfo: {
                      ...customer.loginInfo,
                      password: e.target.value,
                    },
                  })
                }
                placeholder="Password"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label htmlFor="confirmPassword" column sm={2}>
              Conferma Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Conferma Password"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label htmlFor="residence" column sm={2}>
              Nazione
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                id="country"
                type="text"
                value={customer.address.country}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    address: { ...customer.address, country: e.target.value },
                  })
                }
                placeholder="Nazione"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label htmlFor="city" column sm={2}>
              Città
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                id="city"
                type="text"
                value={customer.address.city}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    address: { ...customer.address, city: e.target.value },
                  })
                }
                placeholder="Citta'"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label htmlFor="zip" column sm={2}>
              Zip
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                id="zip"
                type="text"
                value={customer.address.zipcode}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    address: { ...customer.address, zipcode: e.target.value },
                  })
                }
                placeholder="Codice Postale"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label htmlFor="streetAddress" column sm={2}>
              Indirizzo
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                id="streetAddress"
                type="text"
                value={customer.address.streetAddress}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    address: {
                      ...customer.address,
                      streetAddress: e.target.value,
                    },
                  })
                }
                placeholder="Indirizzo"
              />
            </Col>
          </Form.Group>

          <Form id="formImage">
            <Form.Group as={Row} className="mb-3 align-content-center">
              <Form.Label htmlFor="image" column sm={2}>
                Immagine
              </Form.Label>
              <Col sm={8} className="align-self-center">
                <Form.Control required type="file" onChange={handlerImage} />
              </Col>
            </Form.Group>
          </Form>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button
                className={styles.btn}
                variant="secondary"
                type="submit"
                onClick={createCustomer}
              >
                Salva
              </Button>
            </Col>
          </Form.Group>
        </Form>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SpinnerLoad />
        </div>
      )}
    </Container>
  );
}

export default SignUp;
