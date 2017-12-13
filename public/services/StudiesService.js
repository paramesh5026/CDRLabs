'use strict';
 
var studyservice = angular.module('StudyServiceModule',[]);

studyservice.factory('studyService', function ($http, $log) {
	
	$log.log("Study Service initializing");
	 
	var oStudyService = {};
	
	//Get All Studies
	oStudyService.getStudies = function () {
		$log.log("Get Studies API");
		return $http({
			url:	'/api/getStudies',
			method:	'GET'
				
		});
     };
     
   //Get All Studies
 	oStudyService.searchAndGetStudies = function (studyName, studyStatus) {
 		$log.log("Get Studies API");
 		return $http({
			url:	'/api/searchStudies/'+studyName+'/'+studyStatus,
			method:	'GET'
				
		});
      };
      
      
   //search Studies
 	oStudyService.searchStudies = function (studies, studyName, studyStatus) {
 		
 		/*var studies = eval( studies );*/
 		$log.log("Search Studies function in StudySerivce.js");
 		
 		return studies[0];
 		
     };
    
	return oStudyService;
	
	
});
