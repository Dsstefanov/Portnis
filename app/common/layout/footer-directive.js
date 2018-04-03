angular.module('portfolio.footer', [])
    .controller('FooterController', [
        '$scope',
        ($scope) => {
        "use strict";
        $scope.currentYear = (() => {
            return new Date().getFullYear();
        })();
    }])
    .directive('footer', () => {
        'use strict';
        return {
            restrict: 'A',
            templateUrl: './common/layout/footer-directive.html',
            controller: 'FooterController'
        };
    });