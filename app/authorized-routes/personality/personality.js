'use strict';

angular.module('portfolio.homepage.personality', [
  'ngRoute',
  'portfolio.get-user',
  'portfolio.delete-cached-user'
])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/personality', {
        templateUrl: 'authorized-routes/personality/personality.html',
        controller: 'PersonalityController'
      });
    }])

    .controller('PersonalityController', [
      '$scope',
      'getUser',
      'isUsernameUnique',
      'deleteCachedUser',
      'updateUser',
      'toastService',
      'constants',
      function ($scope, getUser, isUsernameUnique, deleteCachedUser, updateUser,
                toastService, constants) {
      let user;
          getUser.getUserById()
              .then(data => {
                user = data;
                $scope.user = user;
              });
        $scope.submit = () => {
          updateUser.updateUser(user)
              .then((msg) => {
                console.log(msg)
                toastService.showToast(msg, null, constants.TOAST_SUCCESS.delay, constants.TOAST_SUCCESS.position)
                deleteCachedUser.deleteCachedUser()
                    .then(() => {
                      getUser.getUserById();
                    });
              });
        };
      }]);


function checkUsername(currentUsername, user, isUsernameUnique) {
  let $input = $('#username');
  if (!user.username) {
    checkUsernameUnique(currentUsername, isUsernameUnique);
  } else {
    if (currentUsername !== $input.val()) {
      checkUsernameUnique(currentUsername, isUsernameUnique);

    }
  }
}

let checkUsernameUnique = (currentUsername, isUsernameUnique) => {
  //setup before functions
  let typingTimer;                //timer identifier
  let doneTypingInterval = 500;  //time in ms
  let $input = $('#username');
  //on keyup, start the countdown
  $input.on('keyup', function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  });

  //on keydown, clear the countdown
  $input.on('keydown', function () {
    clearTimeout(typingTimer);
  });

  //user is "finished typing," do something
  function doneTyping() {
    let preloader = $('#preloader');
    preloader.addClass('active');

    if (currentUsername !== '' && currentUsername !== $input.val()) {

      isUsernameUnique.isUsernameUnique($input.val())
          .then(data => {
            console.log(data);
            preloader.removeClass('active');
            if (data === true) {
              //user exists
              $input.addClass('invalid');
              $input.addClass('invalid-unique');
              $('#username-label').attr('data-error', 'Username is already in use');
            } else {
              if ($input.hasClass('invalid-unique')) {
                $input.removeClass('invalid');
                $input.removeClass('invalid-unique');
              }
            }
          });
    } else {
      if ($input.hasClass('invalid-unique')) {
        $input.removeClass('invalid');
        $input.removeClass('invalid-unique');
      }
    }
  }
};