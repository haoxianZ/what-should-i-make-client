import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Contact from './contact'

describe(`contact form component`, () => {
  it('renders the complete form', () => {
    const wrapper = shallow(<Contact />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})