(function(){

'use strict'

angular
  .module('stockApp.core')
  .factory("chartFactory", chartFactory)

  chartFactory.$inject = [];

  function chartFactory(){

  var chart1;

//configuration
var chartStock = function(series){
 chart1 = new Highcharts.StockChart({
      chart: {
         renderTo: 'chart-container',
         backgroundColor: "#655e5e"
      },
      legend: {
            enabled: true,
            align: 'center',
            backgroundColor: 'lightgrey',
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 5,
            layout: 'horizontal',
            verticalAlign: 'bottom',
            y: 0,
            shadow: true
        },
      rangeSelector: {
         selected: 1,
         buttonTheme: { // styles for the buttons
          fill: 'none',
          stroke: 'none',
          'stroke-width': 0,
          r: 2,
          style: {
              color: 'white'
          },
          states: {
              hover: {
              },
              select: {
                  fill: 'silver',
                  style: {
                      color: 'white'
                  }
              }
              // disabled: { ... }
          },
      }
      },
      inputBoxBorderColor: 'silver',
      inputStyle: {
        color: 'white'
      },
      xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
              day: '%e of %b'
          }
      },
      title: {
        text: 'Stock Chart',
        style: {
                color: '#FFFFFF',
                fontSize: '25px'
            }
      },
         subtitle: {
           text: 'Track your portfolio!',
           style: {
                   color: '#FFFFFF',
                   fontSize: '15px'
               }
     },
      series: series
})


}

var addSerie = function(serie){
    chart1.addSeries(serie,true)
}

var reDraw = function(){
    console.log("redraw")
    chart1.redraw();
}



   return {
     chartStock: chartStock,
     addSerie: addSerie,
     reDraw: reDraw
   }


  }




})()
