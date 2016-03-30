
'use strict'


var express = require('express');
var Stock = require('../models/stock');
var  = require('./search');

var api = express.Router();
//exports api router
module.exports = api;

//get all data on stocks in db
api.route('/')
  .get(function(req,res,next){
    Stock.find({},{_id:0,id:1,stock:1}).then(
        function(data){
          console.log(data)
          var requestFunc = data.map(function(elem){
            return search.getAllStockPrices(elem.stock.toUpperCase());
          })
          console.log("test",requestFunc)
          return Promise.all(requestFunc);
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
    )
  })


  .post(function(req,res,next){
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
