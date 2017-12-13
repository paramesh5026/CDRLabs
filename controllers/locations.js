var homeDir = process.env.HOMEPATH;

var Location  		= require('../models/location');
var fs  			= require('fs');
var mkdirp 			= require('mkdirp');
var multer			= require('multer');
var http = require('http');

//get all locations
function getAllLocations(res){
	Location.find(function(err, locations){
		if(err){
			res.send();
		}else{
			res.json(locations);  //// return all persons in JSON format
		}
	});
}


//Create folder with location short name
function createFolder(folderpath){
	
	try{
		fs.mkdirSync(folderpath);
		console.log('Directory \''+folderpath+ '\' is created successfully.');
	
	}catch(err){
		
		
		if(err.code === 'EEXIST'){
			console.log('Directory \''+folderpath+ '\' exists.');
		}else{
			console.log('Error in creating folder:'+err);
		}
	}
	
}

//Get all the images in a folder
function getAllImagesInFolder(folderpath,callback){
	
	fs.readdir(folderpath, function(err, files) {
		
		callback(err, files);
	});
}

//Remove folder with location short name
function removeFolder(folderpath){
	
	try{
		fs.rmdirSync(folderpath);
		console.log('Directory \''+folderpath+ '\' is deleted successfully.');
	
	}catch(err){
		
		//Error: ENOENT: no such file or directory, rmdir 'D:\AngularJS\CDRLabs\data\DEF'
		if(err.code === 'ENOENT'){
			console.log('Directory \''+folderpath+ '\' doesnot exists.');
		}else{
			console.log('Error in creating folder:'+err);
		}
	}
	
}

//Create Location
var createLocation = function(req,res){
	
	console.log("************* creation of Location **************************");
	var locationfoldername = req.body.locationshortname;
	
	var newLocation = new Location(
		{
			locationshortname 		: 	req.body.locationshortname,
			locationname	 		: 	req.body.locationname,
			locationdesc			: 	req.body.locationdesc,
		});
	
	newLocation.save(function(err,newLocation){
		
		if(err){
			console.log("Location Creation Error:"+err);
			res.status(400).send({ success: false, message: 'Location \''+req.body.locationshortname+'\' already exists.'});
		}
		else{
			
			var folderpath = './data/'+locationfoldername;
			
			//Create the folder with locationshortname
			createFolder(folderpath);
			
			console.log("Success");
			res.json({status:'success',msg:'Location \''+req.body.locationname+'\' created successfully'});
		}
	});
};

//********************************************** Uploading File ***************************************
//Uploading file to specific location
var storage = multer.diskStorage({
	  
	destination: function (req, file, cb) {
		  
		console.log(req.body);
		console.log(file);

	    var dest = './data/'+req.body.locationshortname+'/';
	    
	    cb(null,dest);
	  },
	  
	filename: function (req, file, cb) {
	    cb(null, Date.now()+'-'+file.originalname);
	  }
	  
});


var upload = multer({ storage: storage }).any();
	
//Upload Location Image
var uploadLocationImage = function(req,res){
	
	console.log("************* uploading Location image **************************");

	upload(req,res, function(err){
		
		if(err){
			console.log('Error Uploading file.');
			
			res.status(200).send({ success: false, message: 'Unable to upload the file.'});
		}
		
		console.log('File is uploaded.');
		
		res.status(200).send({ success: true, message: 'Upload the file successfully.'});
	});
	
};

//Get all the images in a folder
/*var getLocationImages = function (req,res){
	
	console.log("************* Retrieving location images **************************");
	
	var locationfoldername = req.params.locationshortname;
	
	var folderPath = './data/'+locationfoldername+'/';
	
	var filePath = folderPath+'1508579742275-Ganesh_Photo.jpg';
	
	console.log("FilePath:"+filePath);
	
		
	res.writeHead(200, {'Content-Type':'image/jpg'});
	 // read binary data
    var img = fs.readFileSync(filePath);
    
    var binaryFile = new Buffer(img).toString('base64');
    
   res.status(200).send({ success: true, data:binaryFile,filename:filePath, message: 'Got the location images.'});
    
};*/


