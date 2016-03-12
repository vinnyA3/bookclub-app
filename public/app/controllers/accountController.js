angular.module('accountCtrl', ['satellizer','accountService'])
  .controller('accountController', ['$auth', 'Account','$location', function($auth, Account, $location){
    var vm = this;

    vm.accountCreds = {};
    vm.accountInfo = {};

    //get the account info
    vm.getAccount = function(){
      Account.getAccountInfo()
        .then(function(data){

          vm.accountCreds.name = data[0].name;
          vm.accountCreds.email = data[0].email;
          vm.accountCreds.location = data[0].location;
        })
        .catch(function(data){
          console.log('error...');
        });
    };

    //update account info
    vm.updateAccountInfo = function(){
      Account.updateInfo(vm.accountInfo.name, vm.accountInfo.email, vm.accountInfo.location,vm.accountInfo.password)
        .then(function(data){
          //empty form
          vm.accountInfo = {};
          //refresh the account PAGE
          vm.getAccount();
        })
        .catch(function(data){
          console.log('error ....');
        });
    };

    vm.deleteAccount = function(){
      Account.deleteAccount()
        .then(function(){
          $auth.logout()
            .then(function(){
              $location.path('/');
            });
        })
        .catch(function(){
          console.log('error...');
        });
    }

    //call get account
    vm.getAccount();

  }]);
