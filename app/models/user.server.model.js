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
	//username is different depending on usertype.
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
	cell_phone_number:{
		type:Number
	},
	// what is salt for?
	salt: {
		type: String
	},
	// what is provide for?
	provider: {
		type: String,
		required: 'Provider is required'
	},
	// what is provider data for?
	providerData: {},

	additionalProvidersData: {},
	// I kinda see how this would work.
	roles: {
		type: [{
			type: String,
			enum: ['user', 'admin']
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

	address: {
		street_one:{
			type:String
		},
		street_two:{
			type:String
		},
		street_three:{
			type:String
		},
		state:{
			type:String
		},
		city:{
			type:String
		},
		zipcode:{
			type:String
		}
	},
	/* Billing stuff */
	billing: {
		first_name_on_card:{
			type:String,
			required:'Please enter a First Name'
		},
		last_name_on_card:{
			type:String,
			required:'Please enter a Last Name'
		},
		cvn:{
			type:Number,
			required:'Please enter the cvn number on the credit card'
		},
		card_number:{
			type:Number,
			required:'Please enter the credit card number'
		}
	},
	/*contians artist and bussines types*/
	userType:[
	{
		artist:{
			stageName:{
				type:String
			},
			yearsPlayed:{
				type:Number
			},
			genre:{
				type:[String]
			},
			instrumentsPlayed:{
				type:[String]
			},
			bio:{
				type:String
			},
			pricePerGig:{
				type:Number
			}
		}}, {
		bussiness:{
			nameOfBussiness:{
				type:String
			},
			descriptionOfBussines:{
				type:String
			},
			ownerOfBussiness:{
				type:String
	 }}}],
	/*end userTypes */
			requests:[{
				dateCreated:{
					type:Date.now
				},
				dateOfGig:{
					type:Date
				},
				startTimeOfGig:{
					type:Date
				},
				endTimeOfGig:{
					type:Date
				},
				received:{
					type:Boolean
				},
				accepted:{
					type:Boolean
				},
				amountForGig:{
					type:Number
				},
				// not sure how to do artistID
				artistID:{
					type:Number
				}
			}]
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
