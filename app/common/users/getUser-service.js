angular.module('portfolio.get-user', ['ngCookies'])
  .factory('getUser', [
    '$http',
    '$routeParams',
    '$cacheFactory',
    '$q',
    '$cookies',
    'SERVER',
    'toastService',
    'md5',
    'constants',
    ($http, $routeParams, $cacheFactory, $q, $cookies, SERVER, toastService, md5, constants) => {
      "use strict";
      return {
        getUser: () => {
          return $http.get(`${SERVER}/users/${$routeParams.username}`)
            .then(data => {
              return data.data;
            })
            .catch(() => {
              toastService.showToast('Internal Server error, please try again later');
            })
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
            return $http.get(`${SERVER}/users/user/${$cookies.get(md5.createHash(constants.KEYS.userId))}`)
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