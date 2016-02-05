var paper = require('paper');
var _ = require('lodash');

function createCanvas(element, options) {
  var canvas = document.createElement('canvas');
  canvas.width = options.width || 100;
  canvas.height = options.height || 100;
  canvas.style.border = "1px solid black";
  element.appendChild(canvas);
  return canvas;
}

function draw(world, additional) {
  var element = wpEditor.makeResultContainer();

  var canvas = createCanvas(element, { width : world.xLim * 50, height : world.yLim * 50});
  paper.setup(canvas);

  var color = { 
    blocked : 'grey',
    terminal: new paper.Color(1,0,.2, .5), //transparent magenta
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
    for (var i = 0; i < v.length; i++) { 
      var coord = v[i][0];
      var LRUD = v[i][1];
      var LURD = [LRUD[0], LRUD[2], LRUD[1], LRUD[3]];

      for (var j = 0; j < 4; j ++) {
        var a = new paper.Path([[-.5, -.5], [0, 0], [-.5, +.5]]);
        a.closed = true;
        a.rotate(j * 90);
        a.fillColor = toHeat(LURD[j]);
        a.strokeColor = new paper.Color(.5, .4);

        var offsetx = Math.cos(-j * Math.PI/2 + Math.PI); 
        var offsety = Math.sin(-j * Math.PI/2 + Math.PI); 

        a.position = position([coord[0] + offsetx *.25, coord[1] + offsety *.25]);
        group.addChild(a);

        var l = makeLabel({ 
          point : [coord[0] + offsetx *.35, coord[1] + offsety *.35], 
          content : LURD[j].toFixed(2), fontSize : 6 
        });

        group.addChild(l);
      }
    }
    return group;
  };

  var makeLabel = function (a) { 
      var copy = _.extend(label.clone(), a);
      copy.point = position(a.point);
      copy.point.y += copy.bounds.height/2;
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

  var addAgentPath = function(trajectory, group) {
    var path = new paper.Path();

    var coords = _.map(trajectory, 0);
    path.addSegments(_.map(coords, position));
    path.strokeColor = 'black';
    path.dashArray = [1,4];
    group.addChild(path);

    var agent = new paper.Path.Circle(position(coords[coords.length-1]), .3);
    agent.fillColor = color.agent;
    group.addChild(agent);
  };

  var group = new paper.Group();
  //draw the world 
  addShapes(world.blockedStates, makeSquare(color.blocked), group);
  addShapes(world.terminals, makeSquare(color.terminal), group);

  group.addChild(makeGrid(world));

  if (world.labels) { 
    group.addChildren(_.map(world.labels, makeLabel));
  }
  if (additional) { //additional items to be drawn
    if (additional.expUtilities) {
      group.addChild(addUtilities(additional.expUtilities));
    }
    if (additional.trajectory) { 
      addAgentPath(additional.trajectory, group);
    }
    if (additional.labels) { 
      group.addChildren(_.map(additional.labels, makeLabel));
    }
  }

  group.fitBounds(paper.view.bounds);
  paper.view.draw();  
}

module.exports = {
  draw: draw
}
