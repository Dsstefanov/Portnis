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
        function ($scope, getUser) {
            getUser.getUser()
                .then(data => {
                    $scope.user = data;
                    $scope.aboutText = data.aboutText;
                    $scope.skills = data.skills;
                }).catch(error => {
                if (error.status === -1) {
                    error = `${error.config.url} is not available`;
                }
                $scope.error = error;
            });
        }]);