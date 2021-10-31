import React from 'react';
import {Link, withRouter} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function BreadCrumb({location, history}) {

    function isBooks() {
        return location.pathname === '/books';
    }

    return <Row className="p-0">
        <Col className="">
            <Breadcrumb>
                <Breadcrumb.Item className="m-0" active={isBooks()}>{!isBooks()? <Link to={"/books"}>Books</Link> : "Books"}</Breadcrumb.Item>
                {!isBooks() && location.pathname.split("/").filter(p=>/^\D+$/.test(p))
                    .map((path, index)=><Breadcrumb.Item active key={index} className="text-capitalize">{path}</Breadcrumb.Item>)
                }
            </Breadcrumb>
        </Col>
    </Row>;
}

export default withRouter(BreadCrumb);
