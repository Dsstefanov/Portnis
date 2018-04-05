angular.module('portfolio.auth')
    .factory('login', [
        '$http',
        '$cookies',
        'SERVER',
        'toastService',
        ($http, $cookies, SERVER, toastService) => {
            "use strict";
            return {
                login: (user) => {
                    return $http.post(`${SERVER}/users/auth/login`, user)
                        .then(data => {
                            data = data.data;
                            if(data.error){
                                return data;
                            }
                            if(data.success){
                                data = data.success;
                                let now = new Date();
                                let expDate = new Date(now);
                                expDate.setDate(now.getDate()+3);

                                $cookies.put('auth', data.remember_token, {'expires' : expDate});
                                $cookies.put('userId', data._id, {'expires' : expDate});
                            }

                            return data;
                        })
                        .catch(() => {
                          toastService.showToast('Internal Server error, please try again later');
                        });
                }
            };
        }]);