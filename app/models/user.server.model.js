'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * User Schema
 */
var UserSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your first name']
	},
	lastName: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your last name']
	},
	displayName: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your email'],
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	username: {
		type: String,
		unique: 'testing error message',
		required: 'Please fill in a username',
		trim: true
	},
	password: {
		type: String,
		default: '',
		validate: [validateLocalStrategyPassword, 'Password should be longer']
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerData: {},
	additionalProvidersData: {},

	roles: {
		type: [{
			type: String,
			enum: ['user', 'artist', 'bussiness']
		}],
		default: ['user']
	},

	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
	/* For reset password */
	resetPasswordToken: {
		type: String
	},
	resetPasswordExpires: {
		type: Date
	},
	/* Address */
	// not required when the user logs in, but required when search is being used.
	// need to alert user at somepoint to add adress
 street_one:{
 	type:String,
 	default: ''
 },
 street_two:{
 	type:String,
 	default: ''
 },
 street_three:{
 	type:String,
 	default: ''
 },
 state:{
 	type:String
 },
 city:{
 	type:String,
 	default: ''
 },
 zipcode:{
 	type:String,
 	default: ''
 },
	 /* Billing stuff */
	// billing: {
	// 	first_name_on_card:{
	// 		type:String,
	// 	//	required:'Please enter a First Name'
	// 	},
	// 	last_name_on_card:{
	// 		type:String,
	// 	//	required:'Please enter a Last Name'
	// 	},
	// 	cvn:{
	// 		type:Number,
	// 	//	required:'Please enter the cvn number on the credit card'
	// 	},
	// 	card_number:{
	// 		type:Number,
	// 		//required:'Please enter the credit card number'
	// 	}
	// },
	stageName:{
		type:String,
		default: ''
	},
	 yearsPlayed:{
	 	type:Number,
		default:0
	 },
	 genre:{
	 	type:[String],
		default: '',
	 },
	 instrumentsPlayed:{
	 	type:[String],
		default: '',
	 },
	 bio:{
	 	type:String,
		default: ''
 },
	 pricePerGig:{
	 	type:Number
	 },
	nameOfBussiness:{
  	type:String,
			default: ''
	 },
	 descriptionOfBussines:{
	 	type:String
	 },
	 ownerOfBussiness:{
	 	type:String
	 }

	/*contians artist and bussines types*/

	//TODO: ask jake how to query the database correctly.
	/*end userTypes */
	// requests:[{
	// 	dateCreated:{
	// 		type:Date,
	// 		default:Date.now
	// 		},
	// 		dateOfGig:{
	// 		type:Date
	// 		},
	// 		startTimeOfGig:{
	// 			type:Date
	// 		},
	// 		endTimeOfGig:{
	// 			type:Date
	// 		},
	//
	// 		received:{
	// 			type:Boolean
	// 		},
	// 		accepted:{
	// 			type:Boolean
	// 		},
	// 		amountForGig:{
	// 			type:Number
	// 		},
	// 			// not sure how to do artistID
	// 		artistID:{
	// 			type:Number
	// 		}}]
});


/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

mongoose.model('User', UserSchema);
