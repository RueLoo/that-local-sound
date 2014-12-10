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
	dateOfGig:{
		type:Date
	},
	rehearsalTime:{
		type:Number
	},
	startTime:{
		type:Number
	},
	endTime:{
		type:Number
	},
	fromBusiness:{
		type:Schema.ObjectId,
		ref: 'User'
	},
	businessName:{
		type:String
	},
	artistName:{
		type:String
	},
	toArtist:{
		type:Schema.ObjectId,
		ref:'User'
	},
	created: {
		type: Date,
		default: Date.now
	},
	amount:{
		type:Number
	}
});

mongoose.model('Request', RequestSchema);
