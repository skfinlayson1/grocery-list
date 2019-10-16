import React from 'react';
import { shallow } from 'enzyme';

import Contact from "../../app/components/Contact";


describe("/contact", () => {
    it("should render the contact page and show contact information", (done) => {
        const wrapper = shallow(<Contact />)

        expect(wrapper.find("#contact").exists()).toBe(true);
        expect(wrapper.find("#contact").text()).toContain("(801) 953-7219");
        expect(wrapper.find("#contact").text()).toContain("Email: WickedWaysCustoms @yahoo.com")

        done();
    })
})