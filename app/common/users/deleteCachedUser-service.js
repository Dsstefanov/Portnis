angular.module('portfolio.delete-cached-user', ['ngCookies'])
    .factory('deleteCachedUser', [
        '$http',
        '$routeParams',
        '$cacheFactory',
        '$q',
        ($http, $routeParams, $cacheFactory, $q) => {
            "use strict";
            return {
                deleteCachedUser: () => {
                    let cache = $cacheFactory.get('user') || $cacheFactory('user');
                    cache.remove('userObject');
                    let deferred = $q.defer();
                    deferred.resolve();
                    return deferred.promise;
                },
            };
        }]);