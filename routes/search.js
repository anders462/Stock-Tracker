'use strict'



var express = require('express');
var rp = require('request-promise');
var api_key = process.env.API_KEY;


var search = express.Router();
module.exports = search;

search.route('/:ticker/:start/:end')
    .get(function(req,res){
     var base_url = 'https://www.quandl.com/api/v3/datasets/WIKI/';
     var s = 'start_date=' + req.params.start;
     var e = 'end_date=' + req.params.end;
      var url = base_url + req.params.ticker + '.json?=' + api_key+ '&' + s + '&' + e;
      rp(url).then(
        function(data){
          res.status(200).json({"success":true, "message": data});
        }
      )
      .catch(
        function(err){
          res.status(400).json({"success": false, "message": err});

        }
      );

    });
