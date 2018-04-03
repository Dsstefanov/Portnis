'use strict';

angular.module('portfolio.auth', ['ngRoute', 'ngCookies', 'portfolio.authorization'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'components/auth/index.html',
            controller: 'LoginController'
        });
    }])

    .controller('LoginController', [
        '$scope',
        function($scope) {
        $scope.login = true;
        $scope.email='';
        $scope.password = '';
    }]);