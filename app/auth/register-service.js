angular.module('portfolio.auth')
    .factory('registerUser', [
        '$http',
        'SERVER',
        ($http, SERVER) => {
            "use strict";
            return {
                register: (data) => {
                    return $http.post(`${SERVER}/users/auth/register`, data)
                        .then(data => {
                            return data.data;
                        })
                        .catch(ex => {
                            console.log("Internal server error at register-service!");
                        });
                }
            };
        }]);