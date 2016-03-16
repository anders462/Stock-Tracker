(function(){

'use strict'

angular
  .module('stockApp.core')
  .factory("stockFactory", stockFactory)

  stockFactory.$inject = [];

  function stockFactory(){

   var stocks = [];

   var save = function(data){
     stocks.push(data);
     console.log(stocks);

   }

   return {
     save: save
   }


  }




})()
