import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Display from './displayIngredients'

describe(`display a recipe component`, () => {
    
  it('renders specifics for a recipe', () => {
    const ingredients= [{
        content:'foo'
    }];
    const user_id = 1;
    const wrapper = shallow(<Display ingredients = {ingredients}
        user_id={user_id}/>);
    // expect(toJson(wrapper)).toMatchSnapshot()
    expect(
        wrapper.containsMatchingElement(
            <label htmlFor={0}>foo</label>
        )
      ).toBeTruthy();
  });
  it('it should not render when ingredient array is empty',()=>{
    const ingredients= [];
    const user_id = 1;
    const wrapper = shallow(<Display ingredients = {ingredients}
        user_id={user_id}/>)
    // expect(toJson(wrapper)).toMatchSnapshot()
    expect(
        wrapper.containsMatchingElement(
            <label htmlFor={0}></label>
        )
      ).not.toBeTruthy();
  })

  
})
