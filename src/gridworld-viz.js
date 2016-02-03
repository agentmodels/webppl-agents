var paper = require('paper');
function createCanvas(element, options) {
  var canvas = document.createElement('canvas');
  canvas.width = options.width || 100;
  canvas.height = options.height || 100;
  canvas.style.border = "1px solid #0f0";
  element.appendChild(canvas);
  return canvas;
}

function draw(element, world, additional) {
  var canvas = createCanvas(element, { width : world.xLim * 50, height : world.yLim * 50});
  paper.setup(canvas);

	var color = { 
		blocked : 'grey',
		terminal: new paper.Color(1,0,.2, .5),
		agent : 'blue'
	 };

	var scale = 20;
	var scaleCoords = function (coords) { 
		return [coords[0] * scale, coords[1] * scale];
	};

	var position = function(coords) {
		return [coords[0] * scale, (world.yLim - coords[1]) * scale];
	};

	var makeSquare = function(c) {
		var rect = new paper.Rectangle(scaleCoords([0, 0]), scaleCoords([1, 1]));
		var path = new paper.Path.Rectangle(rect, .00);
		path.fillColor = c;
		path.remove();
		return path;
	};

	var makeBackground = function(world) {
		var rect = new paper.Rectangle(scaleCoords([-.5, .5]), scaleCoords([world.xLim, world.yLim]));
		var path = new paper.Path.Rectangle(rect, .00);
		path.fillColor = new paper.Color(1,1,1,0);
		path.strokeColor = 'black';
		path.remove();
		return path;
	};

	var addShapes = function(coords, shape, group) {
		for (var i = 0; i < coords.length; i++) {
			var copy = shape.clone();
			copy.position = position(coords[i]);
			console.log(JSON.stringify(coords[i]) + JSON.stringify(copy.position));
			group.addChild(copy);
		}
	};      

	var addAgentPath = function(trajectory, group) {
		var path = new paper.Path();

		var coords = _.pluck(trajectory, 0);
		var xy = _.map(coords, position);
		path.addSegments(xy);
		console.log(JSON.stringify(xy));
		path.strokeColor = 'black';
		path.dashArray = [1,4];
		group.addChild(path);

		var agent = new paper.Path.Circle(position(coords[coords.length-1]), 4);
		agent.fillColor = color.agent;
		group.addChild(agent);
	};

	
	var terminalSquare = makeSquare(color.terminal);
	var square = makeSquare(color.blocked);

	var group = new paper.Group();
	group.addChild(makeBackground(world));
	addShapes(world.blockedStates, square, group);
	addShapes(world.terminals, terminalSquare, group);

	if (additional) {
		if (additional.trajectory) { 
			addAgentPath(additional.trajectory, group);
		}
	}
	group.fitBounds(paper.view.bounds);

  paper.view.draw();  
}

module.exports = {
  draw: draw
}
