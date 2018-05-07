angular.module('portfolio.homepage.contact')
	.factory('updateUserContact', [
		'$http',
		'SERVER',
		'toastService',
		'constants',
		'md5',
		'$cookies',
		($http, SERVER, toastService, constants, md5, $cookies) => {
			"use strict";
			return {
				updateUser: (contact) => {
					return $http
						.post(`${SERVER}/users/user/${$cookies.get(md5.createHash(constants.KEYS.userId))}/update/contact`,
							contact)
						.then(data => {
							return data.data;
						})
						.catch(() => {
							toastService.showToast('Internal Server error, please try again later');
						});
				}
			};
		}]);