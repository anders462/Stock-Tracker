'use strict'


var express = require('express'),
    rp = require('request-promise'),
    Stock = require('../models/stock'),
    unixTime = require('unix-time');

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
      //change date format to unix-time in ms
      var dateFormated = stock.data.map(function(elem){
         elem[0] = 1000*unixTime(elem[0]);
         return elem;
      })
      var parsedName = stock.name.substr(0,stock.name.indexOf("Price")-1);
      resolve({ticker: stock.dataset_code, name: parsedName, data: stock.data });
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
  getCachedStocks: function(req,res){
    //Get all stocks from database
    Stock.find({},{_id:0}).then(
        function(data){
          //map each stock to a request function and push in array
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
    console.log(req.body.stockName);
    getStockPrice(req.body.stockName.toUpperCase())
      .then(
         function(data){
           //cache info plus stock data
           var stock = new Stock({ticker:data.ticker,name:data.name, data: data.data});
           return  stock.save()
         }
      ).then(
        function(doc){
          res.status(200).json({"success": true, "data": doc});
        }
      ).catch(
        function(err){
          res.status(400).json({"success": false, "message": err});

        }
      )
  },

    updateStock: function(req,res){
      getStockPrice(req.params.stock.toUpperCase())
        .then (
          function(data){
            console.log(data)
            return Stock.findOneAndUpdate({ticker:req.params.stock.toUpperCase()},
            {$set:{data:data.data}},{new:true});
          }
        ).then(
          function(doc){
            res.status(200).json({"success": true, "data": doc});
          }
        )
        .catch(
          function(err){
            res.status(400).json({"success": false, "message": err});
          }
        )

      },

      deleteStock: function(req,res){
        Stock.remove({ticker: req.params.stock.toUpperCase()})
          .then(
            function(doc){
              res.status(200).json({"success": true, "data": doc});
            }
          )
          .catch(
            function(err){
              res.status(400).json({"success": false, "message": err});

          }

        )
      }

};
