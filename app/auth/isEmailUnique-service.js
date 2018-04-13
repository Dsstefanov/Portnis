angular.module('portfolio.auth')
    .factory('isEmailUnique', [
      '$http',
      'SERVER',
      'toastService',
      ($http, SERVER, toastService) => {
        "use strict";
        return {
          isEmailUnique: (email) => {
            return $http.get(`${SERVER}/users/emails/${email}`)
                .then(data => {
                  return data.data;
                })
                .catch(() => {
                  toastService.showToast('Internal Server error, please try again later');
                });
          }
        };
      }]);