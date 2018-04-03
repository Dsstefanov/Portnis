angular.module('portfolio.homepage.personality')
    .factory('updateUser', [
        '$http',
        'SERVER',
        ($http, SERVER) => {
            "use strict";
            return {
                updateUser: (user) => {
                    return $http.post(`${SERVER}/users/id/${user._id}/user`, user)
                        .then(data => {
                            return data.data;
                        })
                        .catch((ex) => {
                            console.log(ex.message);
                        });
                }
            };
        }]);