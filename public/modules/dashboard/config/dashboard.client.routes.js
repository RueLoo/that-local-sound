'use strict';

// Setting up route
angular.module('dashboard').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');

    // Home state routing
    $stateProvider.
    state('dashboard', {//just serving as a pointer for the URL ahref link - YES
      url: '/dashboard/',
      templateUrl: 'modules/dashboard/views/dashboard.client.view.html'
    }).
    state('dashboardProfile', {//just serving as a pointer for the URL ahref link - YES
      url: '/dashboard/profile',
      templateUrl: 'modules/dashboard/views/profile.client.view.html'
    }).
    state('dashboardInbox', {//just serving as a pointer for the URL ahref link - YES
      url: '/dashboard/inbox',
      templateUrl: 'modules/dashboard/views/inbox.client.view.html'
    }).
    state('dashboardRequest', {//just serving as a pointer for the URL ahref link - YES
      url: '/dashboard/request',
      templateUrl: 'modules/dashboard/views/request.client.view.html'
    });
  }
]);
