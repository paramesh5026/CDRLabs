var mongoose = require('mongoose');

module.exports = mongoose.model('users', {
	firstName 		: 	String,
	lastName 		: 	String,
	userName		: 	String,
	password		: 	String,
	role			: 	String,
	email			:	String,
	mobileNumber	:	String,
	village			:	String,
	state			:	String,
	country			:	String,
	pincode			:	String
});