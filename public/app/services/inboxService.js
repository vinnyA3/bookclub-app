angular.module('inboxService',[])
  .factory('Inbox', function($q,$http){
    var inboxService = {
      getRequests: getRequests,
      setApproval: setApproval,
      deleteRequest: deleteRequest
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

    function setApproval(id){
      var deffered = $q.defer();

      $http.put('/api/inbox',{bookRequestId: id})
        .success(function(data){
          deffered.resolve(data);
        })
        .error(function(data){
          deffered.reject(data);
        });

      //return promise object
      return deffered.promise;
    };

    function deleteRequest(id){
      var deffered = $q.defer();

      $http.delete('/api/inbox/' + id)
        .success(function(data){
          deffered.resolve(data);
        })
        .error(function(data){
          deffered.reject(data);
        });
        //return the promise Objec
        return deffered.promise;
    };

    return inboxService;

  });
