angular.module('usersCtrl', ['usersService'])
  .controller('usersController', function(User,$stateParams){
    var vm = this;

    vm.userData = {};
    vm.requestedBook = {};

    console.log($stateParams.book_id);
    //search for requested book
    function searchRequestedBook(books){
      var bookId = $stateParams.book_id;

      //refactor to use better algorithm
      for(var i = 0; i < books.length; ++i){
        
          if( books[i]._id === bookId ){
            return books[i];
          }
      };
    };

    vm.getUserInfo = function(){
      User.getUserInfo($stateParams.id)
        .then(function(data){

            vm.userData = data[0];
            vm.requestedBook = searchRequestedBook(data[0].books);
        })
        .catch(function(data){
            console.log('error...');
        });
    };

    //cal get user info
    vm.getUserInfo();

  });
