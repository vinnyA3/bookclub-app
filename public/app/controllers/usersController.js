angular.module('usersCtrl', ['usersService','accountService'])
  .controller('usersController', ['User', 'Account', '$stateParams', '$location', '$anchorScroll', function(User, Account, $stateParams, $location, $anchorScroll){

    var vm = this;
    var bookId = $stateParams.book_id; //book id from url param
    var currentUserName = null; //this is the currently LOGGED IN user's info - probably could've names my variables better

    vm.userData = {}; //users data ( user whos page youre on)
    vm.requestedBook = {}; //current requested book
    vm.swapTitle = null; // book title to be swapped for
    vm.modalShown = false; // modal determinant

    //search for requested book - id must be a book id
    function searchRequestedBook(books, id){
      //refactor to use better algorithm
      for(var i = 0; i < books.length; ++i){
          if( books[i]._id === id ){
            return books[i];
          }
      };
    };

    //get the currently logged in user's information - specifically, the user's name (used to send in the book req)
    vm.currentUserInfo = function(){
      Account.getAccountInfo()
        .then(function(data){
            //set the current user's name - will be passed into the sendBookRequest function
             currentUserName = data[0].name;
        })
        .catch(function(data){
             console.log('error....');
        });
    };

    vm.getUserInfo = function(){
      User.getUserInfo($stateParams.id)
        .then(function(data){
          //if we have true for logged in user (logged in user's page), redirect to user's account page
          if(data.logged_in_user === true){
            $location.path('/account');
          }else{
            vm.userData = data[0];
            vm.requestedBook = searchRequestedBook(vm.userData.books, bookId);
          }
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
      //create the request - send who its from, who its for, the requested book title and the swap title
      User.createRequest($stateParams.id, vm.userData.name, currentUserName, vm.requestedBook.title, vm.swapTitle)
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

    //ca/l get user info
    vm.getUserInfo();
    //get the current user's info -  name
    vm.currentUserInfo();

  }]);
