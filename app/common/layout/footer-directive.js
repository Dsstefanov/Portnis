angular.module('portfolio.footer', [])
    .controller('FooterController', [
      '$scope',
      ($scope) => {
        "use strict";
        $scope.currentYear = (() => {
          return new Date().getFullYear();
        })();
      }])
    .directive('footer', [
      'BASE',
      function (BASE) {
        'use strict';
        return {
          restrict: 'A',
          templateUrl: `${BASE}common/layout/footer-directive.html`,
          controller: 'FooterController'
        };
      }]);