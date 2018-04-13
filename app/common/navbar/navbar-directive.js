angular.module('portfolio.portfolio')
    .controller('NavbarController', [
      '$scope',
      '$routeParams',
      function ($scope, $routeParams) {
        'use strict';
        $scope.user = $routeParams;
      }
    ])
    .directive('navbar',
        [
          'BASE',
          function (BASE) {
            "use strict";
            return {
              restrict: 'E',
              controller: 'NavbarController',
              templateUrl: `${BASE}common/navbar/navbar.html`
            };
          }]);