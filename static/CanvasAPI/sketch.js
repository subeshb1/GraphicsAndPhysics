let scene;
let subesh = new Circle();
function setup() {
  // put setup code here
  let can = createCanvas(1400,900);
  can.mouseOut(mouseOut);
  can.mouseOver(mouseIn);
  scene = new Scene();
  scene.graphicsItem.push(subesh);

  noLoop();

}

function draw() {
  // put drawing code here
  background(0);
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

function mouseIn(e) {
//  scene.handleMouseIn(e);
  redraw();
}

function mouseOut(e) {
  scene.handleMouseOut(e);
  redraw();


}

function mouseWheel(e) {
  let g = scene.handleMouseWheel(e);
  redraw();
  return false;
}


function mouseMoved(e) {
  scene.handleMouseMove(e);
  redraw();
}
