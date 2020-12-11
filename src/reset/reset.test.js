import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Reset from './reset';

describe(`About component`, () => {
  it('renders without crash', () => {
    const match={params:{userId:1}};

    const wrapper = shallow(<Reset match={match}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
}) 