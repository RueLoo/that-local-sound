'use strict';

angular.module('dashboard').controller('DashboardController', ['$scope', '$stateParams', '$location', 'Authentication', 'User',
  function($scope, $stateParams, $location, Authentication, User) {
    $scope.authentication = Authentication;

    $scope.find = function() {
      $scope.users = User.query();//passes this guy to the html that calls this function
    };
  }
]);
