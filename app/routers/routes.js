/**
 * http://usejsdoc.org/
 */
var Research = require('../models/research');

function getPersons(res){
	Research.find(function(err, persons){
		if(err)
			res.send();
		
		res.json(persons);  //// return all persons in JSON format
	});
};

module.exports = function(app){
	
	//get all Persons
	app.get('/api/persons', function(req,res){
		getPersons(res);
	});
	
	//post Person
	app.post('/api/createPerson', function(req,res){
		
		//create a person, information comes from AJAX request from Angular
		Research.create({
			firstName 		 : 	req.body.firstName,
			lastName		 : 	req.body.lastName,
			studyId 		 : 	req.body.studyId,
			studyName		 : 	req.body.studyName,
			studyDesc		 : 	req.body.studyDesc,
			studyOwnedBy	 : 	req.body.studyOwnedBy,
			userName		 : 	req.body.userName,
			password		 : 	req.body.password,
			status			 : 	req.body.status
		}, function(err,person){
			if(err)
				res.send(err);
				
//			getPersons(res);
		});
	});
	
	//Delete Person
	app.delete('/api/persons/:enroll_id', function(req,res){
		Research.remove({
			enroll_id : req.params.enroll_id
		}, function(err, person) {
			if (err)
				res.send(err);

			getPersons(res);
		});
	});
		
		// application -------------------------------------------------------------
		app.get('*', function(req, res) {
			res.sendfile('./public/HomePage.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};