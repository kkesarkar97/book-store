import {shallow} from "enzyme";
import React from "react";
import OrderConfirmation from "./OrderConfirmation";

describe("Order Confirmation component", () => {


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
                    id: 2,
                    name: 'b2',
                    imageUrl: 'http://b2',
                    price: 200
                },
                quantity: 1
            }
        ],
        totalPrice:400
    };
    const customerDetails = {
        name: 'name1',
        email: 'email1',
        address: 'address1',
        city: 'city1',
        pincode: 'pincode1',
        country: 'India'
    };

    const onPlaceOrder = jest.fn();

    const wrapper = shallow(<OrderConfirmation cart={cart} customerDetails={customerDetails} onPlaceOrder={onPlaceOrder} />);

    it("should display cart details", ()=>{

        expect(wrapper.find('#item')).toHaveLength(2);
        expect(wrapper.find('#item').at(0).find('#name').text()).toBe('b1');
        expect(wrapper.find('#item').at(0).find('#quantity').text()).toBe("2");
        expect(wrapper.find('#item').at(0).find('#price').text()).toBe("100");
        expect(wrapper.find('#totalPrice').text()).toBe("400");

    });

    it("should display customer details", ()=>{
        expect(wrapper.find('#customer').at(0).find('#name').text()).toBe('name1');
        expect(wrapper.find('#customer').at(0).find('#email').text()).toBe('email1');
        expect(wrapper.find('#customer').at(0).find('#address').text()).toBe('address1');
        expect(wrapper.find('#customer').at(0).find('#city').text()).toBe('city1');
        expect(wrapper.find('#customer').at(0).find('#country').text()).toBe('India');
        expect(wrapper.find('#customer').at(0).find('#pincode').text()).toBe('pincode1');
    });

    it("should place order", ()=>{

        wrapper.find("#placeOrder").simulate('click');

        expect(onPlaceOrder).toHaveBeenCalled();
    });

});
