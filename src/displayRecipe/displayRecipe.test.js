import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import DisplayRecipe from './displayRecipe'

describe(`Display searched result component`, () => {

  it('renders search recipe results', () => {
    const wrapper = shallow(<DisplayRecipe />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
