'use strict';

angular.module('burnApp')
  .controller('MilestonesCtrl', ['$scope', '$stateParams', 'Milestones', '$state', function ($scope, $stateParams, Milestones, $state) {

        var queryMilestones = function() {
            if ($scope.milestones === undefined) {
                var promise = Milestones.query($stateParams.owner, $stateParams.repo);
                promise.then(function (data) {
                    $scope.milestones = data;
                }, function (reason) {
                    $scope.error = reason.message;
                });
            }
        };

        queryMilestones();

        $scope.go = function(number) {
            $state.go('milestones.burnup', {
                number: number
            });
        };
  }]);
