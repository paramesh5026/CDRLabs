var mongoose = require('mongoose');

module.exports = mongoose.model('Research', {
	firstName 		: 	String,
	lastName 		: 	String,
	studyId 		: 	String,
	studyName 		: 	String,
	studyDesc 		: 	String,
	studyOwnedBy	: 	String,
	userName		: 	String,
	password		: 	String,
	status			: 	String
});