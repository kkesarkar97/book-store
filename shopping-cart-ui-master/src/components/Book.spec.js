import React from 'react';
import {shallow} from 'enzyme';
import Book from "./Book";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "./Spinner";

describe("books compoment", () => {

    const booksData = {
        "id":1,
        "name": "Book name 1",
        "authors": ["Author 1.1", "Author 1.2"],
        "description": "Book description 1",
        "imageUrl": "http://bookurl1",
    };

    const bookUrl = 'http://bookurl';

    const mockData = (data) => {

        const mockJsonPromise = Promise.resolve(data); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
        });

        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    };

    beforeEach(()=>{
        mockData(booksData);

    });

    it('should call default url', () => {

        shallow(<Book location={{state:{url:bookUrl}}}/>);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(bookUrl);

    });

    it('should render book', async () => {
        let wrapper = shallow(<Book location={{state:{url:bookUrl}}}/>);

        await wrapper.instance().componentDidMount();

        expect(wrapper.find(Image).prop("src")).toBe(booksData.imageUrl);
        expect(wrapper.find("h3").text()).toBe(booksData.name);
        expect(wrapper.find(Col).last().text()).toBe(booksData.description);

    });

    it('should invoke add to cart', async () => {

        var mockAddToCart = jest.fn();
        let wrapper = shallow(<Book  location={{state:{url:bookUrl}}} onAddToCart={mockAddToCart}/>);

        await wrapper.instance().componentDidMount();

        wrapper.find(Button).simulate('click');

        expect(mockAddToCart.mock.calls.length).toBe(1);
        expect(mockAddToCart.mock.calls[0][0]).toBe(1);

    });

    it('should show spinner until data is loading', () => {

        const wrapper = shallow(<Book location={{state:{url:bookUrl}}}/>);

        expect(wrapper.find(Spinner)).toBeDefined();

    });
});

