import React from 'react';
import Cart from "./Cart";
import {shallow} from "enzyme";
import Image from "react-bootstrap/Image";

describe("cart compoment", () => {

    const cart = {
        id: 1,
        items: [
            {
                book: {
                    id: 1,
                    name: 'b1',
                    imageUrl: 'http://b1',
                    price: 100
                },
                quantity: 2
            },
            {
                book: {
                    id:2,
                    name: 'b2',
                    imageUrl: 'http://b2',
                    price: 200
                },
                quantity: 1
            }
        ],
        totalPrice:400
    }

    it("should render a cart with items", () => {
        const wrapper = shallow(<Cart cart={cart}></Cart>);
        expect(wrapper.find('#item')).toHaveLength(2);
        expect(wrapper.find('#name').at(0).text()).toBe('b1');
        expect(wrapper.find('#quantity').at(0).text()).toBe("2");
        expect(wrapper.find('#price').at(0).text()).toBe("100");
        expect(wrapper.find(Image).at(0).prop('src')).toBe('http://b1');

    });
    it("should calculate total price",()=>{
        const wrapper = shallow(<Cart cart={cart}></Cart>);
        expect(wrapper.find('#totalPrice').text()).toBe('400');

    });
    it("should render an empty cart", ()=>{
        const wrapper = shallow(<Cart cart={{items:[]}}></Cart>);
        expect(wrapper.text()).toBe('No items in the cart yet.');
    });
    it("should trigger add to cart", ()=>{
        const addToCart = jest.fn();
        const wrapper = shallow(<Cart cart={cart} addToCart={addToCart}></Cart>);

        wrapper.find("#addToCart").at(0).simulate('click');

        expect(addToCart).toHaveBeenCalledWith(1);


    });
    it("should trigger remove from cart", ()=>{
        const removeFromCart = jest.fn();
        const wrapper = shallow(<Cart cart={cart} removeFromCart={removeFromCart}></Cart>);

        wrapper.find("#removeFromCart").at(0).simulate('click');

        expect(removeFromCart).toHaveBeenCalledWith(1);

    });

});
