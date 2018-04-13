angular.module('portfolio.auth')
    .directive('loginForm', [
      '$location',
      'login',
      'BASE',
      ($location, loginService, BASE) => {
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
          loginService.login(user).then(data => {
            if (data) {
              $location.path('/');
            }
          });
        };

        return {
          restrict: 'E',
          templateUrl: `${BASE}auth/login.html`,
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