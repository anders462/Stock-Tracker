(function(){

'use strict'

angular
  .module('stockApp.core')
  .factory("stockFactory", stockFactory)

  stockFactory.$inject = ['$http','BASE_URL'];

  function stockFactory($http,BASE_URL){

//get all stock data on ticker symbols in db
   var getStocks = function(){
     return $http.get(BASE_URL+ "/api");
   }

   var addStock = function(stock){
     return $http.post(BASE_URL + "/api", stock);
   }

   var removeStock = function(stock){
     return $http.delete(BASE_URL + '/api/' + stock);
   }


   return {
     getStocks: getStocks,
     addStock: addStock,
     removeStock: removeStock
   }


  }




})()
