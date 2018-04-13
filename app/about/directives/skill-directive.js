angular.module('portfolio.about')
    .directive('skill', ['BASE', (BASE) => {
      "use strict";

      return {
        restrict: 'E',
        scope: {
          skill: '=skill'
        },
        templateUrl: `${BASE}about/directives/skill-directive.html`
      };
    }]);