angular.module('inboxService',[])
  .factory('Inbox', function($q,$http){
    var inboxService = {
      getRequests: getRequests
    //  createRequest: createRequest
    };

    function getRequests(){
        var deffered = $q.defer();

        $http.get('/api/inbox')
          .success(function(data){
            deffered.resolve(data);
          })
          .error(function(data){
            deffered.reject(data);
          });
        //return promise object
        return deffered.promise;
    };

    return inboxService;

  });