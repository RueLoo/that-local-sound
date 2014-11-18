'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Request Schema
 */
var RequestSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	/* need artistID */
		toArtist: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	/* need bussiness id */
	fromBussiness: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	/* even info */
	startTime:{
		type:Date,
		trim:true,
		required:'Must have a start time for event'
	},
	endTime:{
		type:Date,
		trim:true,
		required:'Must havea end time for the event'
	},
	rehearsalTime:{
		type:Date,
		trim:true,
		required:'Must have rehearsal time.'
	},
	amountForGig:{
		type:Number,
		trim:true,
		required:'Must have a payment for event'
	},


	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
	// Request model fields
	// ...
});

mongoose.model('Request', RequestSchema);
