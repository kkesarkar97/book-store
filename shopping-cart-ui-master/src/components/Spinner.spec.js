import React from "react";
import {shallow} from "enzyme";
import Spinner from "./Spinner";


describe("spinner compoment", () => {

    it("should have a spinner", ()=>{
        const wrapper = shallow(<Spinner/>);

        expect(wrapper.find('.spinner-border')).toBeDefined();
    })

});

