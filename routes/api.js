
'use strict'


var express = require('express');
var stockApp = require('../app/stockApp');

var api = express.Router();
//exports api router
module.exports = api;

api.route('/')
//get all stocks symbols from db and there cached prices
  .get(function(req,res){
    res.json({message:"test"});
    stockApp.getCachedStocks(req,res);
  })
//get price info for new stock and save the data
//return new stock price data to client
  .post(function(req,res){
    stockApp.saveStock(req,res);
  });


api.route('/:stock')
  //request updated data for stock with to old
  //cashed data. Db cache will be updated
  .get(function(req,res){
      stockApp.updateStock(req,res);
  })
  //delete stock with stockId from db
  .delete(function(req,res){
    stockApp.deleteStock(req,res);
  });
