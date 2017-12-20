let scene;
let subesh = new Circle(0, 0, 100);

function setup() {
  // put setup code here
  let can = createCanvas(1400, 900);
  can.parent('parent');
  scene = new Scene();
   subesh.children.push(new Circle(100-10, 100-10, 10));
  let bez =  new Bezier( { x: 100, y: 500 },  { x: 600  , y: 200 },{ x: 1100, y: 500 },{ x: 1100, y: 500 },{ x: 1100, y: 500 },{ x: 1100, y: 500 },{ x: 1100, y: 500 },{ x: 1100, y: 500 },{ x: 1100, y: 500 },{ x: 1100, y: 500 });

  scene.add(bez);

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
