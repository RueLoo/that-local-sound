'use strict';
console.log('index.client.controller.js'+' loaded');
angular.module('inbox').controller('InboxController', ['$scope', '$stateParams', '$location', 'Authentication', 'Inbox',
	function($scope, $stateParams, $location, Authentication, Inbox) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Inbox({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();//passes this guy to the html that calls this function
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({//this is a .Where function? - yea i'm pretty sure
				articleId: $stateParams.articleId
			});
		};
	}
