'use strict';

angular.module('burnApp')
  .factory('Issues', ['$q', '$http', function ($q, $http) {

        return {
            query: function (owner, repo, number) {
                var deferred1 = $q.defer();
                $http.get('https://api.github.com/repos/' + owner + '/' + repo + '/issues?state=open&milestone=' + number)
                    .success(function (data) {
                        deferred1.resolve(data);
                    })
                    .error(function () {
                        deferred1.resolve([]);
                    });

                var deferred2 = $q.defer();
                $http.get('https://api.github.com/repos/' + owner + '/' + repo + '/issues?state=closed&milestone=' + number)
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
                        deferred3.resolve(combinedData);
                    }, function (reason) {
                        deferred3.reject(reason);
                    });

                return deferred3.promise;
            }
        };
  }]);
