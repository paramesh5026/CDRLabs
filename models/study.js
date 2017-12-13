'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


/**
 * Validation
 */
function validateLength (v) {
  // a custom validation function for checking string length to be used by the model
  return v.length <= 15;
}


/**
 * Category Schema
 */
var StudySchema = new Schema({
    
		studyid : 	{
					   type:		Number,
					   trim: 		true,     
				       unique: 		true,
				       // make this a required field
				        required: 	'study id cannot be blank',
				        // wires in a custom validator function (http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate).
				        //validate: 	[validateLength, 'name must be 15 chars in length or less']
		
					},
		studyname : {
						type:		String,
						trim: 		true,
						unique: 	true
					},
					
		studydesc  : {
						type:		String,
						default: 	'',
						// types have specific functions e.g. trim, lowercase, uppercase (http://mongoosejs.com/docs/api.html#schema-string-js)
						trim: 		true
					},
		
		studysubmittedby  		: 	String,
		studyapprovedby			: 	String,
		location				:	String,
		participants			:	Number,
		begindate				:	{type: Date,default: Date.now},
		startdate				:	{type: Date,default: Date.now},
		completiondate			:	{type: Date,default: Date.now},
		status					: 	String	
	
});



// Expose the model to other objects
module.exports =  mongoose.model('studies', StudySchema);