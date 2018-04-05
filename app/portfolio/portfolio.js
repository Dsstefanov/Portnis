'use strict';
angular.module('portfolio.portfolio', ['ngRoute', 'portfolio.get-user'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/:username/portfolio', {
            templateUrl: 'portfolio/portfolio.html',
            controller: 'PortfolioController'
        });
    }])

    .controller('PortfolioController', [
        '$scope',
        'getUser',
        function ($scope, getUser) {
            getUser.getUser()
                .then(data => {
                    if(data.error){
                        $scope.error = data.error;
                    }
                    /*taking only the projects with web link*/
                    $scope.projects = (() => {
                        let projects = [];
                        for (let project of data.projects){
                            if(project.weblink !== '') {
                                projects.push(project);
                            }
                        }
                        return projects;
                    })();
                });
        }]);