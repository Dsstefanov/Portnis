angular.module('portfolio.about')
    .directive('skill', () => {
        "use strict";

        return {
            restrict: 'E',
            scope: {
                skill: '=skill'
            },
            templateUrl: 'about/directives/skill-directive.html'
        };
    });