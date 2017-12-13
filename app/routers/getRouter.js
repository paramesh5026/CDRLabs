/**
 * http://usejsdoc.org/
 */
//var user = require('../models/users');
var study = require('../models/studies');
var activity = require('../models/activities');
/*var mongoose = require('mongoose');
var user = mongoose.model('users');*/

//get all students
function getUsers(res){
	user.find(function(err, users){
		if(err)
			res.send();
		
		res.json(users);  //// return all persons in JSON format
	});
}


//Get All Activities
function getActivities(res){
	
	activity.find(
		function(err, activities){
			if(err)
				res.send();
		
				res.json(activities);  //// return all activities in JSON format
		});
}

function getStudies(res){
	study.find(function(err, studies){
		if(err)
			res.send();
		
		//Total number of rows
		console.log("Number of Rows:"+studies.length);
		
		console.log("Type:"+Object.prototype.toString.call(studies));
		
		
		
		/*var allStudies = new Array();
		
		// Each message is customized
		studies.forEach(function(study){
			
			study['daysCompleted'] = 10;
			
			allStudies.push(study);
		});*/
		
		/*// Each message is customized
		allStudies.forEach(function(study1){
					
			console.log("Study Name"+study1.studyName);
			console.log("Study days"+study1.daysCompleted);
		});*/
		
		res.json(studies);  //// return all persons in JSON format
	});
}


function searchStudies(res){
	
	study.find(function(err, studies){
		if(err)
			res.send();
		
		//Total number of rows
		console.log("Number of Rows:"+studies.length);
		
		console.log("Type:"+Object.prototype.toString.call(studies));
		
		
		
		/*var allStudies = new Array();
		
		// Each message is customized
		studies.forEach(function(study){
			
			study['daysCompleted'] = 10;
			
			allStudies.push(study);
		});*/
		
		/*// Each message is customized
		allStudies.forEach(function(study1){
					
			console.log("Study Name"+study1.studyName);
			console.log("Study days"+study1.daysCompleted);
		});*/
		
		res.json(studies);  //// return all persons in JSON format
	});
}

module.exports = function(app){
	
	//get all Studies
	app.get('/api/getStudies', function(req,res){
		
		console.log("Get All Studies");
		
		getStudies(res);
		
	});
	
	//get all Persons
	app.get('/api/searchStudies/:studyName/:studyStatus', function(req,res){
		
		console.log("Search Studies");
		
		study.find(function(err, studies){
			if(err){
				res.json({stauts: 'failure',message: 'Error in finding the study records' + req.params.id});
			}else{
				try{
					
					var allStudies = new Array();
					
					//Expected User Name
					var expStudyName = req.params.studyName;
					
					//Expected Status
					var expStatus 	= req.params.studyStatus;
					
					console.log("expStudyName:"+expStudyName);
					
					console.log("expStatus:"+expStatus);
					
					//if both the search criteria are empty
					if(expStudyName == 'undefined' && expStatus =='undefined'){
						allStudies = studies;
					}else{
						
						// Loop all the studies
						studies.forEach(function(study){
							
							if(expStatus =='undefined'){
								
								var patt = new RegExp(expStudyName);
								
								var matches = patt.test(study.studyName);
								
								if(matches){
									allStudies.push(study);
								}
								
							}else if(expStudyName == 'undefined'){
								
								var statusPatt = new RegExp(expStatus);
								
								var statusMatches = statusPatt.test(study.status);
								
								if(statusMatches){
									allStudies.push(study);
								}
								
							}else{
								
								var userPatt = new RegExp(expStudyName);
								
								var userMatches = userPatt.test(study.studyName);
								
								var statusPatt = new RegExp(expStatus);
								
								var statusMatches = statusPatt.test(study.status);
								
								if(userMatches && statusMatches){
									allStudies.push(study);
								}
							}
						});
					}
					
					
					console.log("Number of Rows:"+allStudies.length);
					
					res.json(allStudies);
				}catch(err) {
					res.json({stauts: 'failure',message: 'Error in finding the study records' + req.params.id});
				}
				
			}
				
		});
	});
	
	//get all Persons
	app.get('/api/getUsers', function(req,res){
		getUsers(res);
	});
	
	//Get All the Activities
	app.get('/api/getActivities', function(req,res){
		getActivities(res);
	});
	
	//Login Logic
	app.get('/api/userLogin/:username/:password', function(req,res){
	
		console.log("validating user name & password");
		
		user.findOne({userName:req.params.username }, function (err, users) {

		        if (err) {
		        	res.json({status:'error',msg:'Somthing Wrong!'});
	//	            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
		        }
		       
		        
		        if (users) {
		        	
		        		console.log("Got the result from the database");
		        		console.log("actual pwd:"+users.password+" Expected password:"+req.params.password);
		        		
		                if (req.params.password == users.password) {
		                	
		                	res.json({status:'success',msg:'verified username & password'});
	
		                    } else {
		                    	res.json({status:'failure',msg:'Username or password is incorrect'});
	//	                    return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.INVALID_PWD } }));
		                }
		        } else {
	//	            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.EMAIL_NOT_FOUND } }));
		        	res.json({status:'failure',msg:'Username or password is incorrect'});
		        }

	    	});
	});

	
	//get User Details
	app.get('/api/getUserDetails/:username', function(req,res){
	
		console.log('Getting user details for the user \''+req.params.username+'\'.');
		
		user.findOne({userName:req.params.username }, function (err, users) {

		        if (err) {
		        	res.json({status:'error',msg:'Somthing Wrong!'});
		        }
		        
		        //console.log('Retrieved user name: '+users.userName);
		        
		        if (users) {
		        	
		        	res.json(users); 	
		        } else {
		        	res.json({status:'failure',msg:'Unable to retrieve user \''+req.params.username+ '\' details.'});
		        }

	    	});
	});
	
		// application -------------------------------------------------------------
		app.get('*', function(req, res) {
			res.sendfile('./public/CDR.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};