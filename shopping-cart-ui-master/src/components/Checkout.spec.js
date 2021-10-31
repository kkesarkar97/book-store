import React from 'react';
import Checkout from "./Checkout";
import {shallow} from "enzyme";
import Form from "react-bootstrap/Form";


describe("Checkout component", ()=>{

    it("should render textbox with values filled if existing",()=>{

        var customerDetails = {
            name:'name1',
            email:'email1',
            address:'address1',
            city:'city1',
            pincode: 'pincode1',
            country: 'India'
        };

        const wrapper = shallow(<Checkout {...customerDetails}/>);
        expect(wrapper.find({controlId: 'formGridName'}).find(Form.Control).prop('value')).toBe('name1');
        expect(wrapper.find({controlId: 'formGridEmail'}).find(Form.Control).prop('value')).toBe('email1');
        expect(wrapper.find({controlId: 'formGridAddress'}).find(Form.Control).prop('value')).toBe('address1');
        expect(wrapper.find({controlId: 'formGridCity'}).find(Form.Control).prop('value')).toBe('city1');
        expect(wrapper.find({controlId: 'formGridPincode'}).find(Form.Control).prop('value')).toBe('pincode1');
        expect(wrapper.find({controlId: 'formGridCountry'}).find(Form.Control).prop('value')).toBe('India');

    });

    [
        {id:'formGridName', name:'name'},
        {id:'formGridEmail', name:'email'},
        {id:'formGridAddress', name:'address'},
        {id:'formGridCity', name:'city'},
        {id:'formGridCountry', name:'country'},
        {id:'formGridPincode', name:'pincode'},
    ]
        .forEach(control => {
        it(`should save customer details as data is entered for ${control.name}`, ()=>{
            var updateCustomerDetails = jest.fn();
            const wrapper = shallow(<Checkout updateCustomerDetails={updateCustomerDetails}/>);
            wrapper.find({ controlId: control.id }).find(Form.Control).simulate('change',{target:{value:'data'}});
            expect(updateCustomerDetails.mock.calls[0][0][control.name]).toBe('data');
        });
    });
    it("should route to order confirmation page on click of order confirmation",()=>{

    });



});
