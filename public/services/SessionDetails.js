'use strict';
 
var session = angular.module('SessionDetails',[]);


session.service('SessionService', function () {
	
	var authenticated = false;
	var userName = '';
	var fullName = '';
	var role = '';
	
	this.setSessionDetails = function(sessionID, loginUserName, loginFullName, role){
		
		authenticated = true;
		
		userName = loginUserName;
		
		fullName = loginFullName;
		
		//console.log("**** loginUserName"+loginUserName);
		//console.log("**** userName"+userName);
		
	};
	
	this.clearSessionDetails = function(){
		
		authenticated = false;
		
		userName = '';
		
		fullName = '';
		
		//console.log("**** loginUserName"+loginUserName);
		//console.log("**** userName"+userName);
		
	};
	
	
	this.isAuthenticated = function(){
		
		return authenticated;
	};
	
	this.getLoginUserFullName = function(){
		
		return userName;
	};
	
	this.getLoggedInUserName = function(){
		
		return fullName;
	};
	
	this.getSessionDetails = function(){
		
		return fullName;
	};
	
	
	
});