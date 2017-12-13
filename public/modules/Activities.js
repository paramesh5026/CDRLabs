'use strict';

var activitymodule = angular.module('ActivityModule',['AdminServiceModule','ngMessages','ui.bootstrap']);


activitymodule.filter('startFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return [];
	};
});



activitymodule.controller('Activities',
	    ['$scope', '$rootScope','$http','$log','adminService','filterFilter',
	    function ($scope, $rootScope,$http,$log,adminService, filterFilter) {
	    	
	    	console.log("*********** Activities Table Dispaly ***************************");
	    	
	    	// column to sort
	    	$scope.activitySortColumn = 'activityname';
	    	
	    	// sort ordering (Ascending or Descending). Set true for descending
	    	$scope.activityReverse = false;
	    	$scope.viewby 		= 10;
	    	//Data loading Image
            //$scope.isLoading = true;
	    	
	    	$scope.setItemsPerPage = function(num) {
	    		  $scope.entryLimit = num;
	    		  $scope.currentPage = 1; //reset to first page
	    		  $scope.noOfPages = Math.ceil($scope.activities.length / $scope.entryLimit);
	    	}
            
            adminService.getActivities().then(
	           	function mySuccess(response) {
	           		//Message to console
	           		/*$log.log('status:'+response.status);
	           		$log.log('status:'+response.statusText);
	           		$log.log('status:'+response.data.length);*/
	           		$scope.activities = response.data;
	           		
	           		// pagination controls
					$scope.currentPage = 1;
					$scope.totalItems = $scope.activities.length;
					
					$scope.entryLimit = $scope.viewby; // items per page
					$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
			
	           	}, 
	           	
	           	function myError(response) {
	           		 	$log.log("Error getting data from activities table.");
		    		  // $scope.isLoading = false;
		    			/* SessionService.clearSessionDetails();
		    			 $scope.error = response.data.msg;*/
	           	}
            );
            
           
            
            
            
            // called on header click
            $scope.activitySortColumn = function(col){
	             $scope.activitySortCol = col;
	             
	             if($scope.activityReverse){
	            	 $scope.activityReverse = false;
	            	 $scope.reverseclass = 'arrow-up';
	             }else{
	            	 $scope.activityReverse = true;
	            	 $scope.reverseclass = 'arrow-down';
	             }
            };
            
            $scope.activitySortClass = function(col){
            	
            	if($scope.activitySortCol == col ){
            		  if($scope.activityReverse){
            			  return 'arrow-down'; 
            		   }else{
            			   return 'arrow-up';
            		   }
            	}else{
            		   return '';
            	}
            	
            }
            
            // delete activity after confirmation
	  	    $scope.deleteActivity = function(activityname) {
	  	    	
	  	    	if (confirm('Are you sure, You want to delete activity \''+activityname+'\'?')){
	  	    		
		  	    	//activity data from html page
			         	var response = adminService.deleteActivity(activityname);
			         	
			         	response.success(function (data) {
			         		
			         		$scope.activities = data;
			           		
			           		// pagination controls
							$scope.currentPage = 1;
							$scope.totalItems = $scope.activities.length;
							
							$scope.entryLimit = 8; // items per page
							$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
			        			
			        	 }); 
			        	           	
			         	response.error(function(res) {
			        	     $log.log("Error during deleting activity:"+data.toString());
			        		 //$scope.isLoading = false;
			        		 //errorMessage = "failure message: " + JSON.stringify({data: data});
			        		 $log.log(e);  			
			        	});
	  	    	};//End if
	  	       
	  	    };//End of function delete Activity
	  	    
	  	    
          //Search Activities function
            $scope.searchActivities = function () {
           	
            	$log.log('Search Activities');
            	
            	//Data loading Image
                //$scope.isLoading = true;
                
                var activityName 	= $scope.searchActivityName;
               
                $log.log("Activity Name:"+activityName);
                
                if(activityName == ''){
                	activityName = 'undefined';
                }
                
                adminService.searchAndGetActivities(activityName).then(
        	           	function mySuccess(response) {
        	           		//Message to console
        	           		$log.log('status:'+response.status);
        	           		$log.log('status:'+response.statusText);
        	           		$log.log('status:'+response.data.length);
        	           		
        	           		$scope.activities = response.data;
        	           		
        	           		// pagination controls
        					$scope.currentPage = 1;
        					$scope.totalItems = $scope.activities.length;
        					
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




activitymodule.controller('NewActivityControl',
	    ['$scope', '$rootScope', '$location','$http','$log','adminService',
	    function ($scope, $rootScope, $location,$http, $log,adminService) {
	    	
	    	$log.log("New Activity Control");
	    	
	    	/*var that = this;
	    	
	    	 this.date = {
	    			    value: new Date(),
	    			    showFlag: false
	    			  };
	    			  
	    			  this.openCalendar = function(e, date) {
	    			      that.open[date] = true;
	    			  };*/
	    			  
	    	
	    	  		$scope.inlineOptions = {
	    			    /*customClass: getDayClass,*/
	    			    minDate: new Date(),
	    			    /*showWeeks: true,
	    			    enableTime: true*/
	    			 };

	    			  $scope.dateOptions = {
	    			   // dateDisabled: disabled,
	    			    formatYear: 'yy',
	    			    maxDate: new Date(2300, 5, 22),
	    			    minDate: new Date(),
	    			    startingDay: 1
	    			  };

	    			  // Disable weekend selection
	    			  /*function disabled(data) {
	    			    var date = data.date,
	    			      mode = data.mode;
	    			    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
	    			  }*/

	    			 /* $scope.toggleMin = function() {
	    			    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
	    			    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
	    			  };

	    			  $scope.toggleMin();*/

	    			  $scope.open1 = function() {
	    			    $scope.popup1.opened = true;
	    			  };

	    			 /* $scope.open2 = function() {
	    			    $scope.popup2.opened = true;
	    			  };*/

	    			  $scope.setDate = function(year, month, day) {
	    			    $scope.dt = new Date(year, month, day);
	    			  };

	    			  /*$scope.formats = ['dd-MMM-yyyy HH:mm:ss', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	    			  $scope.format = $scope.formats[0];
	    			  $scope.altInputFormats = ['M!/d!/yyyy'];*/

	    			  $scope.popup1 = {
	    			    opened: false
	    			  };

	    			 /* $scope.popup2 = {
	    			    opened: false
	    			  };*/

	    			  /*var tomorrow = new Date();
	    			  tomorrow.setDate(tomorrow.getDate() + 1);
	    			  var afterTomorrow = new Date();
	    			  afterTomorrow.setDate(tomorrow.getDate() + 1);
	    			  $scope.events = [
	    			    {
	    			      date: tomorrow,
	    			      status: 'full'
	    			    },
	    			    {
	    			      date: afterTomorrow,
	    			      status: 'partially'
	    			    }
	    			  ];*/

	    			 /* function getDayClass(data) {
	    			    var date = data.date,
	    			      mode = data.mode;
	    			    console.log('mode:'+mode);
	    			    console.log('date:'+date);
	    			    
	    			    if (mode === 'day') {
	    			     // var dayToCheck = new Date(date).setHours(0,0,0,0);
	    			      var dayToCheck = new Date(date);
	    			      console.log('dayToCheck:'+dayToCheck);
	    			      var tzOffset = new Date().getTimezoneOffset() / 60;
	    			      var hoursTZ = 12 - tzOffset;
	    			      
	    			      for (var i = 0; i < $scope.events.length; i++) {
	    			       // var currentDay = new Date($scope.events[i].date).setHours(hoursTZ,0,0,0);
	    			        var currentDay = new Date($scope.events[i].date);
	    			        console.log('currentDay:'+currentDay);
	    			        
	    			        if (dayToCheck === currentDay) {
	    			          return $scope.events[i].status;
	    			        }
	    			      }
	    			    }

	    			    return '';
	    			  }*/
	    	
	    	/**************** Activity Registration ***********************/
	    	 //New Activity Function
	         $scope.createActivity = function (actvityData) {
	        	
	         	//Navigate to activities page
	         	var url = "/activities";
	         	 
	         	$log.log("Activity Creation Date123:"+$scope.activitydate);
	         	
	         	var activityDate = $scope.activitydate;
	         	var dayToCheck = new Date(activityDate);
	         	dayToCheck.setHours(new Date().getHours());
	         	dayToCheck.setMinutes(new Date().getMinutes());
	         	dayToCheck.setSeconds(new Date().getSeconds());
	         	dayToCheck.setMilliseconds(new Date().getMilliseconds());
	         	
	         	var isoDate = dayToCheck.toISOString();
	         	
	         	actvityData.activitydate = isoDate;
	         	
	         	$log.log("isoDate:"+isoDate);
	         	$log.log("activity date:"+actvityData.activitydate);
	         	
	         	/*$log.log("Current year:"+dayToCheck.getFullYear());
	         	$log.log("Current mon:"+dayToCheck.getMonth());
	         	$log.log("Current date:"+dayToCheck.getDate());
	         	
	         	var currentDate = new Date();
	         	
	         	$log.log("Current hours:"+dayToCheck.getHours());
	         	$log.log("Current min:"+dayToCheck.getMinutes());*/
	         	
	         	//activity data from html page
	         	var response = adminService.createActivity(actvityData);
	         	
	         	response.success(function (res) {
	         		
	         		$scope.activityFormData = {};
		    		
	         		$log.log("Activity Creation Status:"+res.status);
	         		$log.log("Activity Creation Message:"+res.msg);
		    		
		    		//Navigate to Activities page
                     $location.path(url);
	        			
	        	 }); 
	        	           	
	         	response.error(function(res) {
	        	     $log.log("Error during submitting activity form:"+data.toString());
	        		 //$scope.isLoading = false;
	        		 //errorMessage = "failure message: " + JSON.stringify({data: data});
	        		 $log.log(e);  			
	        	});
	                
	         };//End of createActivity Function
	     	
	         
	         
	         /**************** Reset New Activity form ***********************/
	         //Reset New Activity Function
	         $scope.resetActivityDetails = function () {
	        	
	        	 try {
	        		 
	        		 $scope.activityFormData = {};
	                 
	             } catch (e) {  
	            	 
	            	 $log.log('Error in Reset Activity From');
	                 
	            	 $log.log(e);
	             }
	             
	        		        	 
	         };//End of reset Activity Function
	    	
	         
	         /**************** Cancel New Activity form ***********************/
	         //Cancel New Activity Form : Navigates to activities page
	         $scope.cancelActivityForm = function () {
	        	
	         	//Navigate to activities page
	         	var url = "/activities";
	         	
	         	$scope.activityFormData = {};
	         	
	         	/*$scope.dataLoading = true;*/
	         	
	         	$location.path(url);
	         	
	         	//Data loading Image
	            /* $scope.dataLoading = false;*/
	
	         };//End of cancelActivityForm Function
	         
 }]); //End of NewActivityControl


activitymodule.controller('UpdateActivityControl',
	    ['$scope', '$rootScope', '$location','$http','$log','adminService','$stateParams',
	    function ($scope, $rootScope, $location,$http, $log,adminService,$stateParams) {
	    	
	    	$log.log("Update Activity Control");
	    	
	    	adminService.getActivityDetails($stateParams.activityname).then(
		           	function mySuccess(response) {
		           		//Message to console
		           		$log.log('status:'+response.status);
		           		$log.log('status:'+response.statusText);
		           		$log.log('status:'+response.data.length);
		           		
		           		$scope.updateActivityFormData = response.data;
		           		
		           		/*if(response.data.length > 0){
		           			$scope.updateUserFormData = response.data[0];
		           		}else{
		           			var msg = 'user \''+$stateParams.userid+'\' not found';
		           		}*/
		           						
		           	}, 
		           	
		           	function myError(response) {
		           		 	$log.log("Error getting data from activities for update activity.");
		           	}
	            );
	    	
	    	
	    	/**************** Update activity Registration ***********************/
	    	 //Update Activity Function
	         $scope.updateActivity = function () {
	        	
	         	//Navigate to activities page
	         	var url = "/activities";
	         	 
	         	//activity data from html page
	         	var response = adminService.updateActivity($scope.updateActivityFormData);
	         	
	         	response.success(function (res) {
	         		
	         		$scope.updateActivityFormData = {};
		    		
	         		$log.log("Activity update Status:"+res.status);
	         		$log.log("Activity update Message:"+res.msg);
		    		
		    		//Navigate to activities page
                     $location.path(url);
	        			
	        	 }); 
	        	           	
	         	response.error(function(res) {
	        	     $log.log("Error during update activity form:"+res.msg);
	        		 //$scope.isLoading = false;
	        		 //errorMessage = "failure message: " + JSON.stringify({data: data});
	        		 $log.log(e);  			
	        	});
	                
	         };//End of updateActivity Function
	     	
	         
	         
	         	    	
	         
	         /**************** Cancel Activity form ***********************/
	         //Cancel Update activity Form : Navigates to activities page
	         $scope.cancelUpdateActivityForm = function () {
	        	
	         	//Navigate to activities page
	         	var url = "/activities";
	         	
	         	$scope.updateActivityFormData = {};
	         	
	         	/*$scope.dataLoading = true;*/
	         	
	         	$location.path(url);
	         	
	         	//Data loading Image
	            /* $scope.dataLoading = false;*/
	
	         };//End of cancelUpdateActivityForm Function
	         
 }]); //End of UpdateActivityControl
