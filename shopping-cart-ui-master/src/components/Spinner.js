import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function Spinner() {
    return <Container fluid className="p-0">
        <Row className="flex-row justify-content-center">
            <Col sm="auto">
                <div className="spinner-border m-5" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </Col>
        </Row>
    </Container>;
};

export default Spinner;
