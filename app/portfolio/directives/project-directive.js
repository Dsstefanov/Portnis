angular.module('portfolio.portfolio')
    .directive('projectOdd', [
      'BASE',
      'SERVER',
      function (BASE, SERVER) {
        "use strict";

        return {
          restrict: 'E',
          scope: {
            project: '=project'
          },
          templateUrl: `${BASE}portfolio/directives/projectOdd-directive.html`,
	        link: (scope) => {
		        scope.SERVER = SERVER;
	        }
        };
      }])
    .directive('projectEven', [
      'BASE',
      'SERVER',
      function (BASE, SERVER) {
        "use strict";
        return {
          restrict: 'E',
          scope: {
            project: '=project',

          },
          templateUrl: `${BASE}portfolio/directives/projectEven-directive.html`,
          link: (scope) => {
            scope.SERVER = SERVER;
          }
        };
      }]);