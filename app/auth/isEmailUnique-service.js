angular.module('portfolio.auth')
    .factory('isEmailUnique', [
        '$http',
        'SERVER',
        ($http, SERVER) => {
            "use strict";
            return {
                isEmailUnique: (email) => {
                    return $http.get(`${SERVER}/users/emails/${email}`)
                        .then(data => {
                            return data.data;
                        })
                        .catch(() => {
                            console.log("Internal server error!");
                        });
                }
            };
        }]);