import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";

const Checkout = ({name, email, address, city, pincode, country, updateCustomerDetails}) => {

    const customerDetails = {name, email, address, city, pincode, country};
    return (
        <Container>
            <Form>
                <Form.Group controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder="Firstname Lastname" value={customerDetails.name}
                                  onChange={(e) => updateCustomerDetails({...customerDetails, name: e.target.value})}/>
                </Form.Group>

                <Form.Group controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={customerDetails.email}
                                  onChange={(e) => updateCustomerDetails({...customerDetails, email: e.target.value})}/>
                </Form.Group>


                <Form.Group controlId="formGridAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" value={customerDetails.address}
                                  onChange={(e) => updateCustomerDetails({...customerDetails, address: e.target.value})}/>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control value={customerDetails.city} onChange={(e) => updateCustomerDetails({...customerDetails, city: e.target.value})}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control as="select" value={customerDetails.country}
                                      onChange={(e) => updateCustomerDetails({...customerDetails, country: e.target.value})}>
                            <option>Choose...</option>
                            <option>India</option>
                            <option>UK</option>
                            <option>US</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPincode">
                        <Form.Label>Pin Code</Form.Label>
                        <Form.Control value={customerDetails.pincode} onChange={(e) => updateCustomerDetails({...customerDetails, pincode: e.target.value})}/>
                    </Form.Group>
                </Form.Row>
                <Link to={"/orderConfirmation"}>
                    <Button variant="primary">
                        To Order Confirmation
                    </Button>
                </Link>
            </Form>
        </Container>
    );
}

export default Checkout;
