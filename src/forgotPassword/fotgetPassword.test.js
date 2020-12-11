import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ForgetPassword from './forgotPassword';

describe(`Forget password component`, () => {
  it('renders without crash', () => {
    const wrapper = shallow(<ForgetPassword />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
}) 