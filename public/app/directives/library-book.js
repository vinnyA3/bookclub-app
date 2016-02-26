angular.module('libraryBookDirective',[])
  .directive('libraryBook', function(){
    return{
      restrict: 'E',
      templateUrl: 'app/views/partials/libraryBook.html',
      replace: true,
      scope:{
        book: "="
      },
      link:function(scope,element,attrs){
        element.css({
          'background':'url('+scope.book.src+')',
          'background-size': 'cover',
          'background-position': 'center',
          'background-repeat': 'no-repeat'
        });
      }
    }
  });
