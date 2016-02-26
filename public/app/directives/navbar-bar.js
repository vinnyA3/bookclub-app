angular.module('navbarButtonDirective',[])
  .directive('navbarToggle',function(){
    return {
      restrict:'E',
      template:'<div><span class="main-hamburger fa fa-bars"></span><div>',
      replace:true,
      link:function(scope,element,attrs){
        var mainView = element.parent().parent().parent(),
            mainDiv = element.parent().parent(),
            nav = mainView[0].querySelector('.drawer-nav');
  
        element.on('click',function(e){
          nav.classList.toggle('js-drawer-nav-open');
          e.stopPropagation();
        });
        mainDiv.on('click', function(){
          nav.classList.remove('js-drawer-nav-open');
        })
      },
      controller:function($scope){
        console.log('operational');
      }
    }
  });
