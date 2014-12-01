'use strict';
//Articles service used for communicating with the articles REST endpoints
angular.module('browse').factory('User', ['$resource',function($resource) {
  return $resource('browse/:userId', {userId:'@_id'});}]);
    // need help with the service
