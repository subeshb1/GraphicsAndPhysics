
let curve;
function preload() {
  curve = loadJSON("curve.json");
}

let subesh ;
function setup() {

  // put setup code here
  let canvas = createCanvas(1200,700);
  subesh = new Bezier(curve[0].start,curve[0].end,...curve[0].ctrpt);
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
  redraw();
}
