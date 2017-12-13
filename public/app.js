'use strict';

/*var cdslabs = angular.module('CDSLabsApp',['Home','Signup','Authentication',
	'ui.router','ngCookies','ngMessages','ui.bootstrap']);*/
var cdslabs = angular.module('CDSLabsApp',['Home','Authentication','Dashboard','Home_LocationModule',
	'ActivityModule','UsersModule','LocationsModule','StudyServiceModule',
	'ui.router','ngCookies','ngMessages','ui.bootstrap','SessionDetails']);

cdslabs.config(['$stateProvider','$urlRouterProvider','$locationProvider', 
	function($stateProvider,$urlRouterProvider,$locationProvider) {
	
	/*$locationProvider.html5Mode(true);*/
	
	$stateProvider
	
	// HOME STATES AND NESTED VIEWS ========================================
    .state('login', {
        url: '/login',
        views:{
        	'logo':{
				templateUrl: 'views/locations/logo.html',
		        controller: 'LogoContrl'
			},        	
        	'top':{
        		controller: 'LoginLogoutController',
   			  	templateUrl: 'views/login.html'
        	}
        }
    })
    .state('signup', {
        url: '/signup',
        views:{
        	
        	'logo':{
				templateUrl: 'views/locations/logo.html',
		        controller: 'LogoContrl'
			},
        	'top':{
        		controller: 'SignupControl',
   			  	templateUrl: 'views/signup.html'
        	}
        }
    })

    .state('defaultHome', {
        url: '/defaultHome',
        views:{
		    'logo':{
				templateUrl: 'views/locations/logo.html',
		        controller: 'LogoContrl'
			},
			
			'top':{
        		templateUrl: 'views/home.html',
		        controller: 'HomeControl'
        	}
        }
    })
     .state('campusLab', {
        url: '/campusLab',
        views:{
        	
        	 'logo':{
 				templateUrl: 'views/locations/logo.html',
 		        controller: 'LogoContrl'
 			},
        	'top':{
        		templateUrl: 'views/locations/CampusLab.html',
		        controller: 'LocationDetails'
        	}
     
        }
    })
   
    .state('newstudy', {
        url: '/newstudy',
        views:{
        	'logo':{
				templateUrl: 'views/locations/logo.html',
		        controller: 'LogoContrl'
			},        	
        	'top':{
   	    	  	templateUrl: 'views/studies/newstudy.html',
   	    	  	controller: 'NewStudyControl'
        	}
        	
        }	
    })
    
    .state('dashboard', {
        url: '/dashboard',
        views:{
        	'logo':{
				templateUrl: 'views/locations/logo.html',
		        controller: 'LogoContrl'
			},        	
        	'top':{
   	    	  	templateUrl: 'views/studies/AllStudies_User.html',
   	    	  	controller: 'DashboardDisplay'
        	}
        	
        }	
    })
    
    .state('mystudies', {
        url: '/mystudies',
        views:{
        	'logo':{
				templateUrl: 'views/locations/logo.html',
		        controller: 'LogoContrl'
			},        	
        	'top':{
   	    	  	templateUrl: 'views/studies/MyStudies.html',
   	    	  	controller: 'DashboardDisplay'
        	}
        	
        }	
    })
    
    .state('allstudies', {
        url: '/allstudies',
        views:{
        	'logo':{
				templateUrl: 'views/locations/logo.html',
		        controller: 'LogoContrl'
			},        	
        	'top':{
   	    	  	templateUrl: 'views/studies/AllStudies_Admin.html',
   	    	  	controller: 'DashboardDisplay'
        	}
        	
        }	
    })
    .state('admin_users', {
        url: '/users',
        views:{
        	'logo':{
				templateUrl: 'views/locations/logo.html',
		        controller: 'LogoContrl'
			},        	
        	'top':{
   	    	  	templateUrl: 'views/admin/admin_users.html',
   	    	  	controller: 'Users'
        	}
        	
        }	
    })
    .state('admin_pendingusers', {
        url: '/pendingusers',
        views:{
        	'logo':{
				templateUrl: 'views/locations/logo.html',
		        controller: 'LogoContrl'
			},        	
        	'top':{
   	    	  	templateUrl: 'views/admin/admin_users_pending.html',
   	    	  	controller: 'PendingUsersCtrl'
        	}
        	
        }	
    })
    
    .state('admin_newuser', {
        url: '/newuser',
        views:{
        	'logo':{
				templateUrl: 'views/locations/logo.html',
		        controller: 'LogoContrl'
			},        	
        	'top':{
   	    	  	templateUrl: 'views/admin/admin_createuser.html',
   	    	  	controller: 'NewUserControl'
        	}
        	
        }	
    })
    .state('admin_updateuser', {
        url: '/updateuser/:username',
        views:{
        	'logo':{
				templateUrl: 'views/locations/logo.html',
		        controller: 'LogoContrl'
			},        	
        	'top':{
   	    	  	templateUrl: 'views/admin/admin_updateuser.html',
   	    	  	controller: 'UpdateUserControl'
        	}
        	
        }	
    })
    
    .state('admin_activities', {
        url: '/activities',
        views:{
        	'logo':{
				templateUrl: 'views/locations/logo.html',
		        controller: 'LogoContrl'
			},        	
        	'top':{
   	    	  	templateUrl: 'views/admin/admin_activities.html',
   	    	  	controller: 'Activities'
        	}
        	
        }	
    })
    .state('admin_newactivity', {
        url: '/newactivity',
        views:{
        	'logo':{
				templateUrl: 'views/locations/logo.html',
		        controller: 'LogoContrl'
			},        	
        	'top':{
   	    	  	templateUrl: 'views/admin/admin_createactivity.html',
   	    	  	controller: 'NewActivityControl'
        	}
        	
        }	
    })
    .state('admin_updateactivity', {
        url: '/updateactivity/:activityname',
        views:{
        	'logo':{
				templateUrl: 'views/locations/logo.html',
		        controller: 'LogoContrl'
			},        	
        	'top':{
   	    	  	templateUrl: 'views/admin/admin_updateactivity.html',
   	    	  	controller: 'UpdateActivityControl'
        	}
        	
        }	
    })
    .state('newActivity', {
        url: '/newactivity',
        views:{
        	'logo':{
				templateUrl: 'views/locations/logo.html',
		        controller: 'LogoContrl'
			},        	
        	'top':{
   	    	  	templateUrl: 'views/admin/newActivity.html',
   	    	  	controller: 'ActivitiesController'
        	}
        	
        }	
    })
    .state('admin_locations', {
        url: '/locations',
        views:{
        	'logo':{
				templateUrl: 'views/locations/logo.html',
		        controller: 'LogoContrl'
			},        	
        	'top':{
   	    	  	templateUrl: 'views/admin/admin_locations.html',
   	    	  	controller: 'Locations'
        	}
        	
        }	
    })
    .state('admin_newlocation', {
        url: '/newlocation',
        views:{
        	'logo':{
				templateUrl: 'views/locations/logo.html',
		        controller: 'LogoContrl'
			},        	
        	'top':{
   	    	  	templateUrl: 'views/admin/admin_createlocation.html',
   	    	  	controller: 'NewLocationControl'
        	}
        	
        }	
    })
        .state('admin_uploadlocationimage', {
        url: '/uploadlocationimage',
        views:{
        	'logo':{
				templateUrl: 'views/locations/logo.html',
		        controller: 'LogoContrl'
			},        	
        	'top':{
   	    	  	templateUrl: 'views/admin/admin_uploadlocationimage.html',
   	    	  	controller: 'LocationImageControl'
        	}
        	
        }	
    })
        .state('admin_viewdeletelocationimages', {
        url: '/viewdeletelocationimages/:locationshortname',
        views:{
        	'logo':{
				templateUrl: 'views/locations/logo.html',
		        controller: 'LogoContrl'
			},        	
        	'top':{
        		templateUrl: 'views/admin/admin_viewdeletelocationimage.html',
   	    	  	controller: 'LocationImageViewDeleteControl'
        	}
        	
        }	
    })
    /*.state('admin_newuser', {
        url: '/newuser',
        views:{
        	'logo':{
				templateUrl: 'views/locations/logo.html',
		        controller: 'LogoContrl'
			},        	
        	'top':{
   	    	  	templateUrl: 'views/admin/admin_createuser.html',
   	    	  	controller: 'NewUserControl'
        	}
        	
        }	
    })
    .state('admin_updateuser', {
        url: '/updateuser/:username',
        views:{
        	'logo':{
				templateUrl: 'views/locations/logo.html',
		        controller: 'LogoContrl'
			},        	
        	'top':{
   	    	  	templateUrl: 'views/admin/admin_updateuser.html',
   	    	  	controller: 'UpdateUserControl'
        	}
        	
        }	
    })*/
    /* .state('home.default', {
        url: '/home',
        views:{
        	'studydetails@home':{
        		controller: 'HomeDisplay',
    			templateUrl: 'views/ParticipantHomePage.html'
        	}
        	
        }	
    })*/
    
     /*.state('root', {
        url: '/',
        views:{
        	'top':{
        		templateUrl: 'views/home.html',
		        controller: 'HomeControl'
        	}
        }
    })*/
     .state('otherwise', {
        url: '/',
        views:{
        	'top':{
        		templateUrl: 'views/home.html',
		        controller: 'HomeControl'
        	},
        	 'logo':{
 				templateUrl: 'views/locations/logo.html',
 		        controller: 'LogoContrl'
 			}
        }
    })
    /*.state('noroute', {
        url: '/',
        views:{
        	'top':{
        		templateUrl: 'views/home.html',
		        controller: 'HomeControl'
        	}
        }
    })*/
    
    
    $urlRouterProvider.otherwise('/');
    
}]);



