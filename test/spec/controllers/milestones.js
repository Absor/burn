'use strict';

describe('Controller: MilestonesCtrl', function () {

  // load the controller's module
  beforeEach(module('burndownApp'));

  var MilestonesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MilestonesCtrl = $controller('MilestonesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
