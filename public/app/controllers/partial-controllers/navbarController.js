angular.module('navbarCtrl', ['satellizer'])
  .controller('navbarController', function($auth, $location){
    var vm = this;

    /*isAuthenticated function
    vm.isAuthenticated = function(){
      return $auth.isAuthenticated();
    };*/

    //logout function
    vm.logOut = function(){
      $auth.logout()
        .then(function(){
          $location.path('/');
        });
    };

  });
