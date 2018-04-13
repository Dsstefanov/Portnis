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
      'toastService',
      function ($scope, getUser, SERVER, PATHTOIMAGES, toastService) {
        $scope.PATHTOIMAGES = PATHTOIMAGES;
        getUser.getUser()
            .then(responseUser => {
              $scope.user = responseUser;
            }).catch(error => {
          if (error.status === -1) {
            toastService.showToast(`${error.config.url} is not available`)
          } else {
            toastService.showToast(`Internal server error`)
          }

        });
      }]);