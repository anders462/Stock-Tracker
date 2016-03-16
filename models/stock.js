'use strict'


var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence');

var Schema = mongoose.Schema

var Stock = new Schema ({
  stock: String,
  created:{ type: Date, default: Date.now }
});

// Automatically creates id with inc counter
Stock.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model("Stock", Stock);
