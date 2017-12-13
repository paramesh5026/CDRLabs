var homeDir = process.env.HOMEPATH;

/*var User  = require(homeDir+'/models/users');*/
var User  		= require('../models/user');
var nodemailer 	= require('nodemailer');

//get all students
function getAllUsers(res){
	User.find(function(err, users){
		if(err){
			res.send();
		}else{
			res.json(users);  //// return all persons in JSON format
		}
	});
}

//Signup New User Person
var signupUser = function(req,res){
	//create a person, information comes from AJAX request from Angular
	console.log("signup new user");
	console.log("username:"+req.body.username);
	var newUser = new User(
		{
			username 		: 	req.body.username,
			firstname 		: 	req.body.firstname,
			lastname		: 	req.body.lastname,
			password		: 	req.body.password,
			role			: 	'Guest',
			email			: 	req.body.email,
			mobile			: 	req.body.mobile,
			status			:	'InProgress',
			cnetid			:	req.body.cnetid
		});
	
	newUser.save(function(err,newUser){
		
		if(err){
			console.log("User Creation Error:"+err);
			res.send(err);
		}
		else{
			console.log("Success");
			res.json({status:'success',msg:'User \''+req.body.username+'\' created successfully'});
			
			
		}
	});
};

//Create Person
var createUser = function(req,res){
	//create a person, information comes from AJAX request from Angular
	console.log("creation of user");
	
	var newUser = new User(
		{
			username 		: 	req.body.username,
			firstname 		: 	req.body.firstname,
			lastname		: 	req.body.lastname,
			password		: 	req.body.password,
			role			: 	req.body.userrole,
			email			: 	req.body.email,
			mobile			: 	req.body.mobile,
			status			:	'Approved',
			village		 	: 	req.body.village,
			state			: 	req.body.state,
			country		 	: 	req.body.country,
			pincode		 	: 	req.body.pincode
		});
	
	newUser.save(function(err,newUser){
		
		if(err){
			console.log("User Creation Error:"+err);
			res.send(err);
		}
		else{
			console.log("Success");
			res.json({status:'success',msg:'User \''+req.body.username+'\' created successfully'});
			
			var transporter = nodemailer.createTransport({
				  service: 'gmail',
				  auth: {
				    user: 'ganeshapv@gmail.com',
				    pass: '!1ApvAsAm'
				  }
				});

				var mailOptions = {
				  from: 'ganeshapv@gmail.com',
				  to: 'ganeshapv_2004@yahoo.co.in',
				  subject: 'Sending Email using Node.js',
				  text: 'That was easy!'
				};

				transporter.sendMail(mailOptions, function(error, info){
				  if (error) {
				    console.log(error);
				  } else {
				    console.log('Email sent: ' + info.response);
				  }
				}); 
		}
	});
};


//Update user
var updateUser = function(req,res){
	
	console.log('updating the user:\''+req.body.username+"\''");
	
	User.findOneAndUpdate({username : 	req.body.username},
			{$set:
				{
					firstname 		: 	req.body.firstname,
					lastname		: 	req.body.lastname,
					role			: 	req.body.role,
					email			: 	req.body.email,
					mobile			: 	req.body.mobile
				}
			}, function(err,users){
				
				if(err){
					res.send(err);
				}else{
					res.json({status:'success',msg:'updated user \''+req.body.username+'\' successfully'});
				}
				
			});
	};
	


//Delete User
var deleteUser =  function(req,res){
	
	console.log("deletion of user:"+req.params.username);
	
	User.remove(
	{
		username : req.params.username
	
	}, 
	function(err, result) {
		
		if(err){
			console.log("User Deletion Error:"+err);
			res.send(err);
		}
		else{
			console.log('Deleted the user \''+req.body.username+'\' successfully');
			
			getAllUsers(res);
		}
			
	});
};


//Login Logic
var authenticateUser = function(req,res){

	console.log("validating user name & password");
	
	User.findOne({username:req.params.username }, function (err, users) {

	        if (err) {
	        	res.json({status:'error',msg:'Somthing Wrong!'});
//	            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
	        }
	       
	        
	        if (users) {
	        	
	        		console.log("Got the result from the database");
	        		console.log("actual pwd:"+users.password+" Expected password:"+req.params.password);
	        		
	                if (req.params.password == users.password) {
	                	
	                	res.json({status:'success',msg:'verified username & password'});

	                    } else {
	                    	res.json({status:'failure',msg:'Username or password is incorrect'});
//	                    return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.INVALID_PWD } }));
	                }
	        } else {
//	            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.EMAIL_NOT_FOUND } }));
	        	res.json({status:'failure',msg:'Username or password is incorrect'});
	        }

    	});
};


//get all Users
var getUsers = function(req,res){
	
	getAllUsers(res);
};

var getUserDetails = function(req,res){
	
	console.log('Getting user details for the user \''+req.params.username+'\'.');
	
	User.findOne({username:req.params.username }, function (err, users) {

	        if (err) {
	        	res.json({status:'error',msg:'Somthing Wrong!'});
	        }
	       
	        console.log('Retrieved user name: '+users.username);
	        
	        if (users) {
	        	
	        	res.json(users); 	
	        } else {
	        	res.json({status:'failure',msg:'Unable to retrieve user \''+req.params.username+ '\' details.'});
	        }

    	});
	
};




module.exports = {
		signupUser,
		createUser,
		updateUser,
		deleteUser,
		getUsers,
		authenticateUser,
		getUserDetails
};


