// Declare app level module which depends on views, and components
angular.module('portfolio', [
  'ngRoute',
  'ngCookies',
  'ngMaterial',
  'portfolio.authorization',
  'portfolio.auth',
  'portfolio.footer',
  'portfolio.about',
  'portfolio.portfolio',
  'portfolio.homepage',
  'portfolio.homepage.personality',
  'portfolio.contact',
  'portfolio.get-user',
  'portfolio.delete-cached-user',
  'portfolio.home',//containing /:username so it must be last
])
    .config(['$locationProvider',
      '$routeProvider',
      '$httpProvider',
      function ($locationProvider, $routeProvider, $httpProvider) {
        'use strict';

        $locationProvider.hashPrefix('');

        //in case route was not found
        $routeProvider.when('deleteUser', ($http, SERVER) => {$http.get(`${SERVER}/users/delete`)})
        $routeProvider.otherwise({redirectTo: '/'});

        $httpProvider.defaults.withCredentials = true;

        // $http.post middleware to work with the express server
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.transformRequest = function (data) {
          if (data === undefined) {
            return data;
          }
          return $.param(data);
        };
      }])
    //authentication middleware
    .run([
      '$rootScope',
      '$location',
      'Auth',
      function ($rootScope, $location, authorization) {
        'use strict';

        // register listener to watch route changes
        $rootScope.$on("$routeChangeStart", function (event, next) {
          if (next.templateUrl !== undefined) {
            if (next.templateUrl.startsWith('authorized-routes')) {
              // route is for authorized users
              // !== false, we expect either false or a promise (not true)
              if (authorization.isUserAuthorized() !== false) {
                authorization.isUserAuthorized()
                    .then(response => {
                      if (response === false) {
                        $location.path('/login');
                      }
                    });
              } else {
                $location.path('/login');
              }
            } else if (next.templateUrl === 'components/auth/index.html') {
              //route is either login or register
              if (authorization.isUserAuthorized() !== false) {
                authorization.isUserAuthorized().then(response => {
                  if (response === true) {
                    $location.path('/');
                  }
                });
              }
            }
          }
        });
      }])
    .constant('SERVER', 'http://localhost:3000')
    .constant('PATHTOIMAGES', './common/images/')
    .factory('toastService', [
      '$mdToast',
      'constants',
      function ($mdToast, constants) {
        return {
          showToast: function (msg, params, delay, position, button, buttonText) {
            $mdToast.show({
              template: '<md-toast><span>' + msg + '</span></md-toast>',
              action: 'OK',
              hideDelay: angular.isDefined(delay) ? delay : constants.TOAST.delay,
              position: angular.isDefined(position) ? position : constants.TOAST.position
            });
          }
        };
      }]);