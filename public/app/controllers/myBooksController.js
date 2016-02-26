angular.module('yourBooksCtrl', [])
  .controller('yourBooksController', function(){
    var vm = this;
    vm.yourBooks = [
      {src: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRQ9rKopiX1-yJi8XnIiDN-6D1QruyWvJlDc9Vu6sa_lZM2BjEM'},
      {src: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT_sMnSRutk9H2zx_7hpJwv658ZgUbaRUFJ_h7fYo93LydERdCx'},
      {src: 'http://flavorwire.files.wordpress.com/2012/08/gatsby.jpg'}
    ];
  });
