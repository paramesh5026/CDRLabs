/**
 * http://usejsdoc.org/
 */
var study = require('../models/studies');

function getStudies(res){
	study.find(function(err, studies){
		if(err)
			res.send();
		
		//Total number of rows
		console.log("Number of Rows:"+studies.length);
		
		// Each message is customized
		studies.forEach(function(study){
			//console.log("Study Name"+study.studyName);
			study['daysCompleted']= 10;
		});
		
		// Each message is customized
		studies.forEach(function(study){
			console.log("Study Name"+study.studyName);
			console.log("Study days"+study.daysCompleted);
		});
		
		res.json(studies);  //// return all persons in JSON format
	});
}

module.exports = function(app){
	
	/*//get all Persons
	app.get('/api/getStudies', function(req,res){
		console.log("Get Studies");
		getStudies(res);
	});*/
	
	//post Study
	app.post('/api/submitNewStudy', function(req,res){
		
			 	
		//create a person, information comes from AJAX request from Angular
		study.create({
			
			studyId			: 	req.body.studyId,
			studyName 		: 	req.body.studyName,
			studyDesc		: 	req.body.studyDesc,
			studyOwnedBy	: 	req.body.userName,
			location		: 	req.body.selectedLocation,
			participants	:	req.body.studyParticipants,
			status			: 	'queue',
			beginDate		:	Date.now()
			
		}, function(err,studies){
			if(err)
				res.send(err);
				
			getStudies(res);
		});
	});
	


	app.put('/api/update/:name/:id/:desc/:loc/:status', function(req,res){
		//create a person, information comes from AJAX request from Angular
		study.findOneAndUpdate({userName : 	req.params.name,studyId	: req.params.id},
								{$set:
									{
										studyDesc 		: 	req.params.desc,
										location		: 	req.params.loc,
										status			: 	req.params.status
									}
								}, function(err,studies){
									if(err)
										res.send(err);
				
//			getStudents(res);
									res.json({"msg":"Successfully Created"});
								});
		});
	
	app.get('*', function(req, res) {
		res.sendfile('./public/CDR.html'); // load the single view file (angular will handle the page changes on the front-end)
});
};