'use strict';

var locationsmodule = angular.module('LocationsModule',['AdminServiceModule','ngMessages','ui.bootstrap']);


locationsmodule.filter('startLocationFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return [];
	};
});


locationsmodule.controller('Locations',
	    ['$scope', '$rootScope','$http','$log','adminService','filterFilter',
	    function ($scope, $rootScope,$http,$log,adminService, filterFilter) {
	    	
	    	console.log("*********** Locations Table Dispaly ***************************");
	    	
	    	// column to sort
	    	//$scope.userSortCol = 'userName';
	    	// sort ordering (Ascending or Descending). Set true for descending
	    	//$scope.userReverse = false;
	    	
	    	/*$scope.allstatus = ["","Queue", "InProgress", "Completed"];*/
	    	
	    	//Data loading Image
            //$scope.isLoading = true;
            
            adminService.getLocations().then(
	           	function mySuccess(response) {
	           		//Message to console
	           		/*$log.log('status:'+response.status);
	           		$log.log('status:'+response.statusText);
	           		$log.log('status:'+response.data.length);*/
	           		
	           		$scope.locations = response.data;
	           		
	           		// pagination controls
					$scope.currentPage = 1;
					$scope.totalItems = $scope.locations.length;
					
					$scope.entryLimit = 8; // items per page
					$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
			
	           	}, 
	           	
	           	function myError(response) {
	           		 	$log.log("Error getting data from locations table.");
		    		  // $scope.isLoading = false;
		    			/* SessionService.clearSessionDetails();
		    			 $scope.error = response.data.msg;*/
	           	}
            );
            
            /*
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
            	
            }*/
            
         // delete user after confirmation
	  	    $scope.deleteLocation = function(locationshortname) {
	  	    	
	  	    	if (confirm('Are you sure, You want to delete location \''+locationshortname+'\'?')){
	  	    		
		  	    	//user data from html page
			         	var response = adminService.deleteLocation(locationshortname);
			         	
			         	response.success(function (data) {
			         		
			         		$scope.locations = data;
			           		
			           		// pagination controls
							$scope.currentPage = 1;
							$scope.totalItems = $scope.locations.length;
							
							$scope.entryLimit = 8; // items per page
							$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
			        			
			        	 }); 
			        	           	
			         	response.error(function(res) {
			        	     
			         		$log.log("Error during deleting location:"+data.toString());
			        		 //$scope.isLoading = false;
			        		 //errorMessage = "failure message: " + JSON.stringify({data: data});
			        		 //$log.log(e);  			
			        	});
	  	    	};//End if
	  	       
	  	    };//End of function delete User
	  	 
	    	
	  }]);


locationsmodule.controller('NewLocationControl',
	    ['$scope', '$rootScope', '$location','$http','$log','adminService',
	    function ($scope, $rootScope, $location,$http, $log,adminService) {
	    	
	    	$log.log("New Location Control");
	    	
	    	/**************** Add Location ***********************/
	    	 //New Location Function
	         $scope.createLocation = function () {
	        	
	         	//Navigate to Locations page
	         	var url = "/locations";
	         	
	         	var locationform = {};
	         	locationform = $scope.locationFormData;
	         	
	         	console.log(typeof locationform.locationshortname);
	         	
	         	if(locationform.locationshortname != 'undefined'
	         		|| locationform.locationname != 'undefined'
	         		|| locationform.locationdesc != 'undefined'){
	         		
	         		var response = adminService.createLocation($scope.locationFormData);
		         	
 		         	
		         	response.success(function (res) {
		         		
		         		$scope.loctionFormData = {};
			    		
		         		$log.log("Location Creation Status:"+res.status);
		         		$log.log("Location Creation Message:"+res.msg);
			    		
			    		//Navigate to Locations page
	                     $location.path(url);
		        			
		        	 }); 
		        	           	
		         	response.error(function(res) {
		        	     $log.log("Error during submitting location form:");
			         	 $log.log("Location Creation Message:"+res.message);
			         	 
			         	 $scope.location_error = res.message;
		        		 //$scope.isLoading = false;
		        		 //errorMessage = "failure message: " + JSON.stringify({data: data});
		        		 //$log.log(e);  			
		        	});
	         	}
	         	
	         	
	         	$log.log("Location ShortName:"+locationform.locationshortname);
	         	/*$log.log("Location ShortName:"+$scope.locationFormData.locationshortname);
	         	$log.log("Location Name:"+$scope.locationFormData.locationname);
	         	$log.log("Location Desc:"+$scope.locationFormData.locationdesc);*/
	         	
	         	//location data from html page
	         	
	                
	         };//End of createLocation Function
	     	
	         
	         
	         /**************** Reset New Location form ***********************/
	         //Reset New Location Function
	         $scope.resetLocationDetails = function () {
	        	
	        	 try {
	        		 
	        		 $scope.loctionFormData = {};
	        		 
	        		 $scope.location_error = '';
	                 
	             } catch (e) {  
	            	 
	            	 $log.log('Error in Reset Location From');
	                 
	            	 $log.log(e);
	             }
	             
	        		        	 
	         };//End of reset Location Function
	    	
	         
	         /**************** Cancel New Location form ***********************/
	         //Cancel New Location Form : Navigates to Locations page
	         $scope.cancelLocationForm = function () {
	        	
	         	//Navigate to Locations page
	         	var url = "/locations";
	         	
	         	$scope.loctionFormData = {};
	         	
	         	/*$scope.dataLoading = true;*/
	         	
	         	$location.path(url);
	         	
	         	//Data loading Image
	            /* $scope.dataLoading = false;*/
	
	         };//End of cancelLocationForm Function
	         
 }]); //End of cancelLocationForm


