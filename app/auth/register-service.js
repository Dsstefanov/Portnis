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
                        .catch(() => {
                          toastService.showToast('Internal Server error, please try again later');
                        });
                }
            };
        }]);