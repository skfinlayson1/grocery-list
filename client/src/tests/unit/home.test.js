import React from 'react';
import { shallow } from 'enzyme';

import Home from "../../app/components/Home/Home";


describe("/", () => {

    it("should render the home page", (done) => {
        const wrapper = shallow(<Home />);

        expect(wrapper.find(".landing").exists()).toBe(true);
        expect(wrapper.find("#full-logo").exists()).toBe(true);
        done();
    })  

})