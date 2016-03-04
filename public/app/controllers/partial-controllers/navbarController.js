angular.module('navbarCtrl', ['satellizer'])
  .controller('navbarController', function($auth, $location){
    var vm = this;

    //logout function
    vm.logOut = function(){
      $auth.logout()
        .then(function(){
          $location.path('/');
        });
    };

  });
