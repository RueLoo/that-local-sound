'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Request = mongoose.model('Request'),
	_ = require('lodash');

/**
 * Create a Request
 */
exports.create = function(req, res) {
	var request = new Request(req.body);
	request.fromBusiness = req.user;

	request.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(request);
		}
	});
};

/**
 * Show the current Request
 */
exports.read = function(req, res) {
	res.jsonp(req.request);
};

/**
 * Update a Request
 */
exports.update = function(req, res) {
	var request = req.request ;

	request = _.extend(request , req.body);

	request.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(request);
		}
	});
};

/**
 * Delete an Request
 */
exports.delete = function(req, res) {
	var request = req.request ;

	request.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(request);
		}
	});
};

/**
 * List of Requests
 */
exports.list = function(req, res, id) {
	Request.find({$or:[{fromBusiness:req.user.id}, {toArtist:req.user.id}]}).sort('-created').populate('user').exec(function(err, requests) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(requests);
		}
	});
};
// show me all the request that this business is linked too.


// show me all the request that this artist is linked too.

// alright the request need to list by fromBusiness and then another search for by artist.

/**
 * Request middleware
 */
exports.requestByID = function(req, res, next, id) {
	Request.findById(id).populate('user', 'displayName').exec(function(err, request) {
		if (err) return next(err);
		if (! request) return next(new Error('Failed to load Request ' + id));
		req.request = request ;
		next();
	});
};

/**
 * Request authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.request.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
