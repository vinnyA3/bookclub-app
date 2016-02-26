(function(){
  
  var model = {};

  var modelView = {
    init:function(){
      mainView.init();
    }
  };

  var mainView = {
    init:function(){
      this.nav = document.querySelector('.drawer-nav');
      this.main_div = document.querySelector('.main');
      this.render();
    },
    render:function(){
      var main = this.main_div,
          nav = this.nav,
          hamburger = main.querySelector('.main-hamburger');
      //on click of hamburger, add js open class
      hamburger.addEventListener('click', function(e){
          nav.classList.toggle('js-drawer-nav-open');
          e.stopPropagation();
      });
      //on click of main div, remove js open class
      main.addEventListener('click', function(){
          nav.classList.remove('js-drawer-nav-open');
      });
    }//end render
  };
  //call modelView init
  modelView.init();
}());
