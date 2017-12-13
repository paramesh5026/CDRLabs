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
var ActivitySchema = new Schema({
    
		activityname : 	{
					   type:		String,
					   trim: 		true,     
				       unique: 		true,
				       // make this a required field
				        required: 	'name cannot be blank',
				        // wires in a custom validator function (http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate).
				        //validate: 	[validateLength, 'name must be 15 chars in length or less']
		
					},
		activitydesc : {
						type:		String,
						trim: 		true
					},
					
		activitydate :	{type: Date,default: Date.now}
});



// Expose the model to other objects
module.exports =  mongoose.model('activities', ActivitySchema);