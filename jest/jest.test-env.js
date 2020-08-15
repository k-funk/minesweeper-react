const sampleDate = new Date('2019-11-11T11:11:11');

global.Date = class extends Date {
  constructor(date) {
    if (date) {
      super(date);
      return;
    }

    return sampleDate;
  }

  static now() {
    return sampleDate.valueOf();
  }
};
