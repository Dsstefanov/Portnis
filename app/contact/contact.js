'use strict';

angular.module('portfolio.contact', ['ngRoute', 'portfolio.get-user'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/:username/contact', {
        templateUrl: './app/contact/contact.html',
        controller: 'ContactPublicController'
      });
    }])

    .controller('ContactPublicController', [
	    '$scope',
	    'getUser',
	    'SERVER',
	    'PATHTOIMAGES',
	    function ($scope, getUser, SERVER, PATHTOIMAGES) {
		    $scope.PATHTOIMAGES = PATHTOIMAGES;
		    getUser.getUser()
			    .then(responseUser => {
				    $scope.user = responseUser;
			    })
	    }]);