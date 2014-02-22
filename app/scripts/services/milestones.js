'use strict';

angular.module('burnApp')
  .factory('Milestones', ['$q', '$http', function ($q, $http) {
        var map = function(data) {
            var map = {};
            angular.forEach(data, function(value, key){
                this[value.number] = value;
            }, map);
            return map;
        }

        return {
            query: function (owner, repo) {
                var deferred1 = $q.defer();
                $http.get('https://api.github.com/repos/' + owner + '/' + repo + '/milestones?state=open')
                    .success(function (data) {
                        deferred1.resolve(data);
                    })
                    .error(function () {
                        deferred1.resolve([]);
                    });

                var deferred2 = $q.defer();
                $http.get('https://api.github.com/repos/' + owner + '/' + repo + '/milestones?state=closed')
                    .success(function (data) {
                        deferred2.resolve(data);
                    })
                    .error(function () {
                        deferred2.resolve([]);
                    });

                var deferred3 = $q.defer();
                $q.all([deferred1.promise, deferred2.promise])
                    .then(function (data) {
                        var combinedData = data[0].concat(data[1]);
                        deferred3.resolve(map(combinedData));
                    }, function (reason) {
                        deferred3.reject(reason);
                    });

                return deferred3.promise;
            }
        };
  }]);
