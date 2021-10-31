import {Link, withRouter} from "react-router-dom";
import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


function Header({cart, location}) {

    return <Container fluid className="bg-dark fixed-top mb-4">
        <Row className="justify-content-between">
            <Col className="col-auto"><Link to={"/books"} className="text-decoration-none"><h4 className="text-warning p-2">Book Shop</h4></Link></Col>
            <Col className="col-auto">
                <Link to={`/cart/${cart.id}`} className="text-decoration-none"><h5
                className="text-warning p-2 align-self-center">Cart ({cart.items.length})</h5></Link>
            </Col>
        </Row>
    </Container>;
}

export default withRouter(Header);
