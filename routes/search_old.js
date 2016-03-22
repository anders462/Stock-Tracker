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
     var query = 'order=asc&exclude_column_names=true&column_index=4'
      var url = base_url + req.params.ticker + '.json?api_key=' + api_key+ '&' + s + '&' + e + '&' + query;
      rp(url).then(
        function(data){
          var d = JSON.parse(data).dataset;
          var resp = {ticker: d.dataset_code, name: d.name, description: d.description, start:d.start_date,end:d.end_date, data:ddata};
          res.status(200).send(resp);
        }
      )
      .catch(
        function(err){
          res.status(400).json({"success": false, "message": err});

        }
      );

    });
