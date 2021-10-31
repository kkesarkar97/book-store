import React, {Fragment} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from './Cart.module.css';
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Link} from "react-router-dom";

const Cart = ({cart, addToCart, removeFromCart}) => {

    return (
        <Container fluid className={[styles.container, "p-0"]}>
            {
                cart.items.map((item, index) =>
                    <Row id="item" key={index} className="m-2 m-sm-4 shadow border">
                        <Col className="p-0 col-auto"><Image className={styles.image} src={item.book.imageUrl}/></Col>
                        <Col className="p-0">
                            <Row className={"flex-column m-1"}>
                                <Col><h5 id="name">{item.book.name}</h5></Col>
                                <Col className="mt-2">Quantity:&nbsp;
                                    <ButtonGroup className="m-0" aria-label="First group">
                                        <Button size="sm" id="removeFromCart" variant="warning"
                                                onClick={() => removeFromCart(item.book.id)}>-</Button>
                                        <Button size="sm" id="quantity" disabled variant="">{item.quantity}</Button>
                                        <Button size="sm" id="addToCart" variant="warning"
                                                onClick={() => addToCart(item.book.id)}>+</Button>
                                    </ButtonGroup>
                                </Col>
                                <Col className="mt-2">Price: <b className="text-danger" id="price">{item.book.price}</b></Col>
                            </Row>
                        </Col>
                    </Row>
                )
            }
            {
                cart.items.length > 0 ?
                    <Fragment>
                        <Row>
                            <Col className="d-flex justify-content-end">
                                <h3>
                                    Total Price
                                    : <span
                                    id="totalPrice">{cart.totalPrice}</span>
                                </h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-end">
                                <Link to={"/checkout"}><Button>Checkout</Button></Link>
                            </Col>
                        </Row>
                    </Fragment>
                    :
                    <div>No items in the cart yet.</div>
            }

        </Container>
    );

};

export default Cart;
