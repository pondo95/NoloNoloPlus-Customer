import { Container, Form, Col, Row, Image, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import SpinnerLoad from "../../../components/SpinnerLoad";
import config from "../../../scripts/config";
import api from "../../../scripts/api";

function userProfile() {
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState();
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const _user = await config.user();
      setCustomer(_user);
      setUsername(_user.loginInfo.username);
      setName(_user.firstname)
      setSurname(_user.lastname)
      setPassword(_user.loginInfo.password)
      setAddress(_user.address)
      setImage(await api.toServerImageUrl(_user.profilePicture))
      setLoading(false);
    };
    fetchData();
    console.log(customer);
  }, [customer]);

  const updateCustomer = () => {
    console.log("Ciao");
  };


  return (
    <Container>
      <h3 className="sub-title">Modifica le tue informazioni</h3>
      {!loading ? (
        <Form onSubmit={updateCustomer}>
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
                id="username"
                type="text"
                value={username}
                onChange={(e) =>
                  setCustomer({ ...customer, username: e.target.value })
                }
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
                value={name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
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
                value={surname}
                onChange={(e) =>
                  setCustomer({ ...customer, surname: e.target.value })
                }
                placeholder="Surname"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" >
            <Form.Label htmlFor="password" column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setCustomer({ ...customer, password: e.target.value })
                }
                placeholder="Password"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" >
            <Form.Label htmlFor="password" column sm={2}>
              Conferma Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setCustomer({ ...customer, password: e.target.value })
                }
                placeholder="Password"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" >
            <Form.Label htmlFor="residence" column sm={2}>
              Nazione
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                id="country"
                type="text"
                value={address.country}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    address: { ...customer.address, residence: e.target.value },
                  })
                }
                placeholder="Nazione"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" >
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
                value={address.zipcode}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    address: { ...customer.address, zip: e.target.value },
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
                value={address.streetAddress}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    address: { ...customer.address, zip: e.target.value },
                  })
                }
                placeholder="Codice Postale"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Salva</Button>
            </Col>
          </Form.Group>
        </Form>
      ) : (
        <SpinnerLoad />
      )}
    </Container>
  );
}

export default userProfile;
