'use strict';
//Articles service used for communicating with the articles REST endpoints
angular.module('browse').factory('User', ['$resource',
  function($resource) {
    return $resource('browse/', {userId: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });
    // need help with the service
  }
]);
