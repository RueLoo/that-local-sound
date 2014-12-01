'use strict';

/**
* Module dependencies.
*/
var passport = require('passport');
var users = require('../../app/controllers/browse.server.controller');


module.exports = function (app) {
  // User Routes

  // Setting up the users profile api
  app.route('/browse').get(users.list);
  app.route('/browse/:userId').get(users.read);
  //app.route('/browse/:userId')
  //.get(users.read);
  // Finish by binding the user middleware
  app.param('userId', users.userByID);
};
