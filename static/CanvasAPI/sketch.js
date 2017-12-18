let scene;
let subesh = new Circle(100, 100, 100);

function setup() {
  // put setup code here
  let can = createCanvas(1400, 900);

  scene = new Scene();
  subesh.children.push(new Circle(100, 80, 10));
  //let cir = new Circle(150,150,100);

  scene.add(subesh);
  noLoop();

}

function draw() {
  // put drawing code here
  background(255);
  scene.draw();
}


function mouseDragged(e) {
  scene.handleMouseDrag(e);
  redraw();
}

function mousePressed(e) {

  scene.handleMousePressed(e);
  redraw();
}

function mouseReleased(e) {
  scene.handleMouseReleased(e);
  redraw();
}


function mouseWheel(e) {
  let g = scene.handleMouseWheel(e);
  if (!g)
    redraw();
  return g;
}


function mouseMoved(e) {
  scene.handleMouseMove(e);
  //  redraw();
}
