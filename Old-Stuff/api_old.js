
'use strict'


var express = require('express');
var Stock = require('../models/stock');

var api = express.Router();
//exports api router
module.exports = api;


api.route('/')
//get all data on stocks in db
  .get(function(req,res,next){
      Stock.find({},{_id:0,id:1,stock:1},function(err,doc){
        if(err){
          throw(err);
          console.log(err);
        }
        //1. request new stockdata from api for all symbols in db
        //2. send aggregate back to client


        res.status(200).json({"success": true, doc});
      });
  })
    // add check if valid req.body
    // add check that stock do not exist before saving
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
