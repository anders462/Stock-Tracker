(function(){
"use strict"

//Factory for all /api/bars api calls part of sub module "core"
angular
   .module('stockApp.core')
   .factory('socketFactory', socketFactory);

   socketFactory.$inject = ['BASE_URL','$rootScope'];

   function socketFactory(BASE_URL, $rootScope){

    var socket = io.connect(BASE_URL);



    socket.on('stock',function(stock){
      console.log("recieved ",stock)
      $rootScope.stock = stock;
      $rootScope.$broadcast("change");
    });

    var send =  function(stock){
       console.log("socket emit",stock);
       socket.emit('stock', stock);
     }

     // return available functions for use in controllers
     return {
       send: send
     };
   }

})();
