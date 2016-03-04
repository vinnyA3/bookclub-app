angular.module('libraryCtrl', ['bookService'])
  .controller('libraryController', function(Book){
    var vm = this;

    vm.libraryBooks = [];

    //get all books
    vm.getBooks = function(){
      Book.getAllBooks()
        .then(function(data){
          vm.libraryBooks = data;
        })
        .catch(function(data){
          console.log('error .....');
        });
    };

    //call get all books
    vm.getBooks();

  });
