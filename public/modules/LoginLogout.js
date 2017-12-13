'use strict';
 
var auth = angular.module('Authentication',['ngMessages','SessionDetails']);

auth.controller('SignupControl',
	    ['$scope', '$rootScope', '$log','$location','$http',
	    function ($scope, $rootScope,$log, $location,$http) {
	    	
	    	$log.log("Singup Control");
	    	
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
    ['$scope', '$rootScope', '$location','$log','$http','SessionService','loginService',
    function ($scope, $rootScope, $location,$log, $http, SessionService,loginService) {
    	
    	//console.log("Module: Authentication ==> Controller:LoginController");
    	
     	 //Login Function
         $scope.login = function () {
        	
         	//Navigate to home page after successfull login
         	var url = "/dashboard";
         	// reset login status
        	SessionService.clearSessionDetails();
         	//Data loading Image
             $scope.isLoading = true;
             
            
             loginService.login($scope.userName, $scope.password).then(
            	function mySuccess(response) {
            		//Message to console
            		$log.log('status:'+response.status);
            		$log.log('status:'+response.statusText);
            		$log.log('status:'+response.data.status);
            		$log.log('message:'+response.data.msg);
		    		
	    			if(response.data.status == 'success'){
	    				$scope.isLoading = false;
		    			//Maintain session details
		    			SessionService.setSessionDetails("12345",$scope.userName, $scope.userName, "Admin");
			    		//Navigate to home page
	                     $location.path(url);
	    			}else{
	    				$scope.isLoading = false;
		    			$scope.error = response.data.msg;
		    		}
            	}, 
            	
            	function myError(response) {
            		 $log.log("Error getting data from ");
	    			 $scope.isLoading = false;
	    			 SessionService.clearSessionDetails();
	    			 $scope.error = response.data.msg;
            	}
             );
             
             /* $http.get('/api/userLogin/'+$scope.userName+'/'+$scope.password)
		    	.success(function(data){
			    		
		    			//Message to console
		    			console.log('status:'+data.status);
		    			console.log('message:'+data.msg);
			    		
		    			if(data.status == 'success'){
			    			
		    				$scope.isLoading = false;
		    				
			    			//Maintain session details
			    			SessionService.setSessionDetails("12345",$scope.userName, $scope.userName, "Admin");
			    			
				    		//Navigate to home page
		                     $location.path(url);
			    		
		    			}else{
		    				
		    				$scope.isLoading = false;
		    				
			    			$scope.error = data.msg;
			    		}
		    			
		    		})
		    		
		    	.error(function(data){
		    			 console.log("Error getting data from ");
		    			 
		    			 $scope.isLoading = false;
		    			 
		    			 SessionService.clearSessionDetails();
		    			 
		    			 $scope.error = data.msg;
		    			 
		    			 
		    	 	})	*/
         };//End of Login Function
         
         
       //Logout Function
         $scope.logout = function () {
        	
        	$log.log("*************Start of logout function******************");
         	
        	//Navigate to home page after successfull login
         	var url = "/defaultHome";
         	
         	// reset login status
        	SessionService.clearSessionDetails();
         	
        	//Data loading Image
            $scope.dataLoading = true;
            
            //Navigate to home page
            $location.path(url);
            
            $log.log("*************End of logout function******************");
         };//End of Login Function
    	
    }]);
 






auth.factory('loginService', function ($http, $log, $rootScope, $timeout, $cookies) {
	
	$log.log("Login Service initializing");
	 
	var oLoginService = {};
	
	//Login API
	oLoginService.login = function (username, password) {
		return $http({
			url:	'/api/userLogin/'+username+'/'+password,
			method:	'GET'
				
		})
     };
     
   
	return oLoginService;
	
	
});
