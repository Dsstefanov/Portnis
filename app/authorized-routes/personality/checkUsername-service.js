angular.module('portfolio.homepage.personality')
    .factory('isUsernameUnique', [
        '$http',
        'SERVER',
        ($http, SERVER) => {
            "use strict";
            return {
                isUsernameUnique: (username) => {
                    return $http.get(`${SERVER}/users/username/${username}`)
                        .then(data => {
                            return data.data;
                        })
                        .catch(() => {
                            console.log("Internal server error at checkUsername service!");
                        });
                }
            };
        }]);