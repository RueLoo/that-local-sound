'use strict';
// Setting up route
angular.module('browse').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // Home state routing
    $stateProvider.
    state('browse', {
      url: '/browse/',
      templateUrl: 'modules/browse/views/browse.client.view.html'
    });
  }
]);
