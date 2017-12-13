//Importing modules
var express  		= require('express');
var mongoose 		= require('mongoose'); 			 		// mongoose for mongodb
var bodyParser 		= require('body-parser');	
var path 			= require('path');

// set up ======================================================================
var app      		= express(); 					 		// create our app w/ express
var port  	 		= process.env.PORT || 27017; 	 		// set the port
var database 		= require('./config/database');  		// load the database config
var morgan   		= require('morgan');			 		// log requests to the console (express4)
	 		// pull information from HTML POST (express4)
var methodOverride 	= require('method-override');    		// simulate DELETE and PUT (express4)

// configuration ===============================================================
mongoose.connect(database.url); 					 		// connect to mongoDB database on modulus.io

mongoose.connection.on('connected', function() {
	console.log('Connected to database mongodb @ 27017');
});

mongoose.connection.on('error', function(err) {
	if(err){
		console.log('Error in Database connection:'+err);
	}
});



app.use(express.static(__dirname + '/public')); 	 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 							 		// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 		// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 						 		// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); 			// override with the X-HTTP-Method-Override header in the request

//listen (start app with node server.js) ======================================
//app.listen(8080);
//console.log("App listening on port 8080");

// routes ======================================================================
/*var routes = require('./routes/index')

app.use("/",routes);
app.use(app.router);*/

require('./routes/index')(app);

/*require('./app/routers/getRouter.js')(app);
require('./app/routers/userRouter.js')(app);
require('./app/routers/studyRouter.js')(app);
require('./app/routers/activityRouter.js')(app);
require('./app/routers/locationRouter.js')(app);
*/

//application -------------------------------------------------------------
app.get('*', function(req, res) {
	res.sendfile('./public/CDR.html'); // load the single view file (angular will handle the page changes on the front-end)
});


//listen (start app with node server.js) ======================================

app.listen(port, function() {
	console.log("App listening on port " + port);
});


