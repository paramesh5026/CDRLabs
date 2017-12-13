var Study  = require('../models/study');

function getStudies(res){
	
	Study.find(function(err, studies){
		
		if(err){
			res.send();
		}else{

			//Total number of rows
			console.log("Number of Rows:"+studies.length);
			
			// Each message is customized
			studies.forEach(function(study){
				console.log("Study Name"+study.studyname);
				study.daysCompleted= 10;
			});
			
			// Each message is customized
			/*studies.forEach(function(study){
				console.log("Study Name"+study.studyName);
				console.log("Study days"+study.daysCompleted);
			});*/
			
			res.json(studies);  //// return all persons in JSON format
		}
	});
}

//******************************************************************************************
//									Submit New Study
//******************************************************************************************
//Login Logic
var addstudy = function(req,res){
	
	console.log("Create New Study");
	
	var newStudy = new Study({
		
		studyid				: 	2,
		studyname 			: 	req.body.studyName,
		studydesc			: 	req.body.studyDesc,
		studysubmittedby	: 	req.body.userName,
		location			: 	req.body.selectedLocation,
		participants		:	req.body.studyParticipants,
		status				: 	'Submitted',
		begindate			:	Date.now()
		
	});
	
	console.log("Create New Study:"+newStudy);
	
	newStudy.save(function(err,newStudy){
		if(err){
			console.log("Error:"+err);
			res.send(err);
		}
		else{
			console.log("Success");
			getStudies(res);
		}
	});
};

//******************************************************************************************
//					Get All Studies
//******************************************************************************************
//get all Studies
var getAllStudies = function(req,res){
	
	console.log("Get All Studies");
	
	getStudies(res);
	
};


//******************************************************************************************
//								Get Studies based on "studyname" and "studystatus"
//******************************************************************************************
//get all Persons
var searchStudies = function(req,res){
	
	console.log("*** Search Studies ***");
	
	Study.find(function(err, studies){
		
		if(err){
			res.json({stauts: 'failure',message: 'Error in finding the study records' + req.params.id});
		}else{
			
			// Each message is customized
			studies.forEach(function(study1){
				console.log("Study Name"+study1.studyname);
			
			});
			
			try{
				
				var allStudies = new Array();
				
				//Expected User Name
				var expStudyName = req.params.studyName;
				
				//Expected Status
				var expStatus 	= req.params.studyStatus;
				
				//console.log("expStudyName:"+expStudyName);
				
				//console.log("expStatus:"+expStatus);
				
				//if both the search criteria are empty
				if(expStudyName == 'undefined' && expStatus =='undefined'){
					allStudies = studies;
				}else{

					// Loop all the studies
					studies.forEach(function(studyobj){
					
					/*for (index = 0; index < studies.length; index++) {	*/
						if(expStatus =='undefined'){
							
							var patt = new RegExp(expStudyName);
							
							var matches = patt.test(studyobj.studyname);
							
							if(matches){
								allStudies.push(studyobj);
							}
							
						}else if(expStudyName == 'undefined'){
							
							var statusPatt = new RegExp(expStatus);
							
							var statusMatches = statusPatt.test(studyobj.status);
							
							if(statusMatches){
								allStudies.push(studyobj);
							}
							
						}else{
							
							var userPatt = new RegExp(expStudyName);
							
							var userMatches = userPatt.test(studyobj.studyName);
							
							var statusPatt = new RegExp(expStatus);
							
							var statusMatches = statusPatt.test(studyobj.status);
							
							if(userMatches && statusMatches){
								allStudies.push(studyobj);
							}
						}
					});//End for loop
				}
				
				
				console.log("Number of Rows:"+allStudies.length);
				
				res.json(allStudies);
				
			}catch(err) {
				res.json({stauts: 'failure',message: 'Error in finding the study records' + req.params.id});
			}
			
		}
			
	});
};


module.exports = {
		addstudy,
		searchStudies,
		getAllStudies
};