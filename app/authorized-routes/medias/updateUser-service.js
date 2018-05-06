angular.module('portfolio.homepage.medias')
	.factory('updateUserMedias', [
		'$http',
		'SERVER',
		'toastService',
		'constants',
		'md5',
		'$cookies',
		($http, SERVER, toastService, constants, md5, $cookies) => {
			"use strict";
			return {
				updateUser: (socialMedias) => {
					return $http
						.post(`${SERVER}/users/user/${$cookies.get(md5.createHash(constants.KEYS.userId))}/update/social`,
							socialMedias)
						.then(data => {
							return data.data;
						})
						.catch(() => {
							toastService.showToast('Internal Server error, please try again later');
						});
				}
			};
		}]);