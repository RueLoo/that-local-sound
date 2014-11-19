'use strict';
console.log('articles.client.service.js'+' loaded');
//Articles service used for communicating with the articles REST endpoints
angular.module('browse').factory('Browse', ['$resource',
  function($resource) {
    return $resource('user/:userId', {userId: '@_id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
