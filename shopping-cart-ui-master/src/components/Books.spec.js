import React from 'react';
import {shallow} from 'enzyme';
import Books from "./Books";
import Pagination from "react-bootstrap/Pagination";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";


describe("books compoment", () => {


    const mockData = (data) => {

        const mockJsonPromise = Promise.resolve(data); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
        });

        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    };

    it('should call default url', async () => {

        mockData(booksData);
        let wrapper = shallow(<Books/>);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/books');

    });

    it('should render pagination', async () => {

        mockData(booksData);
        let wrapper = shallow(<Books/>);

        await wrapper.instance().componentDidMount();

        expect(wrapper.find(Pagination.First)).toBeDefined();
        expect(wrapper.find(Pagination.Last)).toBeDefined();
        expect(wrapper.find(Pagination.Prev)).toBeDefined();
        expect(wrapper.find(Pagination.Next)).toBeDefined();

    });

    it('should render cards', async () => {

        mockData(booksData);
        let wrapper = shallow(<Books/>);

        await wrapper.instance().componentDidMount();

        expect(wrapper.find(".flex-column").at(0).find("span").at(0).text()).toBe("Book name 1");
        expect(wrapper.find(".flex-column").at(0).find("span").at(1).text()).toBe("Author 1.1,Author 1.2");
        expect(wrapper.find(".flex-column").at(0).find(Image).prop("src")).toBe("http://bookurl1");


    });

    [
        {name: "first", component: Pagination.First, expectedUrl: "http://bookurl-first"},
        {name: "last", component: Pagination.Last, expectedUrl: "http://bookurl-last"},
        {name: "prev", component: Pagination.Prev, expectedUrl: "http://bookurl-prev"},
        {name: "next", component: Pagination.Next, expectedUrl: "http://bookurl-next"},
    ].forEach(elem => {
        it(`should load page data on click of ${elem.name} in pagination`, async () => {

            mockData(booksData);
            let wrapper = shallow(<Books/>);

            await wrapper.instance().componentDidMount();

            wrapper.find(elem.component).simulate('click');

            expect(global.fetch).toHaveBeenCalledWith(elem.expectedUrl);

        });
    });

    [
        {
            name: "first",
            override: {first: undefined},
            expectedFirst: true,
            expectedLast: false,
            expectedNext: false,
            expectedPrev: false
        },
        {
            name: "last",
            override: {last: undefined},
            expectedFirst: false,
            expectedLast: true,
            expectedNext: false,
            expectedPrev: false
        },
        {
            name: "next",
            override: {next: undefined},
            expectedFirst: false,
            expectedLast: false,
            expectedNext: true,
            expectedPrev: false
        },
        {
            name: "prev",
            override: {prev: undefined},
            expectedFirst: false,
            expectedLast: false,
            expectedNext: false,
            expectedPrev: true
        },
    ].forEach(item => {
            it(`should disable ${item.name} if not exists`, async () => {

                mockData({...booksData, _links: {...booksData._links, ...item.override}})
                let wrapper = shallow(<Books/>);

                await wrapper.instance().componentDidMount();

                expect(wrapper.find(Pagination.First).prop('disabled')).toBe(item.expectedFirst);
                expect(wrapper.find(Pagination.Last).prop('disabled')).toBe(item.expectedLast);
                expect(wrapper.find(Pagination.Next).prop('disabled')).toBe(item.expectedNext);
                expect(wrapper.find(Pagination.Prev).prop('disabled')).toBe(item.expectedPrev);

            });
        }
    );

});


const booksData = {
    "_embedded": {
        "books": [{
            "name": "Book name 1",
            "authors": ["Author 1.1", "Author 1.2"],
            "description": "Book description 1",
            "imageUrl": "http://bookurl1",
            "_links":{
                "self":{
                    "href":"http://book/1"
                }
            }
        },
            {
                "name": "Book name 2",
                "authors": ["Author 2.1", "Author 2.2"],
                "description": "Book description 2",
                "imageUrl": "http://bookurl2",
                "_links":{
                    "self":{
                        "href":"http://book/1"
                    }
                }
            }]
    },
    "_links": {
        "first": {
            "href": "http://bookurl-first"
        },
        "next": {
            "href": "http://bookurl-next"
        },
        "prev": {
            "href": "http://bookurl-prev"
        },
        "last": {
            "href": "http://bookurl-last"
        },
    },
    "page": {
        "size": 20,
        "totalElements": 52,
        "totalPages": 3,
        "number": 0
    }
};
