angular.module('portfolio')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/users/delete', {
      templateUrl: './app/authorized-routes/homepage/homepage.html',
      controller: 'DeleteUserController'
    });
  }])
  .factory('userFactory', [
    '$http',
    '$cookies',
    'SERVER',
    'toastService',
    'md5',
    'constants',
    ($http, $cookies, SERVER, toastService, md5, constants) => {
      "use strict";
      return {
        deleteUser: (password) => {
          return $http.post(`${SERVER}/users/user/${$cookies.get(md5.createHash(constants.KEYS.userId))}/delete`, password)
            .then(res => {
              return res.data
            })
            .catch((err) => {
              if (err.status === 400) {
                toastService.showToast('Passwords do not match.');
              } else {
                toastService.showToast('Error occurred trying to delete the user.');
              }
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
          if(angular.isUndefined(res)){
            return;
          }
          toastService.showToast(res, null, constants.TOAST_SUCCESS.delay, constants.TOAST_SUCCESS.position);
          $location.path('/login')
        })
    }
  ]);