cdslabs.run(['$rootScope','$cookies','SessionService','LocationService', 
	function($rootScope,$cookies,SessionService,LocationService) {
	
	
	$rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
		
		//console.log("*******************Run: stateChangeStart :  Start");
		
		/*console.log("Authenticated:"+SessionService.isAuthenticated());
		console.log("Logged in User FullName:"+SessionService.getSessionDetails());*/
    	
		//Campus Lab 	
	   /* LocationService.clearLocation();*/
	    
    	//If user is already logged in
		/**
		 * Disable the links : login, signup
		 * Enable the links  : logout 
		 */
    	if(SessionService.isAuthenticated()){
    		
    		//Disable login link
    		$rootScope.loginFlag = true;//This is a negative condition to disable login link
    		
    		//Disable signup link
    		$rootScope.signUpFlag = true;//This is a negative condition to disable login link
    		
    		//Enable logout link
    		$rootScope.logoutFlag = true;
    		
    		//User Full Name
    		var userFullName = SessionService.getLoginUserFullName();
    		//console.log("Logged in User FullName:"+userFullName);
    		$rootScope.fullName = userFullName;
    		
    		//Dashboard Link
    		$rootScope.userAccess = true;
    		
    		//Admin
    		$rootScope.adminAccess = true;
    		
    	}else{
    		
    		//Disable login link
    		$rootScope.loginFlag = false;//This is a negative condition to disable login link
    		
    		//Disable signup link
    		$rootScope.signUpFlag = false;//This is a negative condition to disable login link
    		
    		//Enable logout link
    		$rootScope.logoutFlag = false;
    		
    		//Dashboard Link
    		$rootScope.userAccess = false;
    		
    		//Admin
    		$rootScope.adminAccess = false;
    	}
    	
    	//console.log("*******************Run: stateChangeStart :  End");
	});
	
	
	
}]);


