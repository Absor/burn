'use strict';

angular.module('burnApp')
  .controller('BurnUpCtrl', ['$scope', '$stateParams', 'Issues', 'ChartData', function ($scope, $stateParams, Issues, ChartData) {

        var queryIssues = function() {
            var promise = Issues.query($stateParams.owner, $stateParams.repo, $stateParams.number);
            promise.then(function (data) {
                var chartData = ChartData.formChartData(data);
                $('#chart').highcharts(chartData);
            }, function (reason) {
                $scope.error = reason.message;
            });
        };

        queryIssues();
  }]);
