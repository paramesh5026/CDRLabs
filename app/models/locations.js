var mongoose = require('mongoose');

module.exports = mongoose.model('Location', {
	locatinId 				: 	String,
	locationName 			: 	String,
	locationAddress 		: 	String,
	locationDescription		:	String
});