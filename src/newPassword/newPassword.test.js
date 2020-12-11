import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NewPassword from './newPassword';

describe(`set new password component`, () => {
  it('renders without crash', () => {
    const match={params:{userId:1}};
    const wrapper = shallow(<NewPassword match={match}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
}) 