import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import About from './about';

describe(`About component`, () => {
  it('renders without crash', () => {
    const wrapper = shallow(<About />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
}) 