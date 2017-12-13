'use strict';

var locations = angular.module('Home_LocationModule',[]);
// the storeController contains two objects:
// - store: contains the product list
// - cart: the shopping cart object

locations.controller('LogoContrl',
	    ['$scope', '$rootScope', '$location','$http','LocationService',
	    function ($scope, $rootScope, $location,$http,LocationService) {
	    	
	    console.log("LogoContrl**********************");
	    	 	
	    
	    //Campus Lab 	
	    var locationName = LocationService.getLocation();
	    
	    if(locationName != ''){
	    	$scope.logo = "assets/img/logos/downtown_logo.jpg";
	    }else{
	    	$scope.logo = "assets/img/logos/campus_logo.jpg";
	    }
	    
	    console.log("Location Name:"+locationName);
	    
	    //LocationService.clearLocation();
	    
}]);

locations.controller('LocationContrl',
	    ['$scope', '$rootScope', '$location','$http','LocationService',
	    function ($scope, $rootScope, $location,$http,LocationService) {
	    	
	    console.log("Location Control");
	    	 	
	   // $scope.logo = "assets/img/logos/campus_logo.jpg";
	    	
		 //Display Function
         $scope.displayLocation = function (locationName) {
        	
	    	console.log("Location Name:"+locationName);
	    	
	    	LocationService.setLocation(locationName);
	    	
	    	//Navigate to Location page with location details
         	var url = "/campusLab";

         	//Navigate to home page.
            $location.path(url);
	    	 	
         };//End of Display Function
	    
}]);



locations.controller('LocationDetails',
	    ['$scope', '$rootScope', '$location','$http','LocationService',
	    function ($scope, $rootScope, $location,$http,LocationService) {
	    	
	    	console.log("Location Details");
	    	
	    	/*$scope.logo = "assets/img/logos/downtown_logo.jpg";*/
	    	
	    	$http.get('assets/data/activities.json')
	    	.success(function(data){
		    		$scope.activities = data.activities;
		    		console.log("Data from json"+data);
		    
	    		})
	    	.error(function(data){
	    			console.log("Error getting data from ");
	    	 	})	
	    	 	
	    	 	
	    	$http.get('assets/data/studies.json')
	    	.success(function(data){
		    		$scope.studies = data.studies;
		    		console.log("Data from json"+data);
		    		
		    		// pagination controls
					$scope.currentPage = 1;
					$scope.totalItems = $scope.studies.length;
					
					$scope.entryLimit = 5; // items per page
					$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
		    		
	    		})
	    	.error(function(data){
	    			console.log("Error getting data from ");
	    	 	})	
	    	 	
	    	 	LocationService.clearLocation();
	    
}]);

locations.service('LocationService', function () {

	var locationName = '';
		
	this.setLocation = function(sLocationName){
		
		locationName = sLocationName;
		
	};
	
	this.getLocation = function(){
		
		return locationName;
		
	};
	
	this.clearLocation = function(){
		
		locationName = '';
		
	};
});
