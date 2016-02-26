angular.module('appRoutes',['ui.router'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $stateProvider
      .state('home', {
          url:'/',
          views:{
            '':{templateUrl:'app/views/pages/home.html', controller: 'libraryController as library'},
            'nav@home': {templateUrl: 'app/views/partials/navbar.html'},
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
           '':{templateUrl:'app/views/pages/inbox.html', controller: 'inboxController as inbox'},
           'nav@inbox':{templateUrl:'app/views/partials/navbar.html'}
         }
      })
      .state('your-books',{
         url:'/your-books',
         views:{
           '':{templateUrl:'app/views/pages/my-books.html', controller: 'yourBooksController as books'},
           'nav@your-books':{templateUrl:'app/views/partials/navbar.html'}
         }
      })
      .state('user',{
        url:'/user/:id?:book_id',
        views:{
          '':{templateUrl:'app/views/pages/user.html',
          controller:function($stateParams,$scope){
            $scope.id = $stateParams;
          }
        },
          'nav@user':{templateUrl:'app/views/partials/navbar.html'}
        }
      });

      //otherwise, redirect to home
      $urlRouterProvider.otherwise('/');

      //set base href # to /
      $locationProvider.html5Mode(true);

  });
