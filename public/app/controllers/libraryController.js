angular.module('libraryCtrl', [])
  .controller('libraryController', function(){
    var vm = this;
    vm.libraryBooks = [
      {id:'1',src: 'http://www.adazing.com/wp-content/uploads/2012/09/animal-farm.jpg',name:'Animal Farm'},
      {id:'2',src: 'http://flavorwire.files.wordpress.com/2012/08/gatsby.jpg',name:'The Great Gatsby'},
      {id:'3',src: 'https://s-media-cache-ak0.pinimg.com/736x/36/cc/b4/36ccb4421b974e83d94912b08ba6ffbe.jpg',name:'The Scarlet Letter'},
      {id:'4',src: 'https://www.smashingmagazine.com/images/book-covers/book-covers-18.jpg',name:'A Clockwork Orange'},
      {id:'5',src: 'http://cdn2.digitalartsonline.co.uk/cmsdata/news/3280532/Journey-to-the-Centre-of-the-Earth.jpg',name:'Journey to the Center of the Earth'},
      {id:'6',src: 'http://lovelace-media.imgix.net/uploads/1094/d460f440-6f73-0133-0bb5-0e76e5725d9d.jpg?w=670&fit=max&auto=format&q=70',name:'The Wizard of OZ'},
      {id:'7',src: 'http://cdn.pastemagazine.com/www/system/images/photo_albums/bestbookcovers/large/the-martian.jpg?1384968217',name:'The Martian'},
      {id:'8',src: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT_sMnSRutk9H2zx_7hpJwv658ZgUbaRUFJ_h7fYo93LydERdCx',name:'Alice in Wonderland'},
      {id:'9',src: 'http://cdn.pastemagazine.com/www/system/images/photo_albums/minimalist-book-covers/large/photo_28531_0.jpg?1384968217',name:'Romeo and Juliet'},
      {id:'10',src: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRQ9rKopiX1-yJi8XnIiDN-6D1QruyWvJlDc9Vu6sa_lZM2BjEM',name:'The Book of Strange New Things'},
      {id:'11',src: 'http://40.media.tumblr.com/8c36f59e2ea0f2680ed263954cd949ae/tumblr_mnwnkcOq6V1qcrt6io1_500.jpg',name:'Paper Towns'},
      {id:'12',src: 'http://covers.openlibrary.org/b/isbn/9780553380163-M.jpg',name:'A Brief History Of Time'},
    ];
  });
