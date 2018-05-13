angular.module('portfolio.homepage.projects')
	.factory('updateUserProjects', [
		'$http',
		'SERVER',
		'toastService',
		'constants',
		'md5',
		'$cookies',
		($http, SERVER, toastService, constants, md5, $cookies) => {
			"use strict";
			return {
				createProject: (project) => {
					project.ads = {
						technologies: project.technologies,
						image: project.image
					}
					return $http
						.post(`${SERVER}/users/user/${$cookies.get(md5.createHash(constants.KEYS.userId))}/create/project`,
							project)
						.then(data => {
							return data.data;
						})
						.catch((err) => {
							toastService.showToast('Internal Server error, please try again later');
							throw new Error(err);
						});
				}
			};
		}]);