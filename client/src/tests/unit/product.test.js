import React from 'react';
import { shallow } from 'enzyme';

import Product from "../../app/components/Product";

describe("/:id/product", () => {

    it("should render the component and check its values", (done) => {
        const params = {params: {id: 1}}
        const wrapper = shallow(<Product match={params} />);

        expect(wrapper.find("#product").exists()).toBe(true);
        expect(wrapper.find("#product").text()).toContain("Click anywhere to minimize")

        done();
    })

})