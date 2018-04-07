angular.module('portfolio.get-user', ['ngCookies'])
    .factory('getUser', [
      '$http',
      '$routeParams',
      '$cacheFactory',
      '$q',
      '$cookies',
      'SERVER',
      'toastService',
      ($http, $routeParams, $cacheFactory, $q, $cookies, SERVER, toastService) => {
        "use strict";
        return {
          getUser: () => {
            let cache = $cacheFactory.get('user') || $cacheFactory('user');
            //checking if user was cached and take it otherwise call the server
            //retrieve the user and save it in the cache
            if (cache.get('userObject') !== undefined) {
              let deferred = $q.defer();
              deferred.resolve(cache.get('userObject'));
              return deferred.promise;
            } else {
              return $http.get(`${SERVER}/users/${$routeParams.username}`)
                  .then(data => {
                    cache.put('userObject', data.data);
                    return data.data;
                  })
                  .catch(() => {
                    toastService.showToast('Internal Server error, please try again later');
                  })
            }
          },
          getUserById: () => {
            let cache = $cacheFactory.get('user') || $cacheFactory('user');
            //checking if user was cached and take it otherwise call the server
            //retrieve the user and save it in the cache
            if (cache.get('userObject') !== undefined) {
              let deferred = $q.defer();
              deferred.resolve(cache.get('userObject'));
              return deferred.promise;
            } else {
              console.log('tuka failva')
              return $http.get(`${SERVER}/users/id/${$cookies.get('userId')}`)
                  .then(data => {
                    cache.put('userObject', data.data);
                    return data.data;
                  })
                  .catch(() => {
                    toastService.showToast('Internal Server error, please try again later');
                  })
            }
          }
        };
      }]);