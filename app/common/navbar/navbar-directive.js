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
            function () {
                "use strict";
                return {
                    restrict: 'E',
                    controller: 'NavbarController',
                    templateUrl: 'common/navbar/navbar.html'
                };
            }]);