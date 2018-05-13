/**
 The MIT License (MIT)

 Copyright (c) 2016 Sander Hammelburg

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

angular.module('ngSimpleUpload', [])
	.directive('ngSimpleUpload', [
		'toastService',
		'SERVER',
		function (toastService, SERVER) {
		return {
			scope: {
				webApiUrl: '@',
				callbackFn: '=',
				buttonId: '@'
			},
			link: function (scope, element) {
				// if button id value exists
				if (scope.buttonId) {
					$('#' + scope.buttonId).on('click', function () {
						// retrieves files from file input
						let files = element[0].files;
						// will not fire until file(s) are selected
						if (files.length === 0) {
							toastService.showToast('No files detected for upload')
							return false;
						}

						Upload(files);
					});
				} else {
					// original code, trigger upload on change
					element.on('change', function (evt) {
						let files = evt.__files_ || (evt.target && evt.target.files);

						Upload(files);

						// removes file(s) from input
						$(this).val('');
					});
				}

				function Upload(files) {
					let fd = new FormData();
					angular.forEach(files, function (v, k) {
						fd.append('file', files[k]);
					});

					return $.ajax({
						type: 'POST',
						url: `${SERVER}${scope.webApiUrl}`,
						data: fd,
						async: true,
						cache: false,
						contentType: false,
						processData: false
					}).done(function (d) {
						// callback function in the controller
						scope.callbackFn(d);
						scope.$apply();
					}).fail(function () {
						toastService.showToast('Internal Server error, please try again later')
					});
				}
			}
		}
	}]);
