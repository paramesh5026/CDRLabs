'use strict';
 
var defaultHome = angular.module('Home',['ngMessages']);

defaultHome.controller('HomeControl',
    ['$scope', '$rootScope', '$location','$log','$cookies','adminService',
    function ($scope, $rootScope, $location,$log,$cookies,adminService) {
    	
    	//console.log("DefaultHomeControl");
    	
    	//console.log("*********** Get Datewise Activities ***************************");
         
        adminService.getDateWiseActivities().then(
 	           	
         		function mySuccess(res) {
 	           		//Message to console
         			var todaysActivities = res.data.month;
         			/*$log.log('month:'+res.data.month);
         			$log.log('length:'+todaysActivities.length);
         			$log.log('first:'+todaysActivities[0].activityname);*/
 	           		/*$log.log('status:'+response.status);
 	           		$log.log('status:'+response.statusText);
 	           		$log.log('status:'+response.data.length);*/
         			$scope.recentActivities = res.data.recent;
         			$scope.monthActivities 	= res.data.month;
         			$scope.oldActivities 	= res.data.old;
         			/*$log.log('$monthActivities len:'+$scope.monthActivities.length);*/
 	           	}, 
 	           	
 	           	function myError(res) {
 	           		 	$log.log("Error getting data from activities table.");
 		    		  // $scope.isLoading = false;
 		    			/* SessionService.clearSessionDetails();
 		    			 $scope.error = response.data.msg;*/
 	           	}
             );
    }]);
 


