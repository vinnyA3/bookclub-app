angular.module('libraryBookDirective',[])
  .directive('libraryBook', function(){
    return{
      restrict: 'E',
      templateUrl: 'app/views/partials/libraryBook.html',
      replace: true,
      scope:{
        book: "="
      }
    }
  });
