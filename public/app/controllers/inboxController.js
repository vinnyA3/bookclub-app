angular.module('inboxCtrl', ['inboxService'])
  .controller('inboxController', function(Inbox){

    var vm = this,
        currentUser = null;

    vm.noRequests = false;
    vm.noRequestMessage = 'There are no book swap requests.';
    vm.bookRequestsForUser = [];
    vm.outstandingBookRequests = [];

    //filter function - filter book requests into bookRequestsForUser and outstandingBookRequests
    function filterRequests(bookRequests){
      bookRequests.filter(function(request){
        if(request.isUsersRequest === true){
          vm.bookRequestsForUser.push(request);
        }else{
          vm.outstandingBookRequests.push(request);
        }
      });
    };

  //delete function - takes in selected request array and an index
  function deleteBookRequest(arr,index){

    var requestArray = arr,
        bookRequestId = requestArray[index]._id;

    Inbox.deleteRequest(bookRequestId)
      .then(function(data){
        //delete what was in the array && refesh the inbox
        vm.outstandingBookRequests = [];
        vm.bookRequestsForUser = [];
        vm.getRequests();
      })
      .catch(function(data){
        console.log(data.err);
      });
  };

    vm.getRequests = function(){
        Inbox.getRequests()
          .then(function(data){
             //if the return data - book requests array is empty....
             if(!data[0].bookRequests.length){
               vm.noRequests = true;
               return;
             }
             //filter the book requests ...
             filterRequests(data[0].bookRequests);
          })
          .catch(function(data){
            console.log('error....');
          });
    };

    //set approval
    vm.approve = function(index){
      //get the id if the clicked book request
      var bookRequestId = vm.bookRequestsForUser[index]._id;
      Inbox.setApproval(bookRequestId)
        .then(function(data){
          //clear the bookRequestsForUser arr and refresh the inbox
          vm.bookRequestsForUser = [];
          vm.getRequests();
        })
        .catch(function(data){
          console.log('error...' + err);
        });
    };

    vm.deleteRequestForUser = function(index){
       deleteBookRequest(vm.bookRequestsForUser, index);
    };

    vm.deleteOutstandingRequest = function(index){
      deleteBookRequest(vm.outstandingBookRequests, index);
    };

    vm.getRequests();

  });
