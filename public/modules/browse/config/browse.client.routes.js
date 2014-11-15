'use strict';

// Setting up route
angular.module('browse').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');

    // Home state routing
    $stateProvider.
    state('browse', {
      url: '/browse/',
      templateUrl: 'modules/browse/views/browse.client.view.html'
    });
  }
]);
