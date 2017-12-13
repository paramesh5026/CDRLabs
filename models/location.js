'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


/**
 * Validation
 *//*
function validateLength (v) {
  // a custom validation function for checking string length to be used by the model
  return v.length <= 15;
}*/


/**
 * Category Schema
 */
var LocationSchema = new Schema({
    
		locationshortname : 	{
					   type:		String,
					   trim: 		true,     
				       unique: 		true,
				       // make this a required field
				        required: 	'location short name cannot be blank.'
				        // wires in a custom validator function (http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate).
				        //validate: 	[validateLength, 'name must be 15 chars in length or less']

		},
		
		locationname : 	{
					   type:		String,
					   trim: 		true,     
				       unique: 		true,
				       // make this a required field
				        required: 	'location name cannot be blank.'
				        // wires in a custom validator function (http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate).
				        //validate: 	[validateLength, 'name must be 15 chars in length or less']
		
					},
		locationdesc : {
						type:		String,
						trim: 		true,
						required: 	'location description cannot be blank.'
					},
					
		locationimagepath: {
						type:		String,
						default: 	'',
						// types have specific functions e.g. trim, lowercase, uppercase (http://mongoosejs.com/docs/api.html#schema-string-js)
						trim: 		true
		},
		locationimages: {
						type:		String,
						default: 	'',
						// types have specific functions e.g. trim, lowercase, uppercase (http://mongoosejs.com/docs/api.html#schema-string-js)
						trim: 		true
					}
	
});



// Expose the model to other objects
module.exports =  mongoose.model('locations', LocationSchema);