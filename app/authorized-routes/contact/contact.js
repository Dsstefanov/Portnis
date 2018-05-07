'use strict';

angular.module('portfolio.homepage.contact', [
	'ngRoute',
	'portfolio.get-user',
	'portfolio.delete-cached-user'
])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/contact', {
			templateUrl: './app/authorized-routes/contact/contact.html',
			controller: 'ContactController'
		});
	}])
	.controller('ContactController', [
		'$scope',
		'$location',
		'getUser',
		'deleteCachedUser',
		'updateUserContact',
		'toastService',
		'constants',
		function($scope, $location, getUser, deleteCachedUser, updateUserContact,
		         toastService, constants) {
			let user;
			getUser.getUserById()
				.then(user => {
					if(angular.isUndefined(user.contact)){
						user.contact = {};
					}
					$scope.user = user;
				});
			$scope.submit = () => {
				updateUserContact.updateUser($scope.user.contact)
					.then((msg) => {
						toastService.showToast(msg, null, constants.TOAST_SUCCESS.delay, constants.TOAST_SUCCESS.position)
						deleteCachedUser.deleteCachedUser()
							.then(() => {
								getUser.getUserById();
								$location.path('/')
							});
					});
			};
		}]);