/*
A directive to enable two way binding of file field
*/
locationsmodule.directive('demoFileModel', function ($parse) {
   return {
       restrict: 'A', //the directive can be used as an attribute only

       /*
        link is a function that defines functionality of directive
        scope: scope associated with the element
        element: element on which this directive used
        attrs: key value pair of element attributes
        */
       link: function (scope, element, attrs) {
           var model = $parse(attrs.demoFileModel),
               modelSetter = model.assign; //define a setter for demoFileModel

           //Bind change event on the element
           element.bind('change', function () {
              
        	   var file = element[0].files[0];
        	   /*console.log("*** File Type Checking: Start *****");
        	   console.log(file);
        	   console.log("File Type:"+file.type);
        	   console.log("*** File Type Checking: End *****");*/
        	   
        	   //Call apply on scope, it checks for value changes and reflect them on UI
               scope.$apply(function () {
                   //set the model value
                  /* modelSetter(scope, element[0].files[0]);*/
            	   model.assign(scope, element[0].files[0]);
               });
               
        	   if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png") {
        		  
        		  // console.log("Valid File");
        		   scope.location_image_error = '';
                   //console.log("*** File Preview: Start *****");
                   var reader = new FileReader();
    	        	
    	    		reader.onload = function(loadEvent) {
    					scope.$apply(function() {
    						scope.filepreview = loadEvent.target.result;
    					});
    				}
    	        	   
    	        	reader.readAsDataURL(scope.myFile);
    	        	//console.log("*** File Preview: End *****");
                   
        	   }else{
        		   //console.log("*** Invalid File *****");
        		   scope.filepreview = false;
        		   scope.$apply();
        		   
        		   scope.location_image_error = 'Invalid File Format.';
        		   scope.$apply();
        	   }
        	  
               
           });
       }//End of function
   };//End of return
});


