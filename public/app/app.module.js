(function(){

'use strict'

angular
  .module('stockApp',[
    //Angular modules
    'ngResource',
    //Third party modules
    'ui.router',
    //Custom modules
    'stockApp.landing',
    'stockApp.settings',
    'stockApp.core'
  ]);
