angular.module('portfolio.auth')
    .directive('loginForm', [
        '$location',
        'login',
        ($location, loginService) => {
        "use strict";

        let registerBtn = (scope, element) => {
            let register = element.find('#register');
            register.on('click', () => {
                window.location = '/#/register';
                scope.login = false;
                scope.register = true;
            });
        };

        let login = ($scope) => {
            let user = {};
            user.email = $scope.email;
            user.password = $scope.password;
            loginService.login(user).then( data => {
                if(data.error){
                    $scope.error = data.error;
                }else {
                    $location.path('/');
                }
            });
        };

        return {
            restrict: 'E',
            templateUrl: 'components/auth/login.html',
            link: {
                post: function ($scope, element) {
                    registerBtn($scope, element);

                    element.find('#login-btn').on('click', () => {
                        login($scope);
                    });
                }
            }
        };
    }]);