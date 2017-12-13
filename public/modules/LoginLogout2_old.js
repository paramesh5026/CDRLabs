'use strict';
 
var auth = angular.module('Authentication',['ngMessages','SessionDetails']);

auth.controller('SignupControl',
	    ['$scope', '$rootScope', '$location','$http',
	    function ($scope, $rootScope, $location,$http) {
	    	
	    	console.log("SignupControl");
	    	
	    	/**************** User Registration ***********************/
	    	 //SignUp Function
	         $scope.signUp = function () {
	        	
	         	//Navigate to home page after successfull login
	         	var url = "/defaultHome";
	         	
	         	$http.post('/api/createUser',$scope.formData)
		    	.success(function(data){
			    	
		    			$scope.formData = {};
		    		
		    			console.log("Data from json"+data);
			    		
			    		//Navigate to home page
	                     $location.path(url);
		    		})
		    	.error(function(data){
		    			console.log("Error getting data from ");
		    	 	})	
	         	
	         	
	         	//Data loading Image
	             $scope.dataLoading = true;
	
	         };//End of Login Function
	     	
	         
	         
	         /**************** Reset Signup form ***********************/
	         //Reset SingUp Function
	         $scope.resetSignUp = function () {
	        	
	        	 try {
	                 /*var controlNames = Object.keys(signupform).filter(function (key) { return key.indexOf('$') !== 0 });

	                 console.log(controlNames);
	                 for (var x = 0; x < controlNames.length; x++) {
	                	 signupform[controlNames[x]].$setViewValue(undefined);
	                 }*/
	                 angular.copy({},$scope.formData);
	                 
	                 $scope.formData.$setPristine();
	                 
	                 $scope.formData.$setUntouched();
	                 
	             } catch (e) {  
	            	 
	                 console.log('Error in Reset Signup From');
	                 
	                 console.log(e);
	             }
	             
	        		        	 
	         };//End of reset SignUp Function
	    	
	    }]);


//****************************** Login ***************************************************************
auth.controller('LoginLogoutController',
    ['$scope', '$rootScope', '$location','$http','SessionService',
    function ($scope, $rootScope, $location, $http, SessionService) {
    	
    	//console.log("Module: Authentication ==> Controller:LoginController");
    	
    	
         
     	 //Login Function
         $scope.login = function () {
        	
         	//Navigate to home page after successfull login
         	var url = "/dashboard";
         	
         	// reset login status
        	SessionService.clearSessionDetails();
        	
         	//Data loading Image
             $scope.dataLoading = true;
             
             $http.get('/api/userLogin/'+$scope.userName+'/'+$scope.password)
             
		    	.success(function(data){
			    		
		    			//Message to console
		    			console.log('status:'+data.status);
		    			console.log('message:'+data.msg);
			    		
		    			if(data.status == 'success'){
			    			
			    			//Maintain session details
			    			SessionService.setSessionDetails("12345",$scope.userName, $scope.userName, "Admin");
			    			
				    		//Navigate to home page
		                     $location.path(url);
			    		}else{
			    			$scope.error = data.msg;
			    		}
		    			
		    		})
		    		
		    	.error(function(data){
		    			 console.log("Error getting data from ");
		    			 
		    			 SessionService.clearSessionDetails();
		    			 
		    			 $scope.error = data.msg;
		    			 
		    			 $scope.dataLoading = false;
		    	 	})	
        
         };//End of Login Function
         
         
       //Logout Function
         $scope.logout = function () {
        	
        	 console.log("*************Start of logout function******************");
        	 
         	//Navigate to home page after successfull login
         	var url = "/defaultHome";
         	
         	// reset login status
        	SessionService.clearSessionDetails();
        	
         	//Data loading Image
             $scope.dataLoading = true;
             
           //Navigate to home page
             $location.path(url);
             
             console.log("*************End of logout function******************");
        
         };//End of Login Function
    	
    }]);
 

auth.factory('loginService', function ($http, $log, $rootScope, $timeout, $cookies) {
	
	$log.log("Login Service initializing");
	 
	var oLoginService = {};
	 
	 
	oLoginService.Login = function (username, password, callback) {

		$http({
			url:	'/api/userLogin/'+username+'/'+password,
			method:	'GET'
				
		}).then(
			
			function(resp){
				callback(resp.data);
			},
			function(resp){
				callback(resp.data);
			}
		);
		
		
		
         /* Dummy authentication for testing, uses $timeout to simulate api call
          ----------------------------------------------*/
         $timeout(function(){
            
        	 console.log("Factory: AuthenticationService ==> function:Login ==> $timeout");
        	 
        	 var response = { success: username === 'test' && password === 'test' };
        	 
        	 console.log("response:"+response);
        	 
             if(!response.success) {
                 response.message = 'Username or password is incorrect';
             }
             
             callback(response);
             
         }, 1000);


         /* Use this for real authentication
          ----------------------------------------------*/
         //$http.post('/api/authenticate', { username: username, password: password })
         //    .success(function (response) {
         //        callback(response);
         //    });

     };
     
    
     
	return service;
	
	
});
