angular.module('yourBooksCtrl', ['bookService'])
  .controller('yourBooksController', ['Book', function(Book){
    var vm = this;

    vm.yourBooks = [];

    vm.getBooks = function(){
      Book.getUserBooks()
        .then(function(data){

          vm.yourBooks = data.books;
        })
        .catch(function(data){
          console.log('error fetching books');
        });
    };
    //add book
    vm.addBook = function(){
      if(vm.book.title === ''){
        return;
      }
      Book.addUserBook(vm.book.title)
        .then(function(data){
          vm.book.title = '';
          //refresh the data
          vm.getBooks();
        })
        .catch(function(data){
          console.log('error adding book');
        });
    };

    vm.deleteBook = function(id){
      //get book id
      var bookId = vm.yourBooks[id]._id;

      Book.deleteUserBook(bookId)
        .then(function(data){
          console.log('book deleted');
          //refresh the book list
          vm.getBooks();
        })
        .catch(function(data){
          console.log('failed to delete book');
        });
    }

    //call get user books
    vm.getBooks();

  }]);
