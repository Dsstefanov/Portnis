angular.module('portfolio.auth')
    .directive('registerForm', [
      '$location',
      'isEmailUnique',
      'registerUser',
      'toastService',
      'constants',
      'BASE',
      function ($location, isEmailUnique, registerUser, toastService, constants, BASE) {
        "use strict";
        let loginBtn = (scope, element) => {
          const login = element.find('#login-btn');
          login.on('click', () => {
            window.location = '/#/login';
            scope.login = false;
            scope.register = true;
          });
        };

        let registerBtnClick = (scope, element) => {
          const register = element.find('#register');
          register.on('click', () => {
            let formData = {};
            formData.email = scope.email;
            formData.password = scope.password;
            registerUser.register(formData)
                .then(data => {
                  if (angular.isDefined(data) && data.success) {
                    toastService.showToast(`${data.success}`, null,
                        constants.TOAST_SUCCESS.delay, constants.TOAST_SUCCESS.position);
                    $location.path('/login');
                  }
                });
          });
        };

        let checkEmailUnique = (element) => {
          //setup before functions
          let typingTimer;                //timer identifier
          let doneTypingInterval = 500;  //time in ms
          let $input = element.find('#email');

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
            let preloader = element.find('#preloader');
            preloader.addClass('active');
            isEmailUnique.isEmailUnique($input.val())
                .then(data => {
                  preloader.removeClass('active');
                  if (data !== null) {
                    //user exists
                    $input.addClass('invalid');
                    $input.addClass('invalid-unique');
                    element.find('#email-label').attr('data-error', 'Email is already in use');
                  } else {
                    if ($input.hasClass('invalid-unique')) {
                      $input.removeClass('invalid');
                      $input.removeClass('invalid-unique');
                    }
                    if (!$input.val().match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
                      element.find('#email-label').attr('data-error', `${$input.val()} is not a valid email`);
                    }
                    if ($input.val().length === 0) {
                      element.find('#email-label').attr('data-error', 'required');
                    }
                  }
                });
          }
        };
        return {
          restrict: 'E',
          templateUrl: `${BASE}auth/register.html`,
          link: {
            post: function (scope, element) {
              loginBtn(scope, element);
              registerBtnClick(scope, element);
              checkEmailUnique(element);
            }
          }
        };
      }]);