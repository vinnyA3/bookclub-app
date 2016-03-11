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
            console.log(data);
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

    //set approval
    vm.approve = function(index){
      //get the id if the clicked book request
      var bookRequestId = vm.bookRequests[index]._id;
      Inbox.setApproval(bookRequestId)
        .then(function(data){
          //refesh the requests
          vm.getRequests();
        })
        .catch(function(data){
          console.log('error...' + err);
        });
    };

    vm.deleteRequest = function(index){
      var bookRequestId = vm.bookRequests[index]._id;
      console.log(bookRequestId);
      Inbox.deleteRequest(bookRequestId)
        .then(function(data){
          //refesh the inbox
          vm.getRequests();
        })
        .catch(function(data){
          console.log(data.err);
        });
    };

    vm.getRequests();

  });
