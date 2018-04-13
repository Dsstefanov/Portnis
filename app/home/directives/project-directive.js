angular.module('portfolio.home')
    .directive('project', [
      'BASE',
      (BASE) => {
        "use strict";

        return {
          restrict: 'E',
          scope: {
            project: '=project'
          },
          templateUrl: `${BASE}home/directives/project-directive.html`
        };
      }]);