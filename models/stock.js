'use strict'


var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence');

var Schema = mongoose.Schema

var Stock = new Schema ({
  name: {type: String},
  ticker: {type: String, required: true, unique:true},
  data: {type: Array}
},{
  timestamps: true
});

// Automatically creates id with inc counter
Stock.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model("Stock", Stock);
