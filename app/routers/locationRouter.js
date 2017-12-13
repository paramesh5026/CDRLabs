/**
 * http://usejsdoc.org/
 */
var location = require('../models/locations');



module.exports = function(app){
	
	
	//post location
	app.post('/api/createLocation', function(req,res){
		
		//create a person, information comes from AJAX request from Angular
		location.create({
			locatinId 				 : 	req.body.locatinId,
			locationName			 : 	req.body.locationName,
			locationAddress 	 	 : 	req.body.locationAddress,
			locationDescription		 : 	req.body.locationDescription
		}, function(err,locations){
			if(err)
				res.send(err);
			
			res.json({"msg":"Location "+req.body.locationName+" Created Successfully"});
		});
	});
	

		// application -------------------------------------------------------------
		app.get('*', function(req, res) {
			res.sendfile('./public/CDR.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};