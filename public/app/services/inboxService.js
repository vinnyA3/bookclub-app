angular.module('inboxService',[])
  .factory('Inbox', function($q,$http){
    var inboxService = {
      getRequests: getRequests,
      createRequest: createRequest
    };

    function getRequests(id){
        var deffered = $q.defer();

        $http.get('/inbox')
          .success(function(data){
            deffered.resolve(data);
          })
          .error(function(data){
            deffered.reject();
          });
        //return promise object
        return deffered.promise;
    };

    return inboxService;
    
  });
