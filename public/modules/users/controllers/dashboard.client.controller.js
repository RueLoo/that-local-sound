'use strict';
angular.module('users').controller('DashboardController', ['$scope', '$http', '$location','$routeSegment', 'User', 'Authentication',
function($scope, $routeSegment, $http, $location, Users, Authentication) {
  $scope.user = Authentication.user;
  $scope.$routeSegment = $routeSegment;

  }
]);
