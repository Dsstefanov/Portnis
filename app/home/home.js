'use strict';

angular.module('portfolio.home', ['ngRoute', 'portfolio.get-user'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/:username', {
        templateUrl: './app/home/homepage.html',
        controller: 'HomeController'
      });
    }])

    .controller('HomeController', [
      '$scope',
      'getUser',
      'SERVER',
      'PATHTOIMAGES',
      function ($scope, getUser, SERVER, PATHTOIMAGES) {
        $scope.PATHTOIMAGES = PATHTOIMAGES;
        getUser.getUser()
            .then(responseUser => {
	            $scope.user = responseUser;
            })
      }]);