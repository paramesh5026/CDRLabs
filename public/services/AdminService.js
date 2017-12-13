'use strict';
 
var adminServiceModule = angular.module('AdminServiceModule',[]);

adminServiceModule.factory('adminService', function ($http, $log) {
	
	$log.log("Admin Service initializing");
	 
	var oAdminService = {};
	
	//Signup User
	oAdminService.signupUser = function (userdata) {
		
		$log.log("Signup New User API");
		
		var result = $http.post('/api/signupUser',userdata);
		
		return result;
		
     };
     
	//Create New User
	oAdminService.createUser = function (userdata) {
		
		$log.log("Create New User API");
		
		var result = $http.post('/api/createUser',userdata);
		
		return result;
		
     };
     
   //Update User
 	oAdminService.updateUser = function (userdata) {
 		
 		$log.log("Update User API");
 		
 		var result = $http.put('/api/updateUser',userdata);
 		
 		return result;
 		
      };
     
   //Delete User
 	oAdminService.deleteUser = function (username) {
 		
 		$log.log("Delete User API");
 		
 		var result = $http.delete('/api/deleteUser/' + username);
 		
 		return result;
 		
      };
     
    //Get User details for update
  	oAdminService.getUserDetails = function (userName) {
  		
  		$log.log("Get User API");
  		
  		return $http({
  			url:	'/api/getUserDetails/'+userName,
  			method:	'GET'
  				
  		});
       };
     
	//Get All Users
	oAdminService.getUsers = function () {
		
		$log.log("Get Users API");
		
		return $http({
			url:	'/api/getUsers',
			method:	'GET'
				
		});
     };
     
   //Search Users
     oAdminService.searchUsers = function (userName) {
 		
    	 $log.log("Search Users API");
    	 
 		return $http({
			url:	'/api/searchUsers/'+userName,
			method:	'GET'
				
		});
      };
      
      
     //**************************************************************************
     //			Activities 
     //**************************************************************************
      
    //Create New Activity
  	oAdminService.createActivity = function (activitydata) {
  		
  		$log.log("Create New Activity API");
  		
  		var result = $http.post('/api/createActivity',activitydata);
  		
  		return result;
  		
       };
       
     //Update Activity
   	oAdminService.updateActivity = function (activitydata) {
   		
   		$log.log("Update Activity API");
   		
   		var result = $http.put('/api/updateActivity',activitydata);
   		
   		return result;
   		
        };
       
     //Delete Activity
   	oAdminService.deleteActivity = function (activityname) {
   		
   		$log.log("Delete Activity API");
   		
   		var result = $http.delete('/api/deleteActivity/' + activityname);
   		
   		return result;
   		
        };
       
      //Get Activity details for update
    	oAdminService.getActivityDetails = function (activityname) {
    		
    		$log.log("Get Activity Details API");
    		
    		return $http({
    			url:	'/api/getActivityDetails/'+activityname,
    			method:	'GET'
    				
    		});
         };
       
  	//Get All Activities
  	oAdminService.getActivities = function () {
  		
  		$log.log("Get Activities API");
  		
  		return $http({
  			url:	'/api/getActivities',
  			method:	'GET'
  				
  		});
       }; 
       
       
     //Get Datewise Activities
     	oAdminService.getDateWiseActivities = function () {
     		
     		//$log.log("Get Datewise Activities API");
     		
     		return $http({
     			url:	'/api/getDateWiseActivities',
     			method:	'GET'
     				
     		});
          }; 
      
    
       //**************************************************************************
       //			Locations 
       //**************************************************************************
     
       //Create New Location
      oAdminService.createLocation = function (locationdata) {
     		
     		$log.log("Create New Location API");
     		
     		var result = $http.post('/api/createLocation',locationdata);
     		
     		return result;
     		
       };
          
       oAdminService.uploadLocationImage = function (locationimage) {
       		
       		$log.log("Upload Location Image API");
       		
       		var result = $http.post('/api/uploadLocationImage',locationimage,{
       			
       				transformRequest: angular.identity,
       				headers: {'Content-Type': undefined}
       		});
       		
       		return result;
       		
        };
            
         
        //Delete Location
       	oAdminService.deleteLocation = function (locationshortname) {
       		
       		$log.log("Delete Location API");
       		
       		var result = $http.delete('/api/deleteLocation/' + locationshortname);
       		
       		return result;
       		
            };
          
     //Get Location details
   	oAdminService.getLocationDetails = function (locationshortname) {
   		
   		$log.log("Get Location Details API");
   		
   		return $http({
   			url:	'/api/getLocationDetails/'+locationshortname,
   			method:	'GET'
   				
   		});
    };
    
    //Get Location details
   	oAdminService.getLocationImages = function (locationshortname) {
   		
   		$log.log("Get Location Images API");
   		
   		return $http({
   			url:	'/api/getLocationImages/'+locationshortname,
   			method:	'GET'
   				
   		});
    };
    
 	//Get All Locations
 	oAdminService.getLocations = function () {
 		
 		$log.log("Get Activities API");
 		
 		return $http({
 			url:	'/api/getLocations',
 			method:	'GET'
 				
 		});
      }; 
       
       
       
       
       
       
	return oAdminService;
	
	
});
