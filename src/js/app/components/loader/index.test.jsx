import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import Loader from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('not loading', () => {
    wrapper = shallow((
      <Loader />
    ));
  });

  test('loading', () => {
    wrapper = shallow((
      <Loader loading />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
