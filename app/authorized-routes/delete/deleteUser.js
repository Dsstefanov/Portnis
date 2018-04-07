angular.module('portfolio')
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/users/delete', {
        templateUrl: 'authorized-routes/homepage/homepage.html',
        controller: 'DeleteUserController'
      });
    }])
    .factory('userFactory', [
      '$http',
      '$cookies',
      'SERVER',
      'toastService',
      ($http, $cookies, SERVER, toastService) => {
        "use strict";
        return {
          deleteUser: (password) => {
            return $http.post(`${SERVER}/users/delete`, password)
                .then(res => {
                  return res.data
                })
                .catch(() => {
                  toastService.showToast('Internal Server error, please try again later');
                });
          }
        };
      }])
    .controller('DeleteUserController', [
      '$location',
      'toastService',
      'userFactory',
      'constants',
      function ($location, toastService, userFactory, constants) {
        //TODO REMOVE HARDCODE LATER
        userFactory.deleteUser({password: 'testpassword'})
            .then(res => {
              if(res.errors){
                toastService.showToast(res.errors.error.msg)
                return;
              }
              console.log(res)
              toastService.showToast(res.msg, null, constants.TOAST_SUCCESS.delay, constants.TOAST_SUCCESS.position);
              $location.path('/login')
            })
      }
    ]);
