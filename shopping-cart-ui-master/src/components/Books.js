import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import styles from './Books.module.css';
import {Link} from "react-router-dom";
import {urls} from '../config/env-config';
import Image from "react-bootstrap/Image";


class Books extends Component {

    constructor(props) {
        super(props);
        this.state = {books: [], pagination: [], url: urls.booksUrl};
    }

    async fetchBooks() {
        const res = await fetch(this.state.url);
        const json = await res.json();

        let books = json._embedded.books.map(c => {
            const {name, imageUrl, description, authors} = c;
            return {name, imageUrl, description, authors, url: c._links.self.href};
        });

        const {first, last, next, prev} = json._links;

        this.setState({pagination: {first, last, next, prev}, books});

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.url !== this.state.url) {
            this.fetchBooks();
        }
    }

    async componentDidMount() {
        await this.fetchBooks();
    }

    setUrl = (url) => {
        this.setState({url});
    };

    render() {
        const {first, last, next, prev} = this.state.pagination;
        return (
            <Container fluid>
                <Row>
                    <Col className="p-0">
                        <Pagination>
                            <Pagination.First disabled={!first}
                                              onClick={() => this.setUrl(first.href)}/>
                            <Pagination.Prev disabled={!prev}
                                             onClick={() => this.setUrl(prev.href)}/>
                            <Pagination.Ellipsis disabled/>
                            <Pagination.Next disabled={!next}
                                             onClick={() => this.setUrl(next.href)}/>
                            <Pagination.Last disabled={!last}
                                             onClick={() => this.setUrl(last.href)}/>
                        </Pagination>
                    </Col>
                </Row>
                <Row className="justify-content-around">
                    {
                        this.state.books.map(
                            (book, index) =>
                                <Col key={index} className={[styles.card, "m-2 m-sm-4 p-0 shadow d-inline-flex flex-column"]}>
                                    <Link to={{pathname: '/book', state: {url: book.url}}} className="mt-1 d-flex-inline">
                                        <Image src={book.imageUrl} className={styles.image}/>
                                    </Link>
                                    <span className="font-weight-bold justify-content-center text-center">{book.name}</span>
                                    <span
                                        className="text-muted justify-content-center text-center">{book.authors.join(',')}</span>
                                </Col>
                        )
                    }
                </Row>
            </Container>
        );
    }
}

export default Books;
