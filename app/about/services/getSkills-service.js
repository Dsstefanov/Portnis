angular.module('portfolio.about')
    .factory('getSkills', [
        '$http',
        'SERVER',
        'toastService',
        ($http, SERVER, toastService) => {
            "use strict";
            return {
                getSkills: () => {
                    /*not catching because it has to be caught by the upper promise*/
                    return $http.get(`${SERVER}/users/dsstefanov/skills`)
                        .then(data => {
                            return data.data.skills;
                        })
                        .catch(() => {
                          toastService.showToast('Internal Server error, please try again later')
                        })
                }
            };
        }]);