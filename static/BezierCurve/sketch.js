let curve;

function preload() {
  curve = loadJSON("curve.json");
}

let subesh;

function setup() {

  // put setup code here
  let canvas = createCanvas(1200, 700);
  curve = curve.curve;
  curve.forEach((item) => {
    subesh = new Bezier(item.start, item.end, ...item.ctrpt);
  });
  noLoop();
}

function draw() {
  // put drawing code here
  background(255);
  subesh.draw();
  subesh.update();
}


function mousePressed() {
  subesh.update();
  setInterval(function() {
    redraw();
  },25)
  redraw();
}
