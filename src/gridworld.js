var assert = require('assert');
var fs = require('fs');
var gridworldViz = require('./gridworld-viz');


// HELPER FUNCTIONS


var gridTransform = function(line, n){
  assert.ok( n>0, 'beliefLib.gridTransform' )
  for (var i = 0; i < n; i++){
    console.log(line.slice( i*n, i*n + n).reverse() )
  };
};

var getGridStates = function(xLim,yLim){
  assert.ok( xLim>0 & yLim>0, 'getGrid args');
  var states = [];
  for (var i = 0; i < xLim; i++){
    for (var j = 0; j < yLim; j++){
      states.push( [i,j] );
    }}
  return states;
};


var zipToObject = function(zipAr) {
  var obj = {};
  for (var i = 0; i < zipAr.length; ++i){
    var pair = zipAr[i];
    obj[pair[0]] = pair[1];
  }
  return obj;
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


var displayExpUtility = function(stateLRUD, xLim, yLim){
  var table = {};
  for (var y = 0; y < yLim; y++){
    for (var x = 0; x < xLim; x++){
      table[JSON.stringify([x,y])] = '----';
    }
  }
    
  var actionTable = {u:'^', d:'v', l:'<', r:'>'};
  stateLRUD.map( function(state_LRUD){
    var state  = state_LRUD[0];
    var lrud = state_LRUD[1].map(function(x){return x.toPrecision(2);});
    var str = lrud[0] + ' ' + lrud[3] + '^' +lrud[2] + ' ' + lrud[1];
    table[state] = str;
  });

  var reverseYValues = range(yLim).reverse();
  var xValues = range(xLim);

  for (var y = 0; y < yLim; y++) {
    var yValue = reverseYValues[y];
    console.log( xValues.map( function(x){return table[ JSON.stringify([x, yValue]) ];} ) );
  }

};



module.exports = {
  has : _.has,
  getGridStates: getGridStates,
  zipToObject: zipToObject,
  gridTransform: gridTransform,
  zipToGridTable:zipToGridTable,
  zipToDisplayGrid: zipToDisplayGrid,
  displayExpUtility: displayExpUtility,
  draw: gridworldViz.draw
};


