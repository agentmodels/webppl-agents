var paper = require('paper');

//Attaches a canvas to a particular element
//Takes width and height in options
function createCanvas(element, options) {
  var canvas = document.createElement('canvas');
  canvas.width = options.width || 100;
  canvas.height = options.height || 100;
  canvas.style.border = "1px solid black";
  element.appendChild(canvas);
  return canvas;
}


function convertDraw(world, additional) {
  var additional = additional || {}; 

  var xyf = _.flatten(
    _.map( world.features, function (val, y) {
             return _.map(val, function (feat, x) { 
               return { feat : feat, pos : [x, y]};
             })}
         ));
    
  var filterHasName = function(ar){
    return _.filter(ar, function(x){return x.feat.name;});
  };
  var blocked  = _.map(_.filter(xyf, function(x){return x.feat=='#';}), 'pos');
  var terminal = _.map(filterHasName(xyf), 'pos');

  var world2 = {
    blockedStates : blocked, 
    terminals : terminal, 
    xLim : world.xLim, 
    yLim : world.yLim
  };

  var featureLabels = _.map( filterHasName(xyf), function (a) { 
    return { point : a.pos, content : a.feat.name } 
  })

  var additionalLabels = additional.labels || [];
  var labels = additionalLabels.concat(featureLabels);

  

  //if trajectory is a list of state action pairs, remove the actions
  var trajectory = additional.trajecotry; 

  return draw(world2, _.extend(additional, {labels : labels}));
}

var pomConvert = function(world, additional) { 
  var trajectory = (additional || {}).trajectory;
  if (trajectory) {
    var trajectory = _.isArray(trajectory[0]) ? _.map(trajectory, 0) : trajectory;
    var trajectory = _.has(trajectory[0], 'manifestState') ? _.map(trajectory, 'manifestState') : trajectory;
  }
  var additional = _.extend(additional, { trajectory : trajectory});
  return convertDraw(world.MDPWorld, additional);
}


