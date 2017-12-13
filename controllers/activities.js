var homeDir = process.env.HOMEPATH;

var Activity  		= require('../models/activity');
var moment 			= require('moment');

//get all activities
function getAllActivities(res){
	
	//Activity.find(function(err, activities){
	//Activity.find().sort({activitydate: 'desc'}).exec(function(err, activities){   -- Descending
	Activity.find().sort({activitydate: -1}).exec(function(err, activities){
		if(err){
			res.json({
				result:'failed',
				data:err,
				message:'Unable to retrieve the activities from the database.'
			});
		}else{
			
			//console.log("Activities Size:"+activities.length);
			//console.log("Activities Size:"+activities);
			
			var newactivities = JSON.parse(JSON.stringify(activities));
			
			
			/*console.log('****************************');
			console.log(year, month, date);
			console.log('****************************');*/
			
			// Each message is customized
			newactivities.forEach(function(activity){
				
				//console.log("Activity Date:"+activity.activitydate);
				
				var activitydate = new Date(activity.activitydate);
				
				//console.log("current Date:"+new Date());
				
				
				
				
				var ms = moment.utc(new Date(),"DD/MM/YYYY HH:mm:ss").diff(moment(activitydate,"DD/MM/YYYY HH:mm:ss"));
				
				var d = moment.duration(ms);
				
				
				//console.log(d.days(), d.hours(), d.minutes(), d.seconds());
				
				if(d.days() > 0){
					activity.activitydate = moment(activitydate).format("YYYY-MMM-DD HH:mm:ss") + '	( '+d.days()+' Days ago)';
				
				}else if(d.hours() > 0){
					activity.activitydate = moment(activitydate).format("YYYY-MMM-DD HH:mm:ss") + '	( '+d.hours()+' Hours ago)';
				
				}else if(d.minutes() > 0){
					activity.activitydate = moment(activitydate).format("YYYY-MMM-DD HH:mm:ss") + '	( '+d.minutes()+' Minutes ago)';
				
				}else if(d.seconds() > 0){
					activity.activitydate = moment(activitydate).format("YYYY-MMM-DD HH:mm:ss") + '	( '+d.seconds()+' Seconds ago)';
				
				}else if(d.seconds() === 0){
					activity.activitydate = moment(activitydate).format("YYYY-MMM-DD HH:mm:ss") + '	( Posted Now )';
				
				}else{
					activity.activitydate = moment(activitydate).format("YYYY-MMM-DD HH:mm:ss");
				}
				
				
			});
			
			//console.log("Activities Size:"+newactivities);
			
			res.json(newactivities);  //// return all activities in JSON format
		}
	});
}


