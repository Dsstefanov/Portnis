angular.module('portfolio.portfolio')
.directive('projectOdd', () => {
    "use strict";

    return {
        restrict: 'E',
        scope: {
            project: '=project'
        },
        templateUrl: 'portfolio/directives/projectOdd-directive.html'
    };
})
.directive('projectEven', () => {
    "use strict";
    return {
        restrict: 'E',
        scope: {
            project: '=project'
        },
        templateUrl: 'portfolio/directives/projectEven-directive.html'
    };
});