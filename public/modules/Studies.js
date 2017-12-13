'use strict';

var studymodule = angular.module('studies',['ngMessages','ui.bootstrap']);

studymodule.controller('NewStudyControl',
	    ['$scope', '$rootScope', '$http','$log',
	    function ($scope, $rootScope,$http,$log) {
	    	
	    	$log.log("New Study Control");
	    	
	    	$scope.locations = ["Emil", "Tobias", "Linus"];
	    	
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
	    	
	    	 	
}]);