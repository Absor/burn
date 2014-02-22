'use strict';

angular.module('burnApp')
  .controller('MainCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.go = function(url) {
        $location.path(url + '/milestones');
    };
  }]);
