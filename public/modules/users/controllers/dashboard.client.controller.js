'use strict';
angular.module('users').controller('DashboardController', ['$scope', '$http', '$location','$routeSegment', 'User', 'Authentication',
function($scope, $routeSegment, $http, $location, Users, Authentication) {
  $scope.authentication = Authentication;
  $scope.show = true;

  $scope.show1 = function() {
    return false; 
  };
  }
]);
