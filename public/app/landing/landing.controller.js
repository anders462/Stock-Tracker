(function(){

'use strict'

angular
  .module('stockApp.landing')
  .controller('LandingController', LandingController)

  LandingController.$inject = ['socketFactory'];

  function LandingController(socketFactory){

    var vm = this;


    vm.sendData = function(data)  {
      console.log(data);
    }

  }



})();
