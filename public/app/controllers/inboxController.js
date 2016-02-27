angular.module('inboxCtrl', [])
  .controller('inboxController', function(){

    var vm = this;

    vm.modalShown = false;
    vm.approvedInfo = {};

    vm.swapRequests = [
      {name: 'Julie', book: 'Cosmos'},
      {name: 'Julie', book: 'Cosmos'},
      {name: 'Julie', book: 'Cosmos'},
      {name: 'Julie', book: 'Cosmos'},
      {name: 'Julie', book: 'Cosmos'},
      {name: 'Julie', book: 'Cosmos'},
      {name: 'Julie', book: 'Cosmos'},
      {name: 'Julie', book: 'Cosmos'},
      {name: 'Julie', book: 'Cosmos'},
    ];

    vm.toggleModal = function(name,book){
        vm.modalShown = !vm.modalShown;
        vm.approvedInfo.name = name;
        vm.approvedInfo.book = book;
    };

  });
