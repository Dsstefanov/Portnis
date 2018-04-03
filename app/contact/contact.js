'use strict';

angular.module('portfolio.contact', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/:username/contact', {
            templateUrl: 'contact/contact.html',
            controller: 'ContactController'
        });
    }])

    .controller('ContactController', [function() {
    }]);