'use strict'


var express = require('express'),
    rp = require('request-promise'),
    Stock = require('../models/stock'),
    redis = require('redis');

//Quandle URL Params
var api_key = process.env.API_KEY;
var s = 'start_date=' + '2015-01-01';
var e = 'end_date=' + '2016-03-17';
var query = 'order=asc&exclude_column_names=true&column_index=4';
var base_url = 'https://www.quandl.com/api/v3/datasets/WIKI/';

var client = redis.createClient(6379,'localhost');


//Quandle search API, get stock price for one stock!
var getStockPrice = function(stock){
  //returns promise of a stockprice
  return new Promise(function(resolve, reject){
  var url = base_url + stock + '.json?api_key=' + api_key+ '&' + s + '&' + e + '&' + query;
  rp(url).then(
    function(data){
      resolve(data);
    }
  )
  .catch(
    function(err){
       reject(err);
    }
  );
});
}



module.exports = {
  getStocks: function(req,res){
    //Get all stocks from database
    Stock.find({},{_id:0,id:1,stock:1}).then(
        function(data){
          console.log(data)
          //map each stock to a request function and push in array
          var reqFunc = data.map(function(elem){
            return getStockPrice(elem.stock.toUpperCase());
          })
          //request stock data Quandle from all stocks in parallell
          //resolved data will be an array of responses
          return Promise.all(reqFunc);
        }
      ).then(
        function(data){
          res.status(200).json({"success": "promise", "data": data});
        }
      )
      .catch(
        function(err){
        res.status(404).json({"success": false, "data": err});
      }
    );
  },


  saveStock: function(req,res){
    var result ={};
    getStockPrice(req.body.stockName.toUpperCase())
      .then(
         function(data){
           result.data = JSON.parse(data).dataset;
           var stock = new Stock({stock:req.body.stockName});
           return  stock.save()
         }
      ).then(
        function(doc){
          result.success = true;
          result.doc = doc;
          res.status(200).json(result);
        }
      ).catch(
        function(err){
          res.status(400).json({"success": false, "message": err});

        }
      )
  }
};

/*
    stock.save(function(err,doc){
      if(err){
        throw(err);
        console.log(err);
      }
      //request new stockdata from api for added stock
      res.status(200).json({"success": true, "message": doc});
    });

  }

};



var stock = new Stock({stock:req.body.stockName});
stock.save(function(err,doc){
  if(err){
    throw(err);
    console.log(err);
  }
  //request new stockdata from api for added stock
  res.status(200).json({"success": true, "message": doc});
});
});



})





var search = function(stocks){
 var base_url = 'https://www.quandl.com/api/v3/datasets/WIKI/';
 var s = 'start_date=' + req.params.start;
 var e = 'end_date=' + req.params.end;
 var query = 'order=asc&exclude_column_names=true&column_index=4'
 var result = [];

 stocks.forEach(function(stock){
  var url = base_url + stock + '.json?api_key=' + api_key+ '&' + s + '&' + e + '&' + query;
  rp(url).then(
    function(data){
      result.push(JSON.parse(data).dataset);
    }
  )
  .catch(
    function(err){
      res.status(400).json({"success": false, "message": err});

    }
  );
  return result;
 });
};
*/
