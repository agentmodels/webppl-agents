function loadPaper() {
  if (typeof window === 'undefined') {
    throw new Error('gridworld-viz is only intended for use in browser!');
  }
  if (window.paper === undefined) {
    throw new Error('paper.js needs to be in global scope!');
  }
  return window.paper;
}

function createCanvas(element, options) {
  var canvas = document.createElement('canvas');
  canvas.width = options.width || 100;
  canvas.height = options.height || 100;
  canvas.style.border = "1px solid #0f0";
  element.appendChild(canvas);
  return canvas;
}

function draw(element, world) {
  // var world = {
  //   width: 100,
  //   height: 100,
  //   fromX: 0,
  //   fromY: 0,
  //   toX: 100,
  //   toY: 100
  // };
  var paper = loadPaper();
  var canvas = createCanvas(element, { width: world.width, height: world.height });
  paper.setup(canvas);
  var path = new paper.Path();
  path.strokeColor = 'black';
  var start = new paper.Point(world.fromX, world.fromY);
  path.moveTo(start);
  path.lineTo(start.add([world.toX, world.toY]));
  paper.view.draw();  
}

module.exports = {
  draw: draw
}
