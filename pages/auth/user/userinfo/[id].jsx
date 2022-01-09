import { Container, Form, Col, Row, Image, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import SpinnerLoad from "../../../../components/SpinnerLoad";
import config from "../../../../scripts/config";
import api from "../../../../scripts/api";
import * as utils from "../../../../scripts/utils";
import { useRouter } from "next/router";

function UserProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      console.log('qui');
      const _user = await config.user();
      setCustomer(_user);
      setConfirmPassword(_user.loginInfo.password);
      setImage(await api.toServerImageUrl(_user.profilePicture));
      setLoading(false);
    };
    fetchData();
  }, []);

  const updateCustomer = async () => {
    if (customer.loginInfo.password == confirmPassword) {
      try {
        await api.customers.patchSingle(customer._id, customer);
        alert("Informazioni aggiornate");
        router.reload();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Le password inserite non corrispondono");
    }
  };

  return (
    <Container>
      <h3 className="sub-title">Modifica le tue informazioni</h3>
      {!loading ? (
        <Form>
          <Form.Group as={Row} className="mb-3 align-content-center">
            <Form.Label
              htmlFor="avatar"
              column
              sm={2}
              className="align-self-center"
            >
              Avatar
            </Form.Label>
            <Col sm={3}>
              <Image fluid alt="Avatar del profilo" src={image} roundedCircle />
            </Col>
            <Col sm={8} className="align-self-center"></Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label htmlFor="username" column sm={2}>
              Username
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                disabled
                id="username"
                type="text"
                value={customer.loginInfo.username}
                placeholder="Username"
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
            <Form.Label htmlFor="email" column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                id="email"
                disabled
                type="text"
                value={customer.loginInfo.email}
                placeholder="Email"
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
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    loginInfo: {...customer.loginInfo, password: e.target.value }
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
                placeholder="Confirm Password"
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
                placeholder="Codice Postale"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button onClick={updateCustomer}>Salva</Button>
            </Col>
          </Form.Group>
        </Form>
      ) : (
        <SpinnerLoad />
      )}
    </Container>
  );
}

export default UserProfile;
