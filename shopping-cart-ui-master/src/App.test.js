import React from 'react';
import {App} from './App';
import {urls} from "./config/env-config";
import {shallow} from "enzyme";

describe("App ", async ()=>{

  const mockData = (data) => {

    const mockJsonPromise = Promise.resolve(data); // 2
    const mockFetchPromise = Promise.resolve({ // 3
      json: () => mockJsonPromise,
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

  };

  it("fetches cart on load", async () => {

    const cartId = 11;
    mockData({id:cartId});

    shallow(<App/>);

    await expect(global.fetch).toHaveBeenCalledWith(expect.stringMatching(`${urls.cartUrl}/.+`));

  });

});
