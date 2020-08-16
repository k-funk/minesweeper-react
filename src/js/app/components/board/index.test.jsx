import React from 'react';
import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';

import Board, { generateUniqueRandomInts, plantMine } from './index';


describe('outputs the expected tree when', () => {
  let wrapper;

  test('5x5 board with 3 mines', () => {
    // FIXME: need to mock `initBoardData` so that the snapshots match on each run
    wrapper = shallow((
      <Board width={5} height={5} mines={3} />
    ));
  });

  afterEach(() => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('generateUniqueRandomInts', () => {
  const fn = generateUniqueRandomInts;
  const lowerLimit = 0;
  let ints;
  let amount;
  let upperLimit;

  test('valid values', () => {
    amount = 3;
    upperLimit = 10;
    ints = fn(amount, upperLimit);
    expect(ints).toHaveLength(amount);
  });

  test('a full set', () => {
    amount = 10;
    upperLimit = 10;
    ints = fn(amount, upperLimit);
    expect(ints).toHaveLength(amount);
  });

  test('beyond the upper limit does nothing extra', () => {
    amount = 11;
    upperLimit = 10;
    ints = fn(amount, upperLimit);
    expect(ints).toHaveLength(10);
  });

  afterEach(() => {
    expect(Math.max(...ints)).toBeLessThan(upperLimit);
    expect(Math.min(...ints)).toBeGreaterThanOrEqual(lowerLimit);
  });
});

test('plantMine', () => {
  const board = [
    [{ isMine: false }, { isMine: false }],
    [{ isMine: false }, { isMine: false }],
  ];
  const index = 2;

  plantMine(board, index);

  expect(board).toEqual([
    [{ isMine: false }, { isMine: false }],
    [{ isMine: true }, { isMine: false }],
  ]);
});
