angular.module('appRoutes',['ui.router'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $stateProvider
      .state('home', {
          url:'/',
          views:{
            '':{templateUrl:'app/views/pages/home.html'},
            'nav@home': {templateUrl: 'app/views/partials/navbar.html'}
          }
      })
      .state('account', {
          url:'/account',
          views:{
            '':{templateUrl:'app/views/pages/account.html'},
            'nav@account': {templateUrl: 'app/views/partials/navbar.html'}
          }
      })
      .state('inbox', {
         url:'/inbox',
         views:{
           '':{templateUrl:'app/views/pages/inbox.html'},
           'nav@inbox':{templateUrl:'app/views/partials/navbar.html'}
         }
      });

      //otherwise, redirect to home
      $urlRouterProvider.otherwise('/');

      //set base href # to /
      $locationProvider.html5Mode(true);

  });
