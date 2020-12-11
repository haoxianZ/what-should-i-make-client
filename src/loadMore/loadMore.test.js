import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import LoadMore from './loadMore';

describe(`Load More component`, () => {
  it('renders without crash', () => {
    const wrapper = shallow(<LoadMore />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
}) 