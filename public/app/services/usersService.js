//User Service - service used to get other user's information
angular.module('usersService',[])
  .factory('User', function($q,$http){
      var userService = {
        getUserInfo: getUserInfo,
        createRequests: createRequests
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

      function createRequests(title, swapFor){
          var deffered = $q.defer();

          $http.post('/user/'+id, {title:title, swapFor: swapFor})
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
  });
