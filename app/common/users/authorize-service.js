angular.module('portfolio.authorization', ['ngCookies'])
    .factory('Auth', [
      '$http',
      '$cookies',
      'SERVER',
      'toastService',
      ($http, $cookies, SERVER, toastService) => {
        "use strict";
        return {
          isUserAuthorized: () => {
            if ($cookies.get('userId') && $cookies.get('auth')) {
              return $http.get(`${SERVER}/users/auth/authorize/${$cookies.get('userId')}/${$cookies.get('auth')}`)
                  .then(data => {
                    if (data.data === false) {
                      $cookies.remove('userId');
                      $cookies.remove('auth');
                    } else {
                      let now = new Date();
                      let expDate = new Date(now);
                      expDate.setDate(now.getDate() + 3);
                      $cookies.put('auth', $cookies.get('auth'), {'expires': expDate});
                      $cookies.put('userId', $cookies.get('userId'), {'expires': expDate});
                    }
                    return data.data;
                  })
                  .catch(() => {
                    toastService.showToast('Internal Server error, please try again later')
                  })
            } else {
              return false;
            }
          }
        };
      }]);