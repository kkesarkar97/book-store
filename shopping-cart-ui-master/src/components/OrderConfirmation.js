import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function OrderConfirmation({cart, customerDetails, onPlaceOrder}) {

    return (
        <Container>
            <Row className="flex-column border">
                <Col>
                    <Row className="p-1 mb-2 bg-warning font-weight-bold">
                        <Col xs={8}>Name</Col>
                        <Col xs={2}>Quantity</Col>
                        <Col xs={2}>Price</Col>
                    </Row>
                </Col>
                {
                    cart.items.map((item, index) =>
                        <Col key={index} id="item">
                            <Row className="p-1">
                                <Col xs={8} id="name">{item.book.name}</Col>
                                <Col xs={2} id="quantity">{item.quantity}</Col>
                                <Col xs={2} id="price">{item.book.price}</Col>
                            </Row>
                        </Col>
                    )
                }
                <Col className="text-right mt-4">
                    Total Price: <span id="totalPrice"
                                       className="font-weight-bold h4 text-danger">{cart.totalPrice}</span>
                </Col>
            </Row>

            <Row className="flex-column border my-4" id="customer">
                <Col className="p-1 mb-2 bg-warning font-weight-bold">Delivery Details</Col>
                <Col id="name">{customerDetails.name}</Col>
                <Col id="email">{customerDetails.email}</Col>
                <Col id="address">{customerDetails.address}</Col>
                <Col>
                    <Row>
                        <Col id="city" className="col-auto">{customerDetails.city}</Col>
                        <Col id="pincode" className="col-auto">{customerDetails.pincode}</Col>
                    </Row></Col>
                <Col id="country">{customerDetails.country}</Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-end">
                    <Button id="placeOrder" onClick={onPlaceOrder}>Place Order</Button>
                </Col>
            </Row>
        </Container>
    );

}

export default OrderConfirmation;
