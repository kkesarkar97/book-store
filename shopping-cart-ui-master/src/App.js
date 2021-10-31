import React, {Component} from 'react';
import {Route, withRouter} from "react-router-dom";
import Books from "./components/Books";
import Book from "./components/Book";
import Cart from "./components/Cart";
import {urls} from './config/env-config';
import {fetchData} from "./utils/Fetch";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import BreadCrumb from "./components/BreadCrumb";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import Order from "./components/Order";


const initialCartState = {items: []};
var initialCustomerDetailsState = {name: '', email: '', address: '', city: '', pincode: '', country: ''};

export class App extends Component {

    constructor(props) {
        super(props);
        this.state = {cart: initialCartState, customerDetails: initialCustomerDetailsState};
    }



    async componentDidMount() {
        let id = this.getCartId();
        const response = await fetchData(`${urls.cartUrl}/${id}`);
        const cart = response.status === 200 ? response.data : {...initialCartState, id};

        this.setState({cart});
    }

    getCartId() {
        let id = localStorage.getItem("cartId");
        if (!id) {
            id = new Date().getTime();
            localStorage.setItem("cartId", id);
        }
        return id;
    }

    addToCart = async (id) => {
        const response = await fetch(`${urls.cartUrl}/${this.state.cart.id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id})
        });
        const cart = await response.json();
        this.setState({cart});
    };

    removeFromCart = async (id) => {
        const response = await fetch(`${urls.cartUrl}/${this.state.cart.id}/items/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const cart = await response.json();
        this.setState({cart});
    };

    updateCustomerDetails = (customerDetails) => {
        this.setState({customerDetails})
    };

    placeOrder = async () => {
        const response = await fetch(`${urls.orderUrl}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({cart: this.state.cart, customerDetails: this.state.customerDetails})
        });
        const order = await response.json();

        this.setState({order, cart: {...initialCartState, id:this.getCartId()}})

        this.props.history.push('/orderStatus');

    };

    render() {
        return (
            <Container fluid className="p-0">
                <Header cart={this.state.cart}/>
                <div className="h-100"><br/><br/></div>
                <BreadCrumb/>
                <Route path="/books" component={Books}/>
                <Route path="/book" render={(props) =>
                    <Book {...props} onAddToCart={this.addToCart}/>}/>
                <Route path="/cart" render={(props) =>
                    <Cart cart={this.state.cart} addToCart={this.addToCart} removeFromCart={this.removeFromCart}/>}/>
                <Route path="/checkout" render={(props) =>
                    <Checkout {...this.state.customerDetails} updateCustomerDetails={this.updateCustomerDetails}/>}/>
                <Route path="/orderConfirmation" render={(props) =>
                    <OrderConfirmation cart={this.state.cart} customerDetails={this.state.customerDetails}
                                       onPlaceOrder={this.placeOrder}/>}/>
                <Route path="/orderStatus" render={(props) => <Order {...props} order={this.state.order}/>}/>
            </Container>
        );
    }
}

export default withRouter(App);
