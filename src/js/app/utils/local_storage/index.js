export const TEST_KEY = 'testKey';

export const ALL_SETTINGS_KEYS = [
  TEST_KEY,
];

export const dispatchStorageUpdateEvent = () => {
  // window.addEventListener('storage') doesn't fire on the current tab by default. make it.
  // https://gist.github.com/TakashiSasaki/4282903
  window.dispatchEvent(new Event('storage'));
};

export default class LocalStorage {
  static get(key) {
    return JSON.parse(window.localStorage.getItem(key)) || '';
  }

  static set(key, val) {
    window.localStorage.setItem(key, JSON.stringify(val));
    dispatchStorageUpdateEvent();
  }

  static dump() {
    ALL_SETTINGS_KEYS.forEach(key => window.localStorage.removeItem(key));
    dispatchStorageUpdateEvent();
  }
}
