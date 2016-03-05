angular.module('inboxCtrl', ['inboxService'])
  .controller('inboxController', function(Inbox){

    var vm = this;
    vm.noRequests = false;
    vm.noRequestMessage = 'There are no book swap requests.';
    vm.swapRequests = [];

    vm.getRequests = function(){
        Inbox.getRequests()
          .then(function(data){
             console.log(data);
              vm.swapRequests = data[0].bookRequests;
              if(!vm.swapRequests.length){
                vm.noRequests = true;
              }
          })
          .catch(function(data){
            console.log('error....');
          });
    };

    vm.getRequests();

  });