/*
Draws a world with animated trajectories

Parameters 
   world : gridWorld

   additional : object of extra args 
     trajectory : array of States | array of [State, Action]
         the trajectory of an agent to animate 
     labels : array of { point , content }
         labels to render on the world at the given point
     actionExpectedUtilities : array of [State, 4 element array]
         array containing a state (or object containing .loc) and utilities for Left, Right, Up, Down to statically draw
         will statically draw the utilities in the locations in the state
     dynamicActionExpectedUtilities : array of array of [State, 4 element array]
         will animate between different paths of expected utilities 
         used to show an agents 'plans' and how they're reasoning about a plan
*/
function draw(world, additional) {
  if (world.MDPWorld) { return pomConvert(world, additional); }
  if (world.features) { return convertDraw(world, additional); }
  console.log(world, additional);

  if (typeof(wpEditor) === 'undefined') { 
    console.log("GridWorld.draw: no wpEditor, not drawing");
    return;
  }

  var element = wpEditor.makeResultContainer();

  var canvas = createCanvas(element, { width : world.xLim * 100, height : world.yLim * 100});
  paper.setup(canvas);


  var color = { 
    blocked : 'grey',
    terminal: new paper.Color(.7),
    agent : 'blue'
   };

  var position = function(coords) {
    return [coords[0], world.yLim - coords[1]];
  };

  var makeSquare = function(c) {
    var rect = new paper.Rectangle(([0, 0]), ([1, 1]));
    var path = new paper.Path.Rectangle(rect, .00);
    path.fillColor = c;
    path.remove();
    return path;
  };

  var label = new paper.PointText({
      fillColor : new paper.Color(.1, .8),
      fontSize : 16, 
      justification : 'center'
  });

  label.scale(.02);
  var toHeat = function (v) {
    var mag = Math.min(Math.abs(v)/20,1);

    if (v > 0) { 
      return new paper.Color(0, 1, 0, mag);
    } else {
      return new paper.Color(1, 0, 0, mag);
    }
  }

  var addUtilities = function (v) {
    var group = new paper.Group();
    
    group.addChild(new paper.Path.Rectangle(([-.5, +.5]), ([world.xLim, world.yLim])));
    var lastCoord; 
    for (var i = 0; i < v.length; i++) { 
      var coord = v[i][0].loc;
      var LRUD = v[i][1];
      var LURD = [LRUD[0], LRUD[2], LRUD[1], LRUD[3]];
      if (!_.isEqual(lastCoord, coord)) { 

        for (var j = 0; j < 4; j ++) {
          var tri = triangleSquare(coord, j*90, toHeat(LURD[j]), new paper.Color(.5, .4))
          group.addChild(tri);

          var l = makeLabel({ 
            point : [ coord[0] + .3 * Math.cos(-j * Math.PI/2 + Math.PI) , 
                      coord[1] + .3 * Math.sin(-j * Math.PI/2 + Math.PI)], 
            content : LURD[j].toFixed(1), fontSize : 10 
          });

          group.addChild(l);
        }
      }
      lastCoord = coord;
    }
    return group;
  };

  var triangleSquare = function(coord, orientation, color, borderColor) { 
    var a = new paper.Path([[-.5, -.5], [0, 0], [-.5, +.5]]);
    var j = orientation;
    a.closed = true;
    a.fillColor = color;
    a.strokeColor = borderColor;
    a.rotate(orientation);

    var offsetx = Math.cos(-orientation/90 * Math.PI/2 + Math.PI); 
    var offsety = Math.sin(-orientation/90 * Math.PI/2 + Math.PI); 

    a.position = position([coord[0] + offsetx *.25, coord[1] + offsety *.25]);
    return a;
  }

  var makeLabel = function (a) { 
      var copy = _.extend(label.clone(), a);
      copy.point = position(a.point);
      copy.point.y += copy.bounds.height/3.5;
      return copy;
  };

  var makeGrid = function(world) {
    var group = new paper.Group();

    for (var i = 0; i < world.xLim; i++) {
      for (var j = 0; j < world.yLim; j++) {
        var grid = new paper.Path.Rectangle(([i-.5, j+.5]), ([1, 1]));
        grid.strokeColor = new paper.Color(.5, .2);
        grid.fillColor = new paper.Color(1, 0);
        group.addChild(grid);
      }
    }
    return group;
  };

  var addShapes = function(coords, shape, group) {
    for (var i = 0; i < coords.length; i++) {
      var copy = shape.clone();
      copy.position = position(coords[i]);
      group.addChild(copy);
    }
  };      

  var addAgentPath = function(trajectory, paths, group) {
    var trajectory = _.has(trajectory[0], 'loc') ? trajectory : _.map(trajectory, 0);
    var coords = _.map(trajectory, 'loc') 
    console.log(coords);

    var agentPath = new paper.Path();
    agentPath.strokeColor = 'black';
    agentPath.strokeWidth = 2;
    agentPath.dashArray = [8,8];
    group.addChild(agentPath);

    var agent = new paper.Path.Circle(position(coords[0]), .3);
    agent.fillColor = color.agent;
    group.addChild(agent);
    
    var pathsGroup = new paper.Group();
    group.addChild(pathsGroup);

    var segPerSec = 3;
    var extraAtEnd = 1;
    var lastTime = 0;

    var scale, offsetx, offsety;
    var active = true;
    var offsett = 0;

    paper.view.onFrame = function (event) { 
      //the first time we execute we need to find out how things have been rescaled
      if (scale === undefined) {
        scale = agent.bounds.width/2/.3;
        offsetx = agent.position.x - position(coords[0])[0] * scale; 
        offsety = agent.position.y - position(coords[0])[1] * scale; 
      }
      var scalePosition = function(v) { 
        var x = position(v);
        return [x[0] * scale + offsetx, x[1] * scale + offsety];
      } 

      if (active) {
        if (event.time - lastTime > .1) {
          offsett += event.time - lastTime;
        }
        lastTime = event.time;

        var segments = (event.time - offsett)*segPerSec;
        var frac = segments % 1;
        var idx = Math.floor(Math.min(Math.floor(segments) % (trajectory.length + extraAtEnd), trajectory.length-1));
        
        agentPath.remove()

        var currentLocation;
        if (idx < trajectory.length-1) {
          currentLocation = [
            (1-frac) * coords[idx][0] + frac * coords[idx+1][0],
            (1-frac) * coords[idx][1] + frac * coords[idx+1][1]
          ];
        } else { 
          currentLocation = coords[idx];
        }

        var lodashTake = function(ar,n){return ar.slice(0,n);};
        var currentPath = lodashTake(coords, idx+1);
        currentPath.push(currentLocation);

        if (paths) {
          pathsGroup.remove();
          pathsGroup = addUtilities(paths[idx]);
          group.addChild(pathsGroup);
          pathsGroup.scale(scale);
          pathsGroup.translate(world.xLim/2 * scale, world.yLim/2 * scale );
          var fudgeFactor = 33;
          pathsGroup.translate(-pathsGroup.bounds.topLeft.x + fudgeFactor, -pathsGroup.bounds.topLeft.y );
          console.log()
        }

        agentPath = new paper.Path();
        agentPath.strokeColor = 'black';
        agentPath.strokeWidth = 2;
        agentPath.dashArray = [8,8];
        group.addChild(agentPath);

        agentPath.addSegments(_.map(currentPath, scalePosition));
        agent.position = scalePosition(currentLocation);
      }
    };

    paper.view.on('mousedown', function (event) { 
      active = !active;
    });

  };
  var axisx = _.map(_.range(world.xLim), function (i) { 
    return { point : [i, -.75], content : i };
  });

  var axisy = _.map(_.range(world.yLim), function (i) { 
    return { point : [-.75, i], content : i };
  });

  var makeTerminal = function (coords) {
    var group = new paper.Group();
    var tri = undefined;
    for (var i = 0; i < 4; i++) {
      var gradient = {
        gradient: {
          stops: [['white', 0.75], [color.terminal, 1]],
          radial: false
        },
        origin: [0,0],
        destination: [ -.5, 0]
      };

      tri = triangleSquare(coords, i*90, gradient, new paper.Color(0, 0));
      group.addChild(tri);;
    }
    return group;
  };


  var group = new paper.Group();
  //draw the world 
  addShapes(world.blockedStates, makeSquare(color.blocked), group);

  var f =_.map(world.terminals, makeTerminal);
  group.addChildren(f);

  group.addChild(makeGrid(world));

  group.addChildren(_.map(axisx, makeLabel));
  group.addChildren(_.map(axisy, makeLabel));

  group.addChildren(_.map(world.labels, makeLabel));

  if (world.labels) { 
    group.addChildren(_.map(world.labels, makeLabel));
  }
  if (additional) { //additional items to be drawn
    if (additional.actionExpectedUtilities) {
      group.addChild(addUtilities(additional.actionExpectedUtilities));
    }
    if (additional.trajectory) { 
      addAgentPath(additional.trajectory, additional.dynamicActionExpectedUtilities, group);
    }
    if (additional.labels) { 
      group.addChildren(_.map(additional.labels, makeLabel));
    }
  }

  group.fitBounds(paper.view.bounds);
  paper.view.draw();  

}

// Allows printing of ERP when webppl-viz is not available
var printERP = function(x,k) {
  var erpValues = _.sortBy(x.support(), function(v){return -x.score([], v);});
  var erpValues = typeof(k)=='undefined' ? erpValues : erpValues.slice(0,k);

  console.log('vegaPrint ERP:');          
  erpValues.map(
    function(v){
      var prob = Math.exp(x.score([], v));
      if (prob > 0.0){
        console.log(JSON.stringify(v) + ': ' + prob.toFixed(5));
      }
    });
  console.log(' \n');
};




module.exports = {
  draw: draw,
  vegaPrint: printERP,
  print: printERP,
  bar: printERP,
  line: printERP
}
