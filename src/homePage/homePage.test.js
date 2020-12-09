import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import HomePage from './homePage'

describe(`HomePage component`, () => {

  it('renders home page', () => {
    const wrapper = shallow(<HomePage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  
})