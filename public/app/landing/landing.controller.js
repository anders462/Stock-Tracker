(function(){

'use strict'

angular
  .module('stockApp.landing')
  .controller('LandingController', LandingController)

  LandingController.$inject = ['stockFactory', 'socketFactory'];

  function LandingController(stockFactory, socketFactory){

    var vm = this;
    vm.stockForm ={};
    vm.stockData =[];

    vm.sendData = function(data)  {
      socketFactory.send(data);
      vm.stockForm ={};
    }

  }


})();
