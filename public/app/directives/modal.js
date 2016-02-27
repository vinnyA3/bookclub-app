angular.module('modalDialogDirective',[])
  .directive('modalDialog', function() {
      return {
        restrict: 'E',
        scope: {
          show: '=',
          user: '=',
          book: '='
        },
        replace: true, // Replace with the template below
        templateUrl: 'app/views/partials/modalView.html',
        transclude: true, // we want to insert custom content inside the directive
        link: function(scope, element, attrs) {
          //watch for scope changes
          scope.dialogStyle = {};
          if (attrs.width)
            scope.dialogStyle.width = attrs.width;
          if (attrs.height)
            scope.dialogStyle.height = attrs.height;
          scope.hideModal = function() {
            scope.show = false;
          };
        }
      };
    });
