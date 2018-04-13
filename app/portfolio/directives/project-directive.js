angular.module('portfolio.portfolio')
    .directive('projectOdd', [
      'BASE',
      function (BASE) {
        "use strict";

        return {
          restrict: 'E',
          scope: {
            project: '=project'
          },
          templateUrl: `${BASE}portfolio/directives/projectOdd-directive.html`
        };
      }])
    .directive('projectEven', [
      'BASE',
      function (BASE) {
        "use strict";
        return {
          restrict: 'E',
          scope: {
            project: '=project'
          },
          templateUrl: `${BASE}portfolio/directives/projectEven-directive.html`
        };
      }]);