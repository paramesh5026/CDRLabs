var mongoose = require('mongoose');

module.exports = mongoose.model('activities', {
	
	activityId 				: 	String,
	activityName 			: 	String,
	activityDescription 	: 	String,
	date					:	{type: Date,default: Date.now}
});