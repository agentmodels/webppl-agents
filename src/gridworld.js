var assert = require('assert');
var fs = require('fs');


// HELPER FUNCTIONS


var gridTransform = function(line, n){
  assert.ok( n>0, 'beliefLib.gridTransform' )
  for (var i = 0; i < n; i++){
    console.log(line.slice( i*n, i*n + n).reverse() )
  };
};


var zipToGridTable = function(zip_state_cell){
  var table = {}
  zip_state_cell.map( function(state_cell){
    table[state_cell[0]] = state_cell[1];
  });
  return table;
};

var range = function(n){
  if (n===0){return [];} 
  else {return range(n-1).concat([n-1]);}
}; 

// form is [ [ state, action ] ]
var zipToPath = function(zip, xLim, yLim){
  var table = {};
  for (var y = 0; y < yLim; y++){
    for (var x = 0; x < xLim; x++){
      table[[x,y]] = '';
    }
  }
    
  var actionTable = {u:'^', d:'v', l:'<', r:'>'};
  zip.map( function(state_action){
    table[state_action[0]] += actionTable[state_action[1]]
  });

  return table;
};


var zipToDisplayGrid = function(zipGrid, xLim, yLim, path){
  var table = path? zipToPath(zipGrid, xLim, yLim) : zipToGridTable((zipGrid));
  
  var reverseYValues = range(yLim).reverse();
  var xValues = range(xLim);

  for (var y = 0; y < yLim; y++) {
    var yValue = reverseYValues[y];
    console.log( xValues.map( function(x){return table[ [x, yValue] ];} ) );
  }
};

    


module.exports = {gridTransform: gridTransform,
                  zipToGridTable:zipToGridTable,
                  zipToDisplayGrid: zipToDisplayGrid};
