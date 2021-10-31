import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Spinner from "./Spinner";


class Book extends Component {


    constructor(props) {
        super(props);
        this.state = {book: {authors: []}}
    }

    setBook = (book) => {
        this.setState({book, isLoading: false});
    };

    fetchBook = async () => {
        this.setState({isLoading: true});
        const res = await fetch(this.props.location.state.url);
        const json = await res.json();
        delete json._links;
        this.setBook(json);
    };

    async componentDidMount() {
        await this.fetchBook();
    };

    render() {

        const book = this.state.book;
        return (
            this.state.isLoading ? <Spinner/> :
            <Container fluid className="p-0">
                <Row className="flex-row justify-content-center">
                    <Col xs="4" sm="auto">
                        <Image src={book.imageUrl} className="p-2"/>
                    </Col>
                    <Col xs="8" sm="auto">
                        <Container>
                            <Row className="flex-column">
                                <Col className="m-1"><h3>{book.name}</h3></Col>
                                <Col className="m-1">{book.authors.join(',')}</Col>
                                <Col className="m-1"><b className="text-danger">Rs {book.price} </b> </Col>
                                <Col className="m-1"><Badge variant="secondary">Available</Badge> </Col>
                                <Col className="m-1">{book.id &&
                                <Button onClick={() => this.props.onAddToCart(book.id)}>Add to
                                    Cart</Button>}</Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col className="m-2">
                        {book.description}
                    </Col>
                </Row>

            </Container>
        );
    }

}

export default Book;
