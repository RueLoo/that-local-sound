'use strict';

module.exports = function(app) {
  // Root routing
  var dashboard = require('../../app/controllers/dashboard.server.controller');
  app.route('/dashboard').get(dashboard.index);
};
