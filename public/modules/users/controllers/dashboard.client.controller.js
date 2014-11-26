'use strict';
angular.module('users').controller('DashboardController', ['$scope', '$http', '$location', 'User', 'Authentication',
function($scope, $http, $location, Users, Authentication) {
  $scope.user = Authentication.user;


  }
]);
