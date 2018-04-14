angular.module('portfolio.homepage.personality')
    .factory('updateUser', [
      '$http',
      'SERVER',
      'toastService',
      ($http, SERVER, toastService) => {
        "use strict";
        return {
          updateUser: (user) => {
            return $http.post(`${SERVER}/users/user/${user._id}`, user)
                .then(data => {
                  return data.data;
                })
                .catch(() => {
                  toastService.showToast('Internal Server error, please try again later');
                });
          }
        };
      }]);