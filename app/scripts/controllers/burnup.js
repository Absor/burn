'use strict';

angular.module('burnApp')
  .controller('BurnUpCtrl', ['$scope', '$stateParams', 'Issues', function ($scope, $stateParams, Issues) {

        var formChart = function(data) {

            angular.forEach(data, function(value, key){
                value.created_at = moment(value.created_at);
                if (value.closed_at !== null) {
                    value.closed_at = moment(value.closed_at);
                }
            });

            var chartData = {

                title: {
                    text: 'Burn-up'
                },
                xAxis: {
                    categories: []
                },
                yAxis: {
                    title: {
                        text: 'Issues'
                    },
                    allowDecimals: false
                },
                series: [{
                    name: 'Total',
                    type: 'line',
                    step: 'left',
                    data: []
                },{
                    name: 'Closed',
                    type: 'areaspline',
                    data: []
                }]
            };

            var startDate = moment(data[0].milestone.created_at);
            var endDate;
            if (data[0].milestone.due_on == null) {
                endDate = moment();
            } else {
                endDate = moment(data[0].milestone.due_on);
            }

            while (!startDate.isAfter(endDate, 'day')) {
                chartData.xAxis.categories.push(startDate.format('L'));

                var totalIssues = 0;
                var open = 0;
                var closed = 0;

                angular.forEach(data, function(value, key){
                    if (startDate.isSame(value.created_at, 'day') || startDate.isAfter(value.created_at, 'day')) {
                        totalIssues++;

                        if (value.state === 'open' || startDate.isBefore(value.closed_at, 'day')) {
                            open++;
                        } else {
                            closed++;
                        }
                    }
                });

                chartData.series[0].data.push(totalIssues);
                chartData.series[1].data.push(closed);
                startDate.add('days', 1);
            }

            $('#chart').highcharts(chartData);
        };

        var queryIssues = function() {
            var promise = Issues.query($stateParams.owner, $stateParams.repo, $stateParams.number);
            promise.then(function (data) {
                formChart(data);
            }, function (reason) {
                alert('Failed: ' + reason);
            });
        };

        queryIssues();
  }]);
