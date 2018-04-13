'use strict';

angular.module('portfolio.homepage', ['ngRoute', 'portfolio.get-user'])

    .config([
      '$routeProvider',
      function ($routeProvider) {
        $routeProvider.when('/', {
          templateUrl: `./app/authorized-routes/homepage/homepage.html`,
          controller: 'HomepageController'
        });
      }])

    .controller('HomepageController', [
      '$scope',
      'getUser',
      function ($scope, getUser) {
        getUser.getUserById()
            .then(data => {
              $scope.user = data;
            });
      }]);