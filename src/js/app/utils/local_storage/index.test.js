import LocalStorage, { TEST_KEY } from './index';


describe('get', () => {
  let spy;

  test('a value is present in storage', () => {
    spy = jest.spyOn(window.localStorage, 'getItem').mockReturnValue('["test"]');

    expect(LocalStorage.get(TEST_KEY)).toEqual(['test']);
  });

  test('there is not a value present in storage', () => {
    spy = jest.spyOn(window.localStorage, 'getItem').mockReturnValue(null);

    expect(LocalStorage.get(TEST_KEY)).toEqual('');
  });

  afterEach(() => {
    expect(spy).toHaveBeenCalledWith(TEST_KEY);
  });
});

test('set', () => {
  const spy = jest.spyOn(window.localStorage, 'setItem');

  LocalStorage.set(TEST_KEY, ['test']);

  expect(spy).toHaveBeenCalledWith(TEST_KEY, '["test"]');
});

test('dump', () => {
  window.localStorage.setItem(TEST_KEY, 'test');
  const spy = jest.spyOn(window.localStorage, 'removeItem');

  LocalStorage.dump();

  expect(spy).toHaveBeenCalledWith(TEST_KEY);
});

afterEach(() => {
  window.localStorage.clear();
});
