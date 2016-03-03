angular.module('bookService', [])
  .factory('Book',function($q,$http){
    var bookFactory = {
      getAllBooks: getAllBooks,
      getUserBooks: getUserBooks,
      addUserBook: addUserBook,
      deleteUserBook: deleteUserBook
    };

    function getAllBooks(){
      //create deffer object
      var deffered = $q.defer();
      //make http request
      $http.get('/api/all-books')
        .success(function(data){
          if(data){
            deffered.resolve(data);
          }
        })
        .error(function(data){
            deffered.reject(data)
        });

        return deffered.promise;
    };

    function getUserBooks(){
      //create deffer object
      var deffered = $q.defer();
      //make http request
      $http.get('/api/user-books')
        .success(function(data){
          if(data){
            deffered.resolve(data);
          }
        })
        .error(function(data){
            deffered.reject(data)
        });

        return deffered.promise;
    };

    function addUserBook(title){
      //create deffer object
      var deffered = $q.defer();
      //make http request
      $http.post('/api/user-books',{title: title})
        .success(function(data){
          if(data){
            deffered.resolve(data);
          }
        })
        .error(function(data){
            deffered.reject(data)
        });

        return deffered.promise;
    };

    function deleteUserBook(id){
      //create deffer object
      var deffered = $q.defer();
      //make http request
      $http.delete('/api/user-books/' + id)
        .success(function(data){
          if(data){
            deffered.resolve(data);
          }
        })
        .error(function(data){
            deffered.reject(data)
        });

        return deffered.promise;
    };

    return bookFactory;
  });
