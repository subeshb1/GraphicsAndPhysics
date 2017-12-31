let k ;
let d = 8;
let n = 5;
let sliderD ;
let sliderN ;
let sliderA;
function setup() {
  // put setup code here
  let can = createCanvas(600,400);
  sliderD = createSlider(1,9,4);
  sliderN = createSlider(1,9,4);
  sliderA = createSlider(0,360,360,1);
  sliderD.touchMoved( ()=> redraw());
  sliderN.touchMoved( ()=> redraw());
  sliderA.touchMoved( ()=> redraw());
  noLoop();
}

function draw() {
  angleMode(DEGREES);
  // put drawing code here
  d = sliderD.value();
  n = sliderN.value();
  let k = n / d;
  let max =sliderA.value();
  
  
  background(0);
  translate(width/2,height/2);
  push();
  beginShape();
  
  noFill();
  strokeWeight(1);
  for(let a = 0; a  <  max  *  d ; a += 1) {
    let r = 200*cos(k*a);
    let x = r * cos(a);
    let y = r * sin(a);
    stroke(random(50,255),random(50,255),random(50,255));  
    vertex(x,y);
    stroke(random(50,255),random(50,255),random(50,255));  
  }
  endShape();
  pop();
}
