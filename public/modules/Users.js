'use strict';

var usersmodule = angular.module('UsersModule',['AdminServiceModule','ngMessages','ui.bootstrap','export.csv']);


usersmodule.filter('startFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return [];
	};
});



usersmodule.controller('Users',
	    ['$scope', '$rootScope','$http','$log','adminService','filterFilter',
	    function ($scope, $rootScope,$http,$log,adminService, filterFilter) {
	    	
	    	console.log("*********** Users Table Dispaly ***************************");
	    	
	    	// column to sort
	    	$scope.userSortCol = 'userName';
	    	
	    	$scope.pendingRequests = 5;
	    	
	    	// sort ordering (Ascending or Descending). Set true for descending
	    	$scope.userReverse = false;
	    	
	    	/*$scope.allstatus = ["","Queue", "InProgress", "Completed"];*/
	    	
	    	//Data loading Image
            //$scope.isLoading = true;
            
            adminService.getUsers().then(
	           	function mySuccess(response) {
	           		//Message to console
	           		/*$log.log('status:'+response.status);
	           		$log.log('status:'+response.statusText);
	           		$log.log('status:'+response.data.length);*/
	           		
	           		$scope.users = response.data;
	           		
	           		// pagination controls
					$scope.currentPage = 1;
					$scope.totalItems = $scope.users.length;
					
					$scope.entryLimit = 8; // items per page
					$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
			
	           	}, 
	           	
	           	function myError(response) {
	           		 	$log.log("Error getting data from users table.");
		    		  // $scope.isLoading = false;
		    			/* SessionService.clearSessionDetails();
		    			 $scope.error = response.data.msg;*/
	           	}
            );
            
            
            // called on header click
            $scope.userSortColumn = function(col){
	             $scope.userSortCol = col;
	             
	             if($scope.userReverse){
	            	 $scope.userReverse = false;
	            	 $scope.reverseclass = 'arrow-up';
	             }else{
	            	 $scope.userReverse = true;
	            	 $scope.reverseclass = 'arrow-down';
	             }
            };
            
            $scope.userSortClass = function(col){
            	
            	if($scope.userSortCol == col ){
            		  if($scope.userReverse){
            			  return 'arrow-down'; 
            		   }else{
            			   return 'arrow-up';
            		   }
            	}else{
            		   return '';
            	}
            	
            }
            
            // delete user after confirmation
	  	    $scope.deleteUser = function(username) {
	  	    	
	  	    	if (confirm('Are you sure, You want to delete user \''+username+'\'?')){
	  	    		
		  	    	//user data from html page
			         	var response = adminService.deleteUser(username);
			         	
			         	response.success(function (data) {
			         		
			         		$scope.users = data;
			           		
			           		// pagination controls
							$scope.currentPage = 1;
							$scope.totalItems = $scope.users.length;
							
							$scope.entryLimit = 8; // items per page
							$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
			        			
			        	 }); 
			        	           	
			         	response.error(function(res) {
			        	     $log.log("Error during deleting user:"+data.toString());
			        		 //$scope.isLoading = false;
			        		 //errorMessage = "failure message: " + JSON.stringify({data: data});
			        		 $log.log(e);  			
			        	});
	  	    	};//End if
	  	       
	  	    };//End of function delete User
	  	    
	  	    
          //Search Studies function
            $scope.searchStudies = function () {
           	
            	$log.log('Search Studies');
            	
            	//Data loading Image
                //$scope.isLoading = true;
                
                var studyName 	= $scope.searchStudyName;
                var studyStatus = $scope.searchStudyStatus;
                
               
                $log.log("StudyName:"+studyName+"  Study Status:"+studyStatus);
                
                if(studyName == ''){
                	studyName = 'undefined';
                }
                
                if(studyStatus == ''){
                	studyStatus = 'undefined';
                }
                
                studyService.searchAndGetStudies(studyName, studyStatus).then(
        	           	function mySuccess(response) {
        	           		//Message to console
        	           		$log.log('status:'+response.status);
        	           		$log.log('status:'+response.statusText);
        	           		$log.log('status:'+response.data.length);
        	           		
        	           		$scope.studies = response.data;
        	           		
        	           		// pagination controls
        					$scope.currentPage = 1;
        					$scope.totalItems = $scope.studies.length;
        					
        					$scope.entryLimit = 8; // items per page
        					$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
        			
        	           	}, 
        	           	
        	           	function myError(response) {
        	           		 	$log.log("Error getting data from ");
        		    			 //$scope.isLoading = false;
        		    			/* SessionService.clearSessionDetails();
        		    			 $scope.error = response.data.msg;*/
        	           	}
                    );
                
               
                
            };//End of searchStudies Function
	    	
	  }]);


