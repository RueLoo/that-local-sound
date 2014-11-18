'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
  request = require('../../app/controllers/articles.server.controller');

module.exports = function(app) {
  // Article Routes
  app.route('/request')
    .get(request.list)
    .post(users.requiresLogin, request.create);
// this is a query i think
  app.route('/request/:requestId')
    .get(request.read)
    .put(users.requiresLogin, request.hasAuthorization, request.update)
    .delete(users.requiresLogin, request.hasAuthorization, request.delete);

  // Finish by binding the article middleware
  app.param('requestId', request.requestByID);
};
