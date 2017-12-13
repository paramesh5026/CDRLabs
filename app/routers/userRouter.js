/**
 * http://usejsdoc.org/
 */
var user = require('../models/users');


module.exports = function(app){
	
	//get all users
	function getUsers(res){
		user.find(function(err, users){
			if(err)
				res.send();
			
			res.json(users);  //// return all persons in JSON format
		});
	}
	
	/*//get all Persons
	app.get('/api/getUsers', function(req,res){
		getUsers(res);
	});*/
	
	
	//Create Person
	app.post('/api/createUser', function(req,res){
		//create a person, information comes from AJAX request from Angular
		console.log("creation of user");
		
		user.create(
			{
				userName 		: 	req.body.userName,
				firstName 		: 	req.body.firstName,
				lastName		: 	req.body.lastName,
				password		: 	req.body.password,
				role			: 	req.body.userrole,
				email			: 	req.body.email,
				mobileNumber	: 	req.body.mobile,
				village		 	: 	req.body.village,
				state			: 	req.body.state,
				country		 	: 	req.body.country,
				pincode		 	: 	req.body.pincode
			}, 
			function(err,user){
				
				if(err){
					res.send(err);
				}else{
					res.json({status:'success',msg:'User \''+req.body.userName+'\' Created Successfully'});
				}
			});
	});
	
	
	//Update user
	app.put('/api/updateUser', function(req,res){
		
		console.log('updating the user:\''+req.body.userName+"\''");
		
		user.findOneAndUpdate({userName : 	req.body.userName},
				{$set:
					{
						firstName 		: 	req.body.firstName,
						lastName		: 	req.body.lastName,
						role			: 	req.body.role,
						email			: 	req.body.email,
						mobileNumber	: 	req.body.mobileNumber
					}
				}, function(err,studies){
					
					if(err){
						res.send(err);
					}else{
						res.json({status:'success',msg:'update user \''+req.body.userName+'\' Created Successfully'});
					}
					
				});
		});
		
		
		

	//Delete Person
	app.delete('/api/deleteUser/:username', function(req,res){
		
		console.log("deletion of user:"+req.params.username);
		
		user.remove(
		{
			userName : req.params.username
		
		}, 
		function(err, person) {
			if (err){
				res.send(err);
			}
				
			getUsers(res);
		});
	});
	
	/*
	//get User Details
	app.get('/api/getUserDetails/:username', function(req,res){
	
		console.log('Getting user details for the user \''+req.params.username+'\'.');
		
		user.findOne({userName:req.params.username }, function (err, users) {

		        if (err) {
		        	res.json({status:'error',msg:'Somthing Wrong!'});
		        }
		        
		        //console.log('Retrieved user name: '+users.userName);
		        
		        if (users) {
		        	
		        	res.json(users); 	
		        } else {
		        	res.json({status:'failure',msg:'Unable to retrieve user \''+req.params.username+ '\' details.'});
		        }

	    	});
	});*/
	
		// application -------------------------------------------------------------
		app.get('*', function(req, res) {
			res.sendfile('./public/CDR.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};