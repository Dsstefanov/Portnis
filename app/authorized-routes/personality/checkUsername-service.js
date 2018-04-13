angular.module('portfolio.homepage.personality')
    .factory('isUsernameUnique', [
      '$http',
      'SERVER',
      'toastService',
      ($http, SERVER, toastService) => {
        "use strict";
        return {
          isUsernameUnique: (username) => {
            return $http.get(`${SERVER}/users/username/${username}`)
                .then(data => {
                  return data.data;
                })
                .catch(() => {
                  toastService.showToast('Internal Server error, please try again later')
                });
          }
        };
      }]);