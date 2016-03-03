angular.module('appRoutes',['ui.router'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $stateProvider
      .state('auth', {
        url: '/',
        views:{
          //main - intro page
          '':{templateUrl:'app/views/pages/auth.html', controller: 'authController as authenticate'},
          resolve: {
            skipIfLoggedIn: skipIfLoggedIn
          }
        }
      })
      .state('home', {
          url:'/home',
          views:{
            '':{templateUrl:'app/views/pages/home.html', controller: 'libraryController as library'},
            'nav@home': {templateUrl: 'app/views/partials/navbar.html', controller: 'navbarController as navbar'},
          }
      })
      .state('account', {
          url:'/account',
          views:{
            '':{templateUrl:'app/views/pages/account.html', controller: 'accountController as account'},
            'nav@account': {templateUrl: 'app/views/partials/navbar.html', controller: 'navbarController as navbar'}
          },
          resolve: {
					    loginRequired: loginRequired
				  }
      })
      .state('inbox', {
         url:'/inbox',
         views:{
           '':{templateUrl:'app/views/pages/inbox.html', controller: 'inboxController as inbox'},
           'nav@inbox':{templateUrl:'app/views/partials/navbar.html', controller: 'navbarController as navbar'}
         },
         resolve: {
				   	loginRequired: loginRequired
				 }
      })
      .state('your-books',{
         url:'/your-books',
         views:{
           '':{templateUrl:'app/views/pages/my-books.html', controller: 'yourBooksController as books'},
           'nav@your-books':{templateUrl:'app/views/partials/navbar.html', controller: 'navbarController as navbar'}
         },
         resolve: {
				  	loginRequired: loginRequired
				 }
      })
      .state('user',{
        url:'/user/:id?:book_id',
        views:{
          '':{templateUrl:'app/views/pages/user.html', controller: 'usersController as user'},
          'nav@user':{templateUrl:'app/views/partials/navbar.html', controller: 'navbarController as navbar'}
        },
        resolve: {
					loginRequired: loginRequired
				}
      });

      //otherwise, redirect to home
      $urlRouterProvider.otherwise('/home');

      //set base href # to /
      $locationProvider.html5Mode(true);


      //========================  SKIPPED IF LOGGED IN FUNCTION ==============================
  function skipIfLoggedIn($q, $auth) {
     var deferred = $q.defer();
     if ($auth.isAuthenticated()) {
       deferred.reject();
     } else {
       deferred.resolve();
     }
     return deferred.promise;
   }
      //========================  LOGIN REQUIRED RESOLVE FUNCTION  ===========================
		function loginRequired($q,$location,$auth){
			var deffered = $q.defer();
			if($auth.isAuthenticated()){
			   	deffered.resolve();
			}else{
				//redirect to home page
				$location.path('/');
			}
			return deffered.promise;
		}

  });