locationsmodule.controller('LocationImageControl',
	    ['$scope', '$rootScope', '$location','$http','$log','adminService',
	    function ($scope, $rootScope, $location,$http, $log,adminService) {
	    	
	    	$log.log("Upload Location Image Control");
	    	
	    	$scope.locations = ["ABC", "DEF"];
	    	$scope.locationImageFormData = {};
	    	var url = "/locations";
	    	
	    	/**************** Upload Location Image ***********************/
	    	 //Upload Location image
	         $scope.uploadLocationImage = function (locationimagedata) {
	        	
		         	//Navigate to Locations page
		         	var url = "/locations";
		         	var errorexists = false;
		         	
		         	console.log($scope.myFile);
		         	
		         	if(!locationimagedata.locationshortname){
		         		//console.log('Location is not selected.');
		         		$scope.location_error = 'Location is not selected.';
		         		errorexists = true;
		         	}else{
		         		$scope.location_error = false;
		         	}
		         	
		         	if(!$scope.myFile){
		         		$scope.location_image_error = 'Location image is not selected.';
		         		errorexists = true;
		         	}else{
		         		$scope.location_image_error = false;
		         	}
		         	
		         	if(!errorexists)
		         	{
		         	
			         	//Read the fields from the htmi page
			         	var fileFormData  = new FormData();
			         	
			         	/*for(var key in $scope.locationImageFormData){
			         		console.log(key);
			         		console.log($scope.locationImageFormData[key]);
			         		fileFormData .append(key,$scope.locationImageFormData[key]);
			         	}*/
			         	
			         	for(var key in locationimagedata){
			         		//console.log(key);
			         		//console.log(locationimagedata[key]);
			         		fileFormData .append(key,locationimagedata[key]);
			         	}
		         	
			         	//Read the file from the html page and append it to the form data
			         	//console.log($scope.myFile);
			         	var file = $scope.myFile;
			         	fileFormData.append('file',file);
		         	
			         	//console.log(file);
			         	//console.log(file.type);
			         	//console.log(fileFormData );
			         	
			         	//*** validate the data is populated properly or not.
			         	
			         	//Get the file extension
			         	var ext = file.name.match(/\.(.+)$/)[1];
			         	
			         	//console.log('ext'+ext);
			         	
			            if(angular.lowercase(ext) ==='jpg' || angular.lowercase(ext) ==='jpeg' 
			            	|| angular.lowercase(ext) ==='png' || angular.lowercase(ext) ==='gif'){
			            	
			            	var response = adminService.uploadLocationImage(fileFormData);
			            	
			            	response.success(function (res) {
			            		fileFormData = {};
				         		$scope.locationImageFormData = {};
					    		
				         		$log.log("Location Creation Status:"+res.success);
				         		$log.log("Location Creation Message:"+res.message);
				         		$log.log("Location images:"+res.data);
				         		
					    		//Navigate to Locations page
				         		$location.path(url);
				        			
				        	 }); 
				        	           	
				         	response.error(function(res) {
				        	     $log.log("Error during submitting location form:");
					         	 $log.log("Location Creation Message:"+res.message);
					         	 
					         	 $scope.location_error = res.message;
				        	});
			            }  
			            else{
			            	var files = '.jpg or .jpeg or .png';
			            	//$scope.location_image_error = '<p>Invalid File Format. Please upload either '+files.bold()+' files</p>';
			            	$scope.location_image_error = 'Invalid File Format.';
			            }
		         	}
	         };//End of createLocation Function
	     	
	         
	         
	         /**************** Cancel Upload Location Image form ***********************/
	         //Cancel New Location Form : Navigates to Locations page
	         $scope.cancelUploadImage = function () {
	        	
	         	//Navigate to Locations page
	         	var url = "/locations";
	         	
	         	$scope.locationImageFormData = {};
	         	
	         	/*$scope.dataLoading = true;*/
	         	
	         	$location.path(url);
	         	
	         	//Data loading Image
	            /* $scope.dataLoading = false;*/
	
	         };//End of cancelLocationForm Function
	         
 }]); //End of cancelLocationForm


locationsmodule.controller('LocationImageViewDeleteControl',
	    ['$scope', '$rootScope', '$location','$http','$log','adminService','$stateParams',
	    function ($scope, $rootScope, $location,$http, $log,adminService,$stateParams) {
	    	
	    	$log.log("*********** LocationImageViewDeleteControl **********");
	    	
	    	var locationshortName = $stateParams.locationshortname;
	    	$log.log("locationshortName:"+locationshortName);
	    	
	    	//Location Full Name
	    	$scope.location_fullname = "Los Angels";
	    	
	    	
	    	// Location Description
	    	$scope.location_description = "Los Angels Description";
	    	
	    	//Location Images   	
	    	var response = adminService.getLocationImages(locationshortName);
        	
        	response.success(function (res) {
        		
        		$log.log("Location Creation Status:"+res.success);
         		//$log.log("Location images is an array:"+Array.isArray(res));
         		
         		//$log.log(res[0]);
        		
        		//Declaration of the array of response size 
         		var imagesArray = new Array(res.length);
         		var index = 0;
         		for(;index < res.length; index++){
         			
         			//Image Details
         			var obj = res[index];
         			
         			var base64Image = 'data:image/jpg;base64,' + obj.image;
         			
         			var newObj = {
         			    	"imageName": obj.imageName,
         			    	"image":	 base64Image
         			    };
         			
         			imagesArray[index] = newObj;
         		}
         		
         		//$log.log('files:start:'+imagesArray.length);
         		$scope.serverImages = imagesArray;
        	 }); 
        	           	
         	response.error(function(res) {
        	     $log.log("Error during submitting location form:");
	         	 $log.log("Location Creation Message:"+res.message);
        	});
	    	
}]);
