'use strict'


var express = require('express'),
    rp = require('request-promise'),
    Stock = require('../models/stock');

//Quandle URL Params
var api_key = process.env.API_KEY;
var today = new Date();
var s = 'start_date=' + '2015-01-01';
var e = 'end_date=' + today.toISOString().substring(0, 10);
var query = 'order=asc&exclude_column_names=true&column_index=4';
var base_url = 'https://www.quandl.com/api/v3/datasets/WIKI/';



//Quandle search API, gets stock price for one stock!
var getStockPrice = function(stock){
  //returns promise of a stockprice
  return new Promise(function(resolve, reject){
  var url = base_url + stock + '.json?api_key=' + api_key+ '&' + s + '&' + e + '&' + query;
  console.log(url)
  rp(url).then(
    function(data){
      //console.log(JSON.parse(data).dataset)
      var stock = JSON.parse(data).dataset
      resolve({ticker: stock.dataset_code, name: stock.name, data: stock.data });
    }
  )
  .catch(
    function(err){
      console.log(err)
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
          //request stock data Quandle from all stocks in db in parallell
          //resolved data will be an array of responses
          return Promise.all(reqFunc);
        }
      ).then(
        function(data){
          res.status(200).json({"success": true, "info": data});
        }
      )
      .catch(
        function(err){
        res.status(404).json({"success": false, "error": err});
      }
    );
  },


  saveStock: function(req,res){
    var result ={};
    console.log(req.body.stockName);
    getStockPrice(req.body.stockName.toUpperCase())
      .then(
         function(data){
           result.data = data;
           //cache info plus stock data
           var stock = new Stock({ticker:data.ticker,name:data.name,data:data.data});
           console.log(stock)
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
