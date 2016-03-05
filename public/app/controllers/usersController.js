angular.module('usersCtrl', ['usersService'])
  .controller('usersController', function(User, $stateParams, $location, $anchorScroll){

    var vm = this;
    var bookId = $stateParams.book_id;

    vm.userData = {};
    vm.requestedBook = {};
    vm.requestInfo = {};
    vm.swapTitle = null;
    vm.modalShown = false;

    //search for requested book - id must be a book id
    function searchRequestedBook(books, id){
      //refactor to use better algorithm
      for(var i = 0; i < books.length; ++i){
          if( books[i]._id === id ){
            return books[i];
          }
      };
    };

    vm.getUserInfo = function(){
      User.getUserInfo($stateParams.id)
        .then(function(data){
            vm.userData = data[0];
            vm.requestedBook = searchRequestedBook(vm.userData.books, bookId);
        })
        .catch(function(data){
            console.log('error...');
        });
    };

    vm.setRequestedBook = function(index){
       var book_id = vm.userData.books[index]._id;
       //search for the clicked book
       vm.requestedBook = searchRequestedBook(vm.userData.books, book_id);

       $location.hash('requested');
       $anchorScroll();

    };

    vm.sendBookRequest = function(){
      if(vm.swapTitle == '' || vm.swapTitle == null){
        return;
      }
      User.createRequest($stateParams.id, vm.requestedBook.title, vm.swapTitle)
        .then(function(data){
          vm.modalShown = false;
          vm.swapTitle = '';
          console.log('Success!!');
        })
        .catch(function(data){
          vm.modalShown = false;
          vm.swapTitle = '';
          console.log('error...');
        });
    };

    vm.toggleModal = function(){
        vm.modalShown = !vm.modalShown;
    };

    //cal get user info
    vm.getUserInfo();

  });
