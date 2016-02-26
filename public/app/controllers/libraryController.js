angular.module('libraryCtrl', [])
  .controller('libraryController', function(){
    var vm = this;
    vm.libraryBooks = [
      {src: 'http://www.adazing.com/wp-content/uploads/2012/09/animal-farm.jpg'},
      {src: 'http://flavorwire.files.wordpress.com/2012/08/gatsby.jpg'},
      {src: 'https://s-media-cache-ak0.pinimg.com/736x/36/cc/b4/36ccb4421b974e83d94912b08ba6ffbe.jpg'},
      {src: 'https://www.smashingmagazine.com/images/book-covers/book-covers-18.jpg'},
      {src: 'http://cdn2.digitalartsonline.co.uk/cmsdata/news/3280532/Journey-to-the-Centre-of-the-Earth.jpg'},
      {src: 'http://lovelace-media.imgix.net/uploads/1094/d460f440-6f73-0133-0bb5-0e76e5725d9d.jpg?w=670&fit=max&auto=format&q=70'},
    ];
  });
