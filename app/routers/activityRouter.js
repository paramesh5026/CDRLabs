/**
 * http://usejsdoc.org/
 */
var activity = require('../models/activities');


module.exports = function(app){
	
	
	//Post Activity
	app.post('/api/createActivity', function(req,res){
		
		//create a Activity, information comes from AJAX request from Angular
		activity.create({
			activityId 				 : 	req.body.activityId,
			activityName			 : 	req.body.activityName,
			activityDescription 	 : 	req.body.activityDesc,
			date					 : 	Date.now()
			
		}, function(err,activities){
			
			if(err)
				res.send(err);
			
			res.json({"msg":"Activity \""+req.body.activityName+"\" is created successfully"});
		});
	});
	

		// application -------------------------------------------------------------
		app.get('*', function(req, res) {
			res.sendfile('./public/CDR.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};