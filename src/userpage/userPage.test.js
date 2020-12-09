import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import UserPage from './userPage'

describe(`UserPage component`, () => {

  it('renders user page', () => {
    const match={params:{userId:1}};
    const wrapper = shallow(<UserPage match={match}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})