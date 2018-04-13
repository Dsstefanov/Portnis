angular.module('portfolio.auth')
    .factory('registerUser', [
      '$http',
      'SERVER',
      'toastService',
      ($http, SERVER, toastService) => {
        "use strict";
        return {
          register: (data) => {
            return $http.post(`${SERVER}/users/auth/register`, data)
                .then(data => {
                  return data.data;
                })
                .catch((err) => {
                  if (err.data.msg.code === 11000) {
                    toastService.showToast(`Email ${data.email} is already in use`);
                  } else {
                    toastService.showToast("Internal Server error, please try again later");
                  }
                });
          }
        };
      }]);