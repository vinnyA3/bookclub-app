angular.module('accountService', [])
  .factory('Account', function($q,$http){
    var accountService = {
      getAccountInfo: getAccountInfo,
      updateInfo: updateInfo,
      deleteAccount: deleteAccount
    };

    function getAccountInfo(){
      var deffered = $q.defer();

      $http.get('/account')
        .success(function(data){
          deffered.resolve(data);
        })
        .error(function(data){
          deffered.reject(data);
        })

        return deffered.promise;
    };

    function updateInfo(name, email, location, password){
      var deffered = $q.defer();

      $http.put('/account', {name: name, email: email, location: location, password: password})
        .success(function(data){
          //update the page info after update
          deffered.resolve(data);
        })
        .error(function(data){
          deffered.reject(data);
        })

        return deffered.promise;
    };

    function deleteAccount(){
      var deffered = $q.defer();

      $http.delete('/account')
        .success(function(data){
          //update the page info after update
          deffered.resolve(data);
        })
        .error(function(data){
          deffered.reject(data);
        })

        return deffered.promise;
    };

    return accountService;
  });
