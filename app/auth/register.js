'use strict';

angular.module('portfolio.auth')

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/register', {
        templateUrl: './app/auth/index.html',
        controller: 'RegisterController'
      });
    }])

    .controller('RegisterController', [
      '$scope',
      'registerUser',
      function ($scope, registerUser) {
        $scope.login = false;
        $scope.register = true;
      }]);