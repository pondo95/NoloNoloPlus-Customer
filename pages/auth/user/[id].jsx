import {
    Container,
    Form,
    Col,
    Row,
    Image,
    Button,
} from "react-bootstrap"
import { useState } from "react";
import SpinnerLoad from "../../../components/SpinnerLoad"

function userProfile(){
    const [loading, setLoading] = useState(true);
    const [cust,setCustomer] = useState();

    const updateCustomer = () => {
        console.log("Ciao");
    }

    const changeHandler = () => {
        console.log("Ciao");
    }

    let customer = {
        username: "username",
        address:{
            residence: "residence",
        }
    }

    return(
    <Container className="containerSM">
            <h2 className="title">
                Profilo
                </h2>
            <h3 className="sub-title">
                Modifica le tue informazioni
                </h3>
            {loading ?
                (<Form onSubmit={updateCustomer}>
                    <Form.Group as={Row} className="mb-3 align-content-center" controlId="username">
                        <Form.Label htmlFor='avatar' column sm={2} className="align-self-center">
                            Avatar
                        </Form.Label>
                        <Col sm={2}>
                            <Image fluid alt='Avatar del profilo' src="" roundedCircle />
                        </Col>
                        <Col sm={8} className='align-self-center'>
                            <Form.Control
                                id="avatar"
                                type="file"
                                onChange={changeHandler}    
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="username">
                        <Form.Label htmlFor='username' column sm={2}>
                            Username
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control id="username" type="text" value={customer.username} onChange={(e) => setCustomer({...customer, username: e.target.value})} placeholder="Username"/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="name" >
                        <Form.Label htmlFor='name' column sm={2}>
                            Nome
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control id="name" type="text" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} placeholder="Name" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="surname">
                        <Form.Label htmlFor='surname' column sm={2}>
                            Cognome
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control id="surname" type="text" value={customer.surname} onChange={(e) => setCustomer({ ...customer, surname: e.target.value })} placeholder="Surname"/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="password">
                        <Form.Label htmlFor="password" column sm={2}>
                            Password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control id='password' type="password" value={customer.password} onChange={(e) => setCustomer({ ...customer, password: e.target.value })} placeholder="Password" />
                        </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row} className="mb-3" controlId="password">
                        <Form.Label htmlFor='residence' column sm={2}>
                            Residenza
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control id="residence" type="text" value={customer.address.residence} onChange={(e) => setCustomer({ ...customer, address: {...customer.address, residence: e.target.value }})} placeholder="Residenza" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="city">
                        <Form.Label htmlFor='city' column sm={2}>
                            Città
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control id="city" type="text" value={customer.address.city} onChange={(e) => setCustomer({ ...customer, address: { ...customer.address, city: e.target.value } })} placeholder="Citta'" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="password">
                        <Form.Label htmlFor='zip' column sm={2}>
                            Zip
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control id="zip" type="text" value={customer.address.zip} onChange={(e) => setCustomer({ ...customer, address: { ...customer.address, zip: e.target.value } })} placeholder="City" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button type="submit">Aggiorna profilo</Button>
                        </Col>
                    </Form.Group>
                </Form>
                ) : (<SpinnerLoad/>)}
        </Container>
    )
}

export default userProfile;