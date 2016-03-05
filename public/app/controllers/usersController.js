angular.module('usersCtrl', ['usersService'])
  .controller('usersController', function(User, $stateParams, $location, $anchorScroll){

    var vm = this;
    var bookId = $stateParams.book_id;

    vm.userData = {};
    vm.requestedBook = {};

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

    //cal get user info
    vm.getUserInfo();

  });
