angular.module('inboxCtrl', ['inboxService'])
  .controller('inboxController', function(Inbox){

    var vm = this,
        currentUser = null;

    vm.noRequests = false;
    vm.noRequestMessage = 'There are no book swap requests.';
    vm.bookRequests = [];

    vm.getRequests = function(){
        Inbox.getRequests()
          .then(function(data){
            //set bookRequests variable
             vm.bookRequests = data[0].bookRequests;
             //if the book requests array is empty....
             if(!vm.bookRequests.length){
               vm.noRequests = true;
               return;
             }
          })
          .catch(function(data){
            console.log('error....');
          });
    };

    vm.getRequests();

  });
