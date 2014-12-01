'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
errorHandler = require('./errors.server.controller'),
User = mongoose.model('User'),
_ = require('lodash');

/**
* Show the current user
*/
exports.read = function (request, response) {
  response.json(request.User);
};

/**
* List of Users
*/
exports.list = function (req, res) {
  User.find({userType:'artist'}).populate('user').exec(function (err, user) {// research this line
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
exports.userByID = function (req, res, next, id) {
  User.findById(id).populate('user').exec(function (err, user) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else{
      res.json(user);
    }
    //   return next(err);
    // if (!user) return next(new Error('Failed to load User ' + id));
    // req.user = user;
     next();
  });
};




//  User.findById(id).populate('user').exec(function (err, user) {
//    if (err) return next(err);
//    if (!user) return next(new Error('Failed to load user ' + id));
//    req.user = user;
//    next();
//  });

// exports.userByID = function (req, res, next, id) {
//   User.findOne({
//     _id: id
//   }).exec(function (err, user) {
//     if (err) return next(err);
//     if (!user) return next(new Error('Failed to load User ' + id));
//     req.profile = user;
//     next();
//   });
// };
/**
* Article authorization middleware
*/
exports.hasAuthorization = function (req, res, next) {
  if (req.user.id !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }
  next();
};
