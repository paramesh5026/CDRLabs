/*var router  		= require('express').Router();*/

//var router = express.Router();

var base = process.env.PWD;

var user  		= require('../controllers/users');
var study  		= require('../controllers/studies');
var activity  	= require('../controllers/activities');
var location  	= require('../controllers/locations');
var multer		= require('multer');


module.exports = function(app){
	
	//Authentication
	app.get('/api/userLogin/:username/:password',user.authenticateUser);
	
	
	//************   Users  **********************************************	
	//signup user
	app.post('/api/signupUser',user.signupUser);
	
	//create user
	app.post('/api/createUser',user.createUser);
	
	//update user
	app.put('/api/updateUser', user.updateUser);
		
	//delete user
	app.delete('/api/deleteUser/:username', user.deleteUser);
	
	//get all users
	app.get('/api/getUsers', user.getUsers);
	
	//get specific user details
	app.get('/api/getUserDetails/:username',user.getUserDetails);
	
	
	//************   Activities  **********************************************	
	//create activity
	app.post('/api/createActivity',activity.createActivity);
	
	//update activity
	app.put('/api/updateActivity', activity.updateActivity);
		
	//delete activity
	app.delete('/api/deleteActivity/:activityname', activity.deleteActivity);
	
	//get all activities
	app.get('/api/getActivities', activity.getActivities);
	
	//get datewise activities
	app.get('/api/getDateWiseActivities', activity.getDateWiseActivities);
	
	//get specific activity details
	app.get('/api/getActivityDetails/:activityname',activity.getActivityDetails);
	
	
	//************   Locations  **********************************************	
	
	//create location
	app.post('/api/createLocation',location.createLocation);
	
	//upload location image
	//app.post('/api/uploadLocationImage',upload.any(),location.uploadLocationImage);
	app.post('/api/uploadLocationImage',location.uploadLocationImage);
	
	//delete activity
	app.delete('/api/deleteLocation/:locationshortname', location.deleteLocation);
	
	//get all locations
	app.get('/api/getLocations', location.getLocations);
	
	//get location images
	app.get('/api/getLocationImages/:locationshortname', location.getLocationImages);
	
	//get specific location details
	app.get('/api/getLocationDetails/:locationshortname',location.getLocationDetails);
	
	
	
	//************   Studies  **********************************************
	//add study
	app.post('/api/submitNewStudy',study.addstudy);
	
	//search studies
	app.get('/api/searchStudies/:studyName/:studyStatus',study.searchStudies);
	
	//get studies
	app.get('/api/getStudies',study.getAllStudies);
	
};
