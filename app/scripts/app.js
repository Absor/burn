'use strict';

angular.module('burnApp', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .state('milestones', {
                url: '/:owner/:repo/milestones',
                templateUrl: 'views/milestones.html',
                controller: 'MilestonesCtrl'
            })
            .state('milestones.burnup', {
                url: '/:number',
                templateUrl: 'views/burnup.html',
                controller: 'BurnUpCtrl'
            });
    }]);