//get all activities
function getDatewiseActivities(res){
	
	//Activity.find(function(err, activities){
	//Activity.find().sort({activitydate: 'desc'}).exec(function(err, activities){   -- Descending
	Activity.find().sort({activitydate: -1}).exec(function(err, activities){
		if(err){
			res.json({
				result:'failed',
				data:err,
				message:'Unable to retrieve the activities from the database.'
			});
		}else{
			
			var newactivities = JSON.parse(JSON.stringify(activities));
			
			//Current Date & Time -- its details
			var currentDate 	= moment.utc(new Date(),"DD/MM/YYYY HH:mm:ss");
			
			var currentyear 	= currentDate.format('YYYY');
			var currentmonth 	= currentDate.format('M');
			var currentdate 	= currentDate.format('D');
			
			var recentActivities 	= [];
			var monthActivities 	= [];
			var oldActivities 		= [];
			
			// Parsing through each record
			newactivities.forEach(function(activity){
				
				//Activity Date
				var activitydate = new Date(activity.activitydate);				
				
				//Milli Seconds Comparision
				var ms = moment.utc(new Date(),"DD/MM/YYYY HH:mm:ss").diff(moment(activitydate,"DD/MM/YYYY HH:mm:ss"));
				var d = moment.duration(ms);
				
				//Days comparision
				var ms1 = moment.utc(new Date(),"DD/MM/YYYY").diff(moment(activitydate,"DD/MM/YYYY"));
				
				var dayscomp = moment.duration(ms1);
				
				
				//console.log(d.days(), d.hours(), d.minutes(), d.seconds());
				
				if(dayscomp.days() > 0){
					activity.duration = moment(activitydate).format("YYYY-MMM-DD") + '	( '+dayscomp.days()+' Days ago)';
				
				}else if(d.hours() > 0){
					activity.duration = moment(activitydate).format("YYYY-MMM-DD") + '	( '+d.hours()+' Hours ago)';
				
				}else if(d.minutes() > 0){
					activity.duration = moment(activitydate).format("YYYY-MMM-DD") + '	( '+d.minutes()+' Minutes ago)';
				
				}else if(d.seconds() > 0){
					activity.duration = moment(activitydate).format("YYYY-MMM-DD") + '	( '+d.seconds()+' Seconds ago)';
				
				}else if(d.seconds() === 0){
					activity.duration = moment(activitydate).format("YYYY-MMM-DD") + '	( Posted Now )';
				
				}else{
					activity.duration = moment(activitydate).format("YYYY-MMM-DD");
				}
				
				//Activity Date details
				var actDate		 	= moment(activitydate,"DD/MM/YYYY HH:mm:ss");
				
				var actyear			=  actDate.format('YYYY');
				var actmonth		=  actDate.format('M');
				var actdate 		= actDate.format('D');
				
				var NoOfDays = currentdate-actdate;
				//console.log("No of Days:"+NoOfDays);
								
				//Today's Activities
				if(NoOfDays <= 7 && (actmonth === currentmonth)){
					
					recentActivities.push(activity);
					
				}else if(NoOfDays > 7 && (actmonth === currentmonth)){
					
					monthActivities.push(activity);
					
				}else if(actmonth !== currentmonth){
					
					oldActivities.push(activity);
				}
				
			});
			
			var datewiseActivities = {
			    	"recent": recentActivities,
			    	"month": monthActivities,
			    	"old": oldActivities
			};
			
			res.json(datewiseActivities);
		}
	});
}


//Create Activity
var createActivity = function(req,res){
	
	console.log("************* creation of activity:"+req.body.activityname+" **************************");
	console.log(req.body.activityname);
	console.log(req.body.activitydesc);
	console.log(req.body.activitydate);
	
	var newActivity = new Activity(
		{
			activityname 		: 	req.body.activityname,
			activitydesc 		: 	req.body.activitydesc,
			activitydate		: 	req.body.activitydate,
		});
	
	newActivity.save(function(err,newActivity){
		
		if(err){
			console.log("Activity Creation Error:"+err);
			res.send(err);
		}
		else{
			console.log("Success");
			res.json({status:'success',msg:'Activity \''+req.body.activityname+'\' created successfully'});
		}
	});
};


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
	


//Delete Activity
var deleteActivity =  function(req,res){
	
	console.log("************* deletion of activity:"+req.params.activityname+'  **************************');
	
	Activity.remove(
	{
		activityname : req.params.activityname
	
	}, 
	function(err, result) {
		
		if(err){
			console.log("Activity Deletion Error:"+err);
			res.send(err);
		}
		else{
			console.log('Deleted the activity \''+req.body.activityname+'\' successfully');
			
			getAllActivities(res);
		}
			
	});
};



//get all Activities
var getActivities = function(req,res){
	
	getAllActivities(res);
};


//get all Activities
var getDateWiseActivities = function(req,res){
	
	getDatewiseActivities(res);
};

var getActivityDetails = function(req,res){
	
	console.log('*************  Getting activity details for the activity \''+req.params.activityname+'\'. ************* ');
	
	Activity.findOne({activityname:req.params.activityname }, function (err, activities) {

	        if (err) {
	        	res.json({status:'error',msg:'Somthing Wrong!'});
	        }
	       
	        console.log('Retrieved activity name: '+activities.activityname);
	        
	        if (activities) {
	        	
	        	res.json(activities); 	
	        } else {
	        	res.json({status:'failure',msg:'Unable to retrieve activity \''+req.params.activityname+ '\' details.'});
	        }

    	});
	
};




module.exports = {
		createActivity,
		updateActivity,
		deleteActivity,
		getActivities,
		getActivityDetails,
		getDateWiseActivities
};


