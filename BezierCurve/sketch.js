

let subesh = new Bezier({x:100,y:300},{x:500,y:300},{x:300,y:100},{x:400,y:100},{x:300,y:600});
function setup() {
  // put setup code here
  let canvas = createCanvas(1200,700);
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
