'use strict';

describe('Service: chartdata', function () {

  // load the service's module
  beforeEach(module('burndownApp'));

  // instantiate service
  var chartdata;
  beforeEach(inject(function (_chartdata_) {
    chartdata = _chartdata_;
  }));

  it('should do something', function () {
    expect(!!chartdata).toBe(true);
  });

});
