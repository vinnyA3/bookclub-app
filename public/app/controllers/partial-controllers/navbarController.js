angular.module('navbarCtrl', ['satellizer'])
  .controller('navbarController', ['$auth', '$location', function($auth, $location){
    var vm = this;

    //logout function
    vm.logOut = function(){
      $auth.logout()
        .then(function(){
          $location.path('/');
        });
    };

  }]);
