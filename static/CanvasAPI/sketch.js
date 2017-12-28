let scene;
let interval;
let bez;
function setup() {
  // put setup code here
  let can = createCanvas(2000, 1000);
  can.parent('parent');
  scene = new Scene();
  
   bez =  new Bezier( { x: 100, y: 500 },  { x: 600  , y: 200 },{ x: 1100, y: 500 });

  scene.add(bez);

  noLoop();
  

}

function draw() {
  // put drawing code here
  background(255);
  scene.draw();
}


function mouseDragged(e) {
  let handled = scene.handleMouseDrag(e);
  if(handled)
  redraw();
}

function mousePressed(e) {
  
  scene.handleMousePressed(e);
  
}

function mouseReleased(e) {
  scene.handleMouseReleased(e);
  //redraw();
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




function start() {
  bez.animate = true;
 interval =  setInterval(function() {
   
      redraw();
  },30);
  
}

function stop() {
  bez.animate = false;
  clearInterval(interval);
}