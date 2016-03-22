
'use strict'


var express = require('express');
var stockApp = require('../app/stockApp');

var api = express.Router();
//exports api router
module.exports = api;

api.route('/')
//get all stocks symbols from  db and fetch there prices
  .get(function(req,res){
    stockApp.getStocks(req,res);
  })
//save a new stock symbol to data base return new stock price data
  .post(function(req,res){
    stockApp.saveStock(req,res);
  });




api.route('/:stockId')
  .get(function(req,res,next){
    Stock.find({id: req.params.stockId},{_id:0,id:1,stock:1},function(err,doc){
      if(err){
        throw(err);
        console.log(err);
      }
      res.status(200).json({"success": true, doc});

    });
  })

  .delete(function(req,res,next){
    Stock.remove({id: req.params.stockId}, function(err,doc){
      if(err){
        throw(err);
        console.log(err);
      }
      res.status(200).json({"success": true, doc});

    })

  });
