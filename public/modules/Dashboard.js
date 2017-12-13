'use strict';

var dashboard = angular.module('Dashboard',['ngMessages','ui.bootstrap']);
// the storeController contains two objects:
// - store: contains the product list
// - cart: the shopping cart object

dashboard.filter('startFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return [];
	};
});



dashboard.controller('DashboardDisplay',
	    ['$scope', '$rootScope','$http','$log','$timeout','studyService','filterFilter','Excel',
	    function ($scope, $rootScope,$http,$log, $timeout,studyService, filterFilter,Excel) {
	    	
	    	console.log("Dashboard Dispaly");
	    	
	    	// column to sort
	    	$scope.sortCol = 'studyName';
	    	// sort ordering (Ascending or Descending). Set true for descending
	    	$scope.reverse = false;
	    	
	    	$scope.allstatus = ["","Queue", "InProgress", "Completed"];
	    	
	    	//Data loading Image
            $scope.isLoading = true;
            
            studyService.getStudies().then(
	           	function mySuccess(response) {
	           		//Message to console
	           		$log.log('status:'+response.status);
	           		$log.log('status:'+response.statusText);
	           		$log.log('status:'+response.data.length);
	           		
	           		$scope.studies = response.data;
	           		
	           		// pagination controls
					$scope.currentPage = 1;
					$scope.totalItems = $scope.studies.length;
					
					$scope.entryLimit = 10; // items per page
					$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
			
	           	}, 
	           	
	           	function myError(response) {
	           		 	$log.log("Error getting data from ");
		    			 $scope.isLoading = false;
		    			/* SessionService.clearSessionDetails();
		    			 $scope.error = response.data.msg;*/
	           	}
            );
            
            
            // called on header click
            $scope.sortColumn = function(col){
	             $scope.sortCol = col;
	             
	             if($scope.reverse){
	            	 $scope.reverse = false;
	            	 $scope.reverseclass = 'arrow-up';
	             }else{
	            	 $scope.reverse = true;
	            	 $scope.reverseclass = 'arrow-down';
	             }
            };
            
            $scope.sortClass = function(col){
            	
            	if($scope.sortCol == col ){
            		  if($scope.reverse){
            			  return 'arrow-down'; 
            		   }else{
            			   return 'arrow-up';
            		   }
            	}else{
            		   return '';
            	}
            	
            }
            
            
          //Search Studies function
            $scope.searchStudies = function () {
           	
            	$log.log('Search Studies');
            	
            	//Data loading Image
                $scope.isLoading = true;
                
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
        					
        					$scope.entryLimit = 10; // items per page
        					$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
        			
        	           	}, 
        	           	
        	           	function myError(response) {
        	           		 	$log.log("Error getting data from ");
        		    			 $scope.isLoading = false;
        		    			/* SessionService.clearSessionDetails();
        		    			 $scope.error = response.data.msg;*/
        	           	}
                    );
                
               
                
            };//End of searchStudies Function
            
            
            $scope.exportToExcel=function(tableId){
            	// ex: '#my-table'
	            var exportHref = Excel.tableToExcel(tableId,'WireWorkbenchDataExport');
	            
	            $timeout( function(){location.href=exportHref;},100); // trigger download
	        };
            
            
	    	
	  }]);


dashboard.controller('NewStudyControl',
	    ['$scope', '$rootScope', '$location','$http','$log','SessionService',
	    function ($scope, $rootScope, $location,$http, $log,SessionService) {
	    	
	    	$log.log("New Study Control");
	    	
	    	$scope.locations = ["Campus Lab", "Downtown Lab", "Museum of Science and Industry","Chicago Park District"];
	    	
	    	/**************** User Registration ***********************/
	    	 //SignUp Function
	         $scope.submitNewStudy = function () {
	        	
	         	//Navigate to home page after successfull login
	         	var url = "/dashboard";
	         	
	         	var username = SessionService.getLoginUserFullName();
	         	
	         	var study = $scope.studyform;
	         	
	         	study.userName = username;
	         	
	         	/*$log.log("Study Name:"+study.studyName);
	         	$log.log("Study Name:"+study.studyName);
	         	$log.log("Study Desc:"+study.studyDesc);
	         	$log.log("Study loc:"+study.selectedLocation);
	         	$log.log("Study paricipants:"+study.studyParticipants.toString());//studyform.studyParticipants
	         	$log.log("Study Submitted By:"+study.userName);*/
	         	
	         	$http.post('/api/submitNewStudy',study)
		    	.success(function(data){
			    	
		    			$scope.study = {};
		    		
		    			console.log("Data from json:"+data);
			    		
			    		//Navigate to home page
	                     $location.path(url);
		    	})
		    	.error(function(data){
		    			console.log("Error getting data from "+data.toString());
		    	 })	
	         	
	         	
	         	//Data loading Image
	             $scope.dataLoading = true;
	
	         };//End of Login Function
	     	
	         
	         
	         /**************** Reset New Study form ***********************/
	         //Reset SingUp Function
	         $scope.restNewStudyForm = function () {
	        	
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
	    	
	         
	         /**************** Cancel New Study form ***********************/
	         //SignUp Function
	         $scope.cancelNewStudyForm = function () {
	        	
	         	//Navigate to home page after successfull login
	         	var url = "/dashboard";
	         	
	         	$scope.dataLoading = true;
	         	
	         	$location.path(url);
	         	
	         	//Data loading Image
	             $scope.dataLoading = false;
	
	         };//End of Login Function
	    }]);


dashboard.factory('Excel',function($window){
    var uri='data:application/vnd.ms-excel;base64,',
        template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
        format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
    return {
        tableToExcel:function(tableId,worksheetName){
            var table=$(tableId),
                ctx={worksheet:worksheetName,table:table.html()},
                href=uri+base64(format(template,ctx));
            return href;
        }
    };
});
