import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import MainPage from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('(default', () => {
    wrapper = shallow((
      <MainPage />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
