import React from 'react';
import { shallow } from 'enzyme';

import About from "../../app/components/About";


describe("/about", () => {
    it("should render the about page and check contents", (done) => {
        const wrapper = shallow(<About />);

        expect(wrapper.find("#about").exists()).toBe(true);
        expect(wrapper.find("#about").text()).toContain("How It All Got Started");

        done(); 
    }) 
})