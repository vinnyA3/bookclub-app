angular.module('bookDirective',[])
  .directive('bookDirective', function(){
    return{
      restrict: 'E',
      templateUrl: 'app/views/partials/book.html',
      replace: true,
      scope:{
        book: "="
      }
    }
  });