//******************************************************************************************
//Start: Pending Users
//******************************************************************************************
usersmodule.controller('PendingUsersCtrl',
	    ['$scope', '$rootScope','$http','$log','adminService','$location',
	    function ($scope, $rootScope,$http,$log,adminService, $location) {
	    	
	    	console.log("*********** Pending Users Dispaly ***************************");
	    	
	    	//Data loading Image
            //$scope.isLoading = true;
            
            adminService.getUsers().then(
	           	function mySuccess(response) {
	           		//Message to console
	           		/*$log.log('status:'+response.status);
	           		$log.log('status:'+response.statusText);
	           		$log.log('status:'+response.data.length);*/
	           		
	           		$scope.users = response.data;
	           		
	           		// pagination controls
					$scope.currentPage = 1;
					$scope.totalItems = $scope.users.length;
					
					$scope.entryLimit = 8; // items per page
					$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
			
	           	}, 
	           	
	           	function myError(response) {
	           		 	$log.log("Error getting data from users table.");
		    		  // $scope.isLoading = false;
		    			/* SessionService.clearSessionDetails();
		    			 $scope.error = response.data.msg;*/
	           	}
            );
            
            
            /**************** Back to Users Page ***********************/
	         //Navigates to users page
	         $scope.backToUsers = function () {
	        	
	         	//Navigate to users page
	         	var url = "/users";
	         	
	         	/*$scope.dataLoading = true;*/
	         	
	         	$location.path(url);
	         	
	         	//Data loading Image
	            /* $scope.dataLoading = false;*/
	
	         };//End of cancelUserForm Function
}]);

//******************************************************************************************
//End: Pending Users
//******************************************************************************************





usersmodule.controller('NewUserControl',
	    ['$scope', '$rootScope', '$location','$http','$log','adminService',
	    function ($scope, $rootScope, $location,$http, $log,adminService) {
	    	
	    	$log.log("New User Control");
	    	
	    	$scope.userroles = ["Researcher", "Admin"];
	    	
	    	/**************** User Registration ***********************/
	    	 //New User Function
	         $scope.createUser = function () {
	        	
	         	//Navigate to user page
	         	var url = "/users";
	         	 
	         	//user data from html page
	         	var response = adminService.createUser($scope.userFormData);
	         	
	         	response.success(function (res) {
	         		
	         		$scope.userFormData = {};
		    		
	         		$log.log("User Creation Status:"+res.status);
	         		$log.log("User Creation Message:"+res.msg);
		    		
		    		//Navigate to home page
                     $location.path(url);
	        			
	        	 }); 
	        	           	
	         	response.error(function(res) {
	        	     $log.log("Error during submitting user form:"+data.toString());
	        		 //$scope.isLoading = false;
	        		 //errorMessage = "failure message: " + JSON.stringify({data: data});
	        		 $log.log(e);  			
	        	});
	                
	         };//End of createUser Function
	     	
	         
	         
	         /**************** Reset New User form ***********************/
	         //Reset New User Function
	         $scope.resetUserDetails = function () {
	        	
	        	 try {
	        		 
	        		 $scope.userFormData = {};
	                 
	             } catch (e) {  
	            	 
	            	 $log.log('Error in Reset Signup From');
	                 
	            	 $log.log(e);
	             }
	             
	        		        	 
	         };//End of reset SignUp Function
	    	
	         
	         /**************** Cancel New User form ***********************/
	         //Cancel New User Form : Navigates to users page
	         $scope.cancelUserForm = function () {
	        	
	         	//Navigate to users page
	         	var url = "/users";
	         	
	         	$scope.userFormData = {};
	         	
	         	/*$scope.dataLoading = true;*/
	         	
	         	$location.path(url);
	         	
	         	//Data loading Image
	            /* $scope.dataLoading = false;*/
	
	         };//End of cancelUserForm Function
	         
 }]); //End of NewUserControl


