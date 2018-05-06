'use strict';

angular.module('portfolio.homepage.medias', [
	'ngRoute',
	'portfolio.get-user',
	'portfolio.delete-cached-user'
])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/medias', {
			templateUrl: './app/authorized-routes/medias/medias.html',
			controller: 'MediaController'
		});
	}])
	.controller('MediaController', [
		'$scope',
		'$location',
		'getUser',
		'deleteCachedUser',
		'updateUser',
		'toastService',
		'constants',
		function($scope, $location, getUser, deleteCachedUser, updateUser,
		         toastService, constants) {
			let user;
			getUser.getUserById()
				.then(data => {
					user = data;
					console.log(user)
					if(angular.isUndefined(user.socialMedias)){
						user.socialMedias = {};
					}
					$scope.user = user;
				});
			$scope.submit = () => {
				updateUser.updateUser(user.socialMedias)
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