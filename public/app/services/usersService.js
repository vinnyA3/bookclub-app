//User Service - service used to get other user's information
angular.module('usersService',[])
  .factory('User', ['$q', '$http', function($q,$http){
      var userService = {
        getUserInfo: getUserInfo,
        //create book request
        createRequest: createRequest
      };

      function getUserInfo(id){
          var deffered = $q.defer();

          $http.get('/api/user/'+id)
            .success(function(data){
              deffered.resolve(data);
            })
            .error(function(data){
              deffered.reject();
            });
          //return promise object
          return deffered.promise;
      };

      function createRequest(id, sendTo, fromUser, title, swapFor){
          var deffered = $q.defer();

          $http.post('/api/user/'+id, {sendToUserId: id, sendTo: sendTo, fromUser: fromUser, title:title, swapFor: swapFor})
            .success(function(data){
              deffered.resolve(data);
            })
            .error(function(data){
              deffered.reject(data);
            });
          //return promise object
          return deffered.promise;
      };

      return userService;
  }]);
