import React from 'react';
import { shallow } from 'enzyme';

import Admin from "../../app/components/Admin";

describe("/admin", () => {
    it("should render the admin component and check its contents", (done) => {
        const wrapper = shallow(<Admin />)
        
        expect(wrapper.find("#admin").exists()).toBe(true);
        expect(wrapper.find("#admin").text()).toContain("Welcome Admin");

        done();
    })
})