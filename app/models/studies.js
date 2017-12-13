var mongoose = require('mongoose');

module.exports = mongoose.model('studies', {
	
	studyId 		: 	String,
	studyName 		: 	String,
	studyDesc 		: 	String,
	studyOwnedBy	: 	String,
	studyApprovedBy	: 	String,
	location		:	String,
	participants	:   Number,
	biginDate		:	{type: Date,default: Date.now},
	startDate		:	{type: Date,default: Date.now},
	completionDate	:	{type: Date,default: Date.now},
	status			: 	String
});