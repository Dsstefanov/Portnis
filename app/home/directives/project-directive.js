angular.module('portfolio.home')
    .directive('project', () => {
        "use strict";

        return {
            restrict: 'E',
            scope: {
                project: '=project'
            },
            templateUrl: 'home/directives/project-directive.html'
        };
    });