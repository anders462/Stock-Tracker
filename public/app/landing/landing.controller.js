(function(){

'use strict'

angular
  .module('stockApp.landing')
  .controller('LandingController', LandingController)

  LandingController.$inject = ['chartFactory','stockFactory', 'socketFactory','$rootScope','$scope'];

  function LandingController(chartFactory,stockFactory, socketFactory, $rootScope,$scope){

    var vm = this;
    vm.stockForm ={};
    vm.stockData = [];
    var newSerie = [];


//Get all stock data an there cashed prices from db
    vm.getAll = function(){
      stockFactory.getStocks().then(
        function(resp){
        vm.stockData = resp.data.info;
        chartFactory.chartStock(vm.stockData);

          console.log(vm.stockData)
        }
      ).catch(
        function(err){
          console.log(err);
        }
      )

    }

    vm.getAll();

//add a new stock symbol submitted in form and
//returns the prices. Stock symbol and prices is saved in db.
    vm.addStock = function(data)  {
      console.log(data)
      stockFactory.addStock({stockName:data}).then(
        function(resp){
          vm.stockForm ={};
          vm.stockData.push(resp.data.data);
          socketFactory.send(resp.data.data);
          chartFactory.addSerie(resp.data.data);
          console.log(resp.data.data);
          console.log(vm.stockData)
        }
      )
      .catch(
        function(err){
          console.log(err);
          vm.stockForm ={};
        }
      )
    }

//removes stock from data base and updates stock
  vm.removeStock = function(stock){
      console.log(stock);
      stockFactory.removeStock(stock)
      .then(
        function(resp){
          vm.stockData = vm.stockData.filter(function(elem){
            return elem.ticker != stock;
          })
          socketFactory.send(stock);
         chartFactory.chartStock(vm.stockData);

        }
      )
      .catch(
        function(err){
        console.log(err);
      }
    )
  }
//emit socket event when stock is added or deleted
vm.send = function(value){
  socketFactory.send(value);
}

//listens on  $rootScope changes
//add one new stock to stockData
$rootScope.$on('change', function(){
  if (typeof $rootScope.stock === 'object'){
  $scope.$apply(function(){
    var found = vm.stockData.some(function(elem){
      return elem.ticker == $rootScope.stock.ticker;
    })
    console.log(found, ' if true dont add');
    if(!found){
      console.log("add ", $rootScope.stock)
      vm.stockData.push($rootScope.stock);
      console.log("obj added ", vm.stockData)
      chartFactory.addSerie($rootScope.stock);

    }
  });

} else {
  console.log("dat is not obj");
  $scope.$apply(function(){
    var index = vm.stockData.findIndex(function(elem){
      return elem.ticker == $rootScope.stock;
    });
    if (index != -1){
      console.log("delete","index:" + index + vm.stockData[index] + " " + $rootScope.stock)
      vm.stockData.splice(index,1);
      console.log(vm.stockData);
      chartFactory.chartStock(vm.stockData);


    }
  });
 }
});

}

})();