//Get all the images in a folder
var getLocationImages = function (req,res){
	
	console.log("************* Retrieving location images **************************");
	
	var locationfoldername = req.params.locationshortname;
	
	var folderPath = './data/'+locationfoldername+'/';
	
	getAllImagesInFolder(folderPath, function(err, files){
		
		if(err){
			
		}
		
		res.writeHead(200, {'Content-Type':'image/jpg'});
		
		var index = 0;
		
		var imagesArray = new Array(files.length);
		
		for(; index < files.length; index++ ){
			
			var filePath = folderPath+files[index];
			
			//console.log("FilePath:"+filePath);
			var img = fs.readFileSync(filePath);
		    
		    var binaryFile = new Buffer(img).toString('base64');
		    
		    //imagesArray[index] = binaryFile;
		    
		    var obj = {
		    	"imageName": files[index],
		    	"image":	 binaryFile
		    };
		    
		    imagesArray[index] = obj;
		}
		
		 res.write(JSON.stringify(imagesArray));

		 res.end();
		
	});
	
	
	//var filePath = folderPath+'1508579742275-Ganesh_Photo.jpg';
	
	//console.log("FilePath:"+filePath);
	
		
	//res.writeHead(200, {'Content-Type':'image/jpg'});
	
	 // read binary data
    //var img = fs.readFileSync(filePath);
    
    //var binaryFile = new Buffer(img).toString('base64');
    
    
    // read binary data
    //var img1 = fs.readFileSync(filePath);
    
    //var binaryFile1 = new Buffer(img).toString('base64');
    
    
   // var imagesArray = [binaryFile, binaryFile1];
    
    
   // res.status(200).send({ success: true, data:binaryFile, message: 'Got the location images.'});
    //res.write(JSON.stringify(imagesArray));

    //res.end();
    
};








//********************************************** End of Uploading File ***************************************
/*
//Update activity
var updateActivity = function(req,res){
	
	console.log('*************  updating the activity:\''+req.body.activityname+"\''  **************************");
	
	Activity.findOneAndUpdate({activityname : 	req.body.activityname},
			{$set:
				{
					activityname 		: 	req.body.activityname,
					activitydesc 		: 	req.body.activitydesc,
					activitydate		: 	req.body.activitydate,
				}
			}, function(err,activities){
				
				if(err){
					res.send(err);
				}else{
					res.json({status:'success',msg:'updated activity \''+req.body.activityname+'\' successfully'});
				}
				
			});
	};
	

*/

//Delete Location
var deleteLocation =  function(req,res){
	
	console.log("************* deletion of Location:"+req.params.locationshortname+'  **************************');
	
	var locationfoldername = req.params.locationshortname;
	
	Location.remove(
	{
		locationshortname : req.params.locationshortname
	
	}, 
	function(err, result) {
		
		if(err){
			console.log("Location Deletion Error:"+err);
			res.send(err);
		}
		else{
			console.log('Deleted the location \''+locationfoldername+'\' successfully.');
			
			var folderpath = './data/'+locationfoldername;
			
			//Remove the folder created with locationshortname
			removeFolder(folderpath);
			
			getAllLocations(res);
		}
			
	});
};


//get all Locations
var getLocations = function(req,res){
	
	getAllLocations(res);
};

var getLocationDetails = function(req,res){
	
	console.log('*************  Getting location details for the location \''+req.params.locationshortname+'\'. ************* ');
	
	Location.findOne({locationshortname:req.params.locationshortname }, function (err, location) {

	        if (err) {
	        	res.json({status:'error',msg:'Somthing Wrong!'});
	        }
	       
	        console.log('Retrieved activity name: '+location.locationname);
	        
	        if (location) {
	        	
	        	res.json(location); 	
	        } else {
	        	res.json({status:'failure',msg:'Unable to retrieve location \''+location.locationname+ '\' details.'});
	        }

    	});
	
};




module.exports = {
		createLocation,
		uploadLocationImage,
		getLocationImages,
		/*updateActivity,*/
		deleteLocation,
		getLocations,
		getLocationDetails
};


