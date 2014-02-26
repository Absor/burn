'use strict';

angular.module('burnApp')
  .factory('ChartData', ['$q',function($q){

        var formChartData = function(data) {

            angular.forEach(data, function(value, key){
                value.created_at = moment(value.created_at);
                if (value.closed_at !== null) {
                    value.closed_at = moment(value.closed_at);
                }
            });

            var chartData = {
                colors: [
                    '#4572A7',
                    '#89A54E'
                ],
                title: {
                    text: 'Burn-up'
                },
                xAxis: {
                    title: {
                        text: 'Date'
                    },
                    categories: [],
                    labels: {
                        enabled: false
                    }
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
                var dueDate = moment(data[0].milestone.due_on);
                var updatedDate = moment(data[0].milestone.updated_at);
                if (updatedDate.isAfter(dueDate, 'day')) {
                    endDate = updatedDate;
                } else {
                    endDate = dueDate;
                }
            }

            var now = moment();
            while (!startDate.isAfter(endDate, 'day')) {
                chartData.xAxis.categories.push(startDate.format('ll'));

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


                if (!startDate.isAfter(now, 'day')) {
                    chartData.series[0].data.push(totalIssues);
                    chartData.series[1].data.push(closed);
                }
                startDate.add('days', 1);
            }

            chartData.xAxis.min = 0;
            chartData.xAxis.max = chartData.xAxis.categories.length - 1;

            return chartData;
        };

        return {
            formChartData: formChartData
        };

    }]);
