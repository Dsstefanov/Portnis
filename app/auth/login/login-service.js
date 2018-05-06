angular.module('portfolio.auth')
    .factory('login', [
      '$http',
      '$cacheFactory',
      '$cookies',
      'SERVER',
      'toastService',
      'md5',
      'constants',
      ($http, $cacheFactory, $cookies, SERVER, toastService, md5, constants) => {
        "use strict";
        return {
          login: (user) => {
            return $http.post(`${SERVER}/users/auth/login`, user)
                .then(data => {
                  data = data.data;
                  let cache = $cacheFactory.get('user') || $cacheFactory('user');
                  cache.removeAll();

                  let now = new Date();
                  let expDate = new Date(now);
                  expDate.setDate(now.getDate() + 3);

                  $cookies.put(md5.createHash(constants.KEYS.auth), data.remember_token, {'expires': expDate});
                  $cookies.put(md5.createHash(constants.KEYS.userId), data._id, {'expires': expDate});

                  return data;
                })
                .catch(err => {
                  if (err.status === 404) {
                    toastService.showToast('Credentials do not match.');
                  } else {
                    toastService.showToast('Internal Server error, please try again later');
                  }
                });
          }
        };
      }]);