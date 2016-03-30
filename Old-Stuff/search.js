'use strict'



var express = require('express');
var rp = require('request-promise');



//URL Params
var api_key = process.env.API_KEY;
var s = 'start_date=' + '2015-01-01';
var e = 'end_date=' + '2016-03-17';
var query = 'order=asc&exclude_column_names=true&column_index=4';
var base_url = 'https://www.quandl.com/api/v3/datasets/WIKI/';





module.exports = {
  getAllStockPrices: function(stock){
       return new Promise(function(resolve,reject){
         var url = base_url + stock + '.json?api_key=' + api_key+ '&' + s + '&' + e + '&' + query;
         console.log(url);
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



}









/*
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
