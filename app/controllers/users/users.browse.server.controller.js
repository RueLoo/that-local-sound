'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('../errors.server.controller'),
  User = mongoose.model('User'),
  _ = require('lodash');


/**
 * List of Users
 */
exports.list = function(req, res) {

 User.find().populate('user').exec(function(err, user) {// research this line
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(user);
    }
  });

};


/**
 * User middleware
 */
 exports.userById = function(req, res, next, id) {
   User.findById(id).populate('user', 'displayName').exec(function(err, gigrequest) {
     if (err) return next(err);
     if (!gigrequest) return next(new Error('Failed to load article ' + id));
     req.gigrequest = gigrequest;
     next();
   });
 };

 // /**
 //  * Article authorization middleware
 //  */
 // exports.hasAuthorization = function(req, res, next) {
 //   if (req.article.user.id !== req.user.id) {
 //     return res.status(403).send({
 //       message: 'User is not authorized'
 //     });
 //   }
 //   next();
 //
 // };
