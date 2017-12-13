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
var UserSchema = new Schema({
    
		username : 	{
					   type:		String,
					   trim: 		true,     
				       unique: 		true,
				       // make this a required field
				        required: 	'name cannot be blank',
				        // wires in a custom validator function (http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate).
				        //validate: 	[validateLength, 'name must be 15 chars in length or less']
		
					},
		firstname : {
						type:		String,
						trim: 		true
					},
					
		lastname  : {
						type:		String,
						default: 	'',
						// types have specific functions e.g. trim, lowercase, uppercase (http://mongoosejs.com/docs/api.html#schema-string-js)
						trim: 		true
					},
		password  		: 	String,
		role			: 	String,
		email			:	{
								type:		String,
								trim: 		true,     
								unique: 	true,
								required: 	'email cannot be blank',
							},
		mobile			:	String,
		status	 		: 	String,
		cnetid			:	String,
		village			:	String,
		state			:	String,
		country			:	String,
		pincode			:	String		
	
});



// Expose the model to other objects
module.exports =  mongoose.model('users', UserSchema);