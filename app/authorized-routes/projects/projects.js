'use strict';

angular.module('portfolio.homepage.projects', [
	'ngRoute',
	'portfolio.get-user',
	'portfolio.delete-cached-user'
])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/projects', {
			templateUrl: './app/authorized-routes/projects/projects.html',
			controller: 'ProjectController'
		});
	}])
	.controller('ProjectController', [
		'$scope',
		'$location',
		'getUser',
		'deleteCachedUser',
		'updateUserProjects',
		'toastService',
		'constants',
		function($scope, $location, getUser, deleteCachedUser, updateUserProjects,
		         toastService, constants) {
			let user;
			$scope.project = {};
			getUser.getUserById()
				.then(user => {
					$scope.user = user;
				});

			/*$scope.submit = () => {
				updateUserMedias.updateUser(user.projects)
					.then((msg) => {
						toastService.showToast(msg, null, constants.TOAST_SUCCESS.delay, constants.TOAST_SUCCESS.position)
						deleteCachedUser.deleteCachedUser()
							.then(() => {
								getUser.getUserById();
								$location.path('/')
							});
					});
			};*/

			$scope.addProject = () => {
				updateUserProjects.createProject($scope.project)
					.then((data) => {
						deleteCachedUser.deleteCachedUser()
							.then(() => {
							getUser.getUserById()
								.then((user) => {
									$scope.user = user;
									$scope.project = {};
								})
							})
					})
			}

			$scope.addTechnology = () => {
				if(angular.isUndefined($scope.project.technologies)){
					$scope.project.technologies = [];
				}
				$scope.project.technologies.push($scope.project.technology);
				$scope.project.technology = '';
			}

			$scope.removeProject = (index) => {
				if (angular.isDefined(index)) {
					$scope.user.projects.splice(index, 1);
				}
			}

			$scope.removeTechnology = (index, collection) => {
				if (angular.isDefined(index) && angular.isDefined(collection)) {
					collection.splice(index, 1)
				}
			}

			$scope.appendFileToProject = (file) => {
				$scope.project.image = file;
			}
		}]);