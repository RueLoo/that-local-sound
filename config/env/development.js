'use strict';

module.exports = {
	db: 'mongodb://heroku:vHJ_e9nG2vty-g_a797Cfr3lbjNG2ejJjr0RBwdeqn51sB9gM_joKqNgeT0WKC4qTYJrlsuyp3QdS3bssOzWng@dogen.mongohq.com:10006/app31655276',
	app: {
		title: 'that-local-sound - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '736847689739746',
		clientSecret: process.env.FACEBOOK_SECRET || '544ddab6a44db3c76429fa7195f30c3e',
		//TODO:cannot test on local server. Change when on a live server
		callbackURL: 'https://localhost:3000/#!/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
