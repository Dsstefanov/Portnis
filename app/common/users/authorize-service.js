angular.module('portfolio.authorization', ['ngCookies'])
  .factory('Auth', [
    '$http',
    '$cookies',
    '$location',
    'SERVER',
    'toastService',
    'constants',
    'md5',
    ($http, $cookies, $location, SERVER, toastService, constants, md5) => {
      "use strict";
      return {
        isUserAuthorized: () => {
          if ($cookies.get(md5.createHash(constants.KEYS.auth)) &&
            $cookies.get(md5.createHash(constants.KEYS.userId))) {
            return $http.get(`${SERVER}/users/auth/authorize`)
              .then(data => {
                  let now = new Date();
                  let expDate = new Date(now);
                  expDate.setDate(now.getDate() + 3);
                  $cookies.put(md5.createHash(constants.KEYS.auth), $cookies.get(md5.createHash(constants.KEYS.auth)), {'expires': expDate});
                  $cookies.put(md5.createHash(constants.KEYS.userId), $cookies.get(md5.createHash(constants.KEYS.userId)), {'expires': expDate});
                return data.data;
              })
              .catch((err) => {
                console.log(err)
                $cookies.remove(md5.createHash(constants.KEYS.auth));
                $cookies.remove(md5.createHash(constants.KEYS.userId));
                  if (err.status === 401 || err.status === 400) {
                    toastService.showToast('You are not authorized to view the resource.');
                  } else if(err.status === 404){
                    return false
                  } else {
                    toastService.showToast('Internal Server error, please try again later');
                  }
                  $location.path('/login');
                }
              )
          } else {
            return false;
          }
        }
      };
    }]);