usersmodule.controller('UpdateUserControl',
	    ['$scope', '$rootScope', '$location','$http','$log','adminService','$stateParams',
	    function ($scope, $rootScope, $location,$http, $log,adminService,$stateParams) {
	    	
	    	$log.log("Update User Control");
	    	
	    	$scope.userroles = ["Researcher", "Admin"];
	    	
	    	adminService.getUserDetails($stateParams.username).then(
		           	function mySuccess(response) {
		           		//Message to console
		           		$log.log('status:'+response.status);
		           		$log.log('status:'+response.statusText);
		           		$log.log('status:'+response.data.length);
		           		
		           		$scope.updateUserFormData = response.data;
		           		
		           		/*if(response.data.length > 0){
		           			$scope.updateUserFormData = response.data[0];
		           		}else{
		           			var msg = 'user \''+$stateParams.userid+'\' not found';
		           		}*/
		           						
		           	}, 
		           	
		           	function myError(response) {
		           		 	$log.log("Error getting data from users for update user.");
		           	}
	            );
	    	
	    	
	    	/**************** Update user Registration ***********************/
	    	 //Update User Function
	         $scope.updateUser = function () {
	        	
	         	//Navigate to user page
	         	var url = "/users";
	         	 
	         	//user data from html page
	         	var response = adminService.updateUser($scope.updateUserFormData);
	         	
	         	response.success(function (res) {
	         		
	         		$scope.updateUserFormData = {};
		    		
	         		$log.log("User update Status:"+res.status);
	         		$log.log("User update Message:"+res.msg);
		    		
		    		//Navigate to home page
                     $location.path(url);
	        			
	        	 }); 
	        	           	
	         	response.error(function(res) {
	        	     $log.log("Error during update user form:"+res.msg);
	        		 //$scope.isLoading = false;
	        		 //errorMessage = "failure message: " + JSON.stringify({data: data});
	        		 $log.log(e);  			
	        	});
	                
	         };//End of createUser Function
	     	
	         
	         
	         	    	
	         
	         /**************** Cancel New User form ***********************/
	         //Cancel Update User Form : Navigates to users page
	         $scope.cancelUpdateUserForm = function () {
	        	
	         	//Navigate to users page
	         	var url = "/users";
	         	
	         	$scope.updateUserFormData = {};
	         	
	         	/*$scope.dataLoading = true;*/
	         	
	         	$location.path(url);
	         	
	         	//Data loading Image
	            /* $scope.dataLoading = false;*/
	
	         };//End of cancelUserForm Function
	         
 }]); //End of NewUserControl





//******************************************************************************************
//		Start: User SignUp
//******************************************************************************************

usersmodule.controller('SignUpCtrl',
	    ['$scope', '$rootScope', '$location','$http','$log','adminService',
	    function ($scope, $rootScope, $location,$http, $log,adminService) {
	    	
	    	//$log.log("SignUp User Control");
	    	
	    	 
/**************** Start: Singup User Registration ***********************/
	    	 //New User Function
	         $scope.signUpUser = function (signupdata) {
	        	
	         	//Navigate to home page after user creation
	         	var url = "/defaultHome";
	         	var errorexists = true;

	         	//Checking validity of signup form
	         	if($scope.signupform.$valid)
	         	{
	         		errorexists = false;
	         	}
	         	
	         	
	         	if(!errorexists)
	         	{
	         		//user data from html page
		         	var response = adminService.signupUser(signupdata);
		         	
		         	response.success(function (res) {
		         		
		         		$scope.userFormData = {};
			    		
		         		$log.log("User Creation Status:"+res.status);
		         		$log.log("User Creation Message:"+res.msg);
			    		
			    		//Navigate to home page
	                     $location.path(url);
		        			
		        	 }); 
		        	           	
		         	response.error(function(res) {
		        	     //$log.log("Error during submitting user form:"+data.toString());
		        		 //$scope.isLoading = false;
		        		 //errorMessage = "failure message: " + JSON.stringify({data: data});
		        		 //$log.log(e);  			
		        	});
	         		
	         	}//End of if(!errorexists)
	         	
	                
	         };//End of Singup User Function
/**************** End: Reset Singup User form **************************/	     	
	         
	         
/**************** Start: Reset Signup User form ***********************/
	         //Reset Signup Form
	         $scope.resetSignupUserDetails = function () {
	        	
	        	 try {
	        		 
	        		 $scope.signupformdata = {};
	                 
	             } catch (e) {  
	            	 
	            	 $log.log('Error in Reset Signup From');
	                 
	            	 $log.log(e);
	             }
	             
	        		        	 
	         };//End of reset SignUp Function
/**************** End: Reset Singup User form **************************/
	    	
	         
/**************** Start: Cancel Singup User form ***********************/
	         //Cancel New User Form : Navigates to users page
	         $scope.cancelSingupForm = function () {
	        	
	         	//Navigate to home page
	         	var url = "/defaultHome";
	         	
	         	try {
	        		 
	         		/*$scope.dataLoading = true;*/
		         	
		         	$location.path(url);
		         	
		         	//Data loading Image
		            /* $scope.dataLoading = false;*/
	                 
	             } catch (e) {  
	            	 
	            	 $log.log('Error in Reset Signup From');
	                 
	            	 $log.log(e);
	             }
	             
	         };//End of cancelSingupForm Function

/**************** End: Cancel Singup User form ***********************/	  
	         
 }]); //End of Signup User Control

//******************************************************************************************
//End: User SignUp
//******************************************************************************************

