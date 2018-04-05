'use strict';

angular.module('portfolio.about', ['ngRoute', 'portfolio.get-user', 'ngSanitize'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/:username/about', {
            templateUrl: 'about/about.html',
            controller: 'AboutController',
        });
    }])

    .controller('AboutController', [
        '$scope',
        'getUser',
        'toastService',
        function ($scope, getUser, toastService) {
            getUser.getUser()
                .then(data => {
                    $scope.user = data;
                    $scope.aboutText = data.aboutText;
                    $scope.skills = data.skills;
                });
        }]);