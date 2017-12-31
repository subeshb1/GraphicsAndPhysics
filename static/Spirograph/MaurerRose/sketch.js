let k ;
let d = 8;
let n = 5;
let z = 100;
let sliderD ;
let sliderN ;
let sliderA;
let sliderZ;
function setup() {
  // put setup code here
  let can = createCanvas(1400,1400);
  can.parent('parent');
  sliderD = createSlider(1,359,97,1);
  sliderN = createSlider(1,359,5,1);
  sliderA = createSlider(1,360,360,1);
  sliderZ = createSlider(0.1,1,0.1,0.1);
  sliderD.touchMoved( ()=> redraw());
  sliderN.touchMoved( ()=> redraw());
  sliderA.touchMoved( ()=> redraw());
  sliderZ.touchMoved( ()=> redraw());
  noLoop();
}

function draw() {
  // put drawing code here
  angleMode(DEGREES);
  d = sliderD.value();
  n = sliderN.value();
  z = lerp(100,1000,sliderZ.value());
  let k = sliderA.value();
  console.log(k);
  
  background(255);
  translate(500,500);
  push();
  noFill();
  stroke(255);
  strokeWeight(1.5);
  // beginShape();
    let theta = 0;
    let old = {x:0,y:0};
    do {
      
      theta += d;
      if(theta>=k) {
        theta %= k;
      }
      let aux = (n*theta);
      aux %= k;
      angleMode(RADIANS); 
      let x = aux*PI/180;
      
      let r = sin(x);
      let t = (theta*Math.PI)/180; 

      let pt =  toRectangular(r,t);
     
      let color = random(0,100);
      stroke(color);
      line(old.x,old.y,pt.x,pt.y);
      old = pt;
      // vertex(pt.x,pt.y);
      angleMode(DEGREES);
    }while(theta!=0);
  
  
  // endShape();
  pop();
}


function toRectangular(r,t) {
  let pt= {};
  pt.x = cos(t) * r *z;
  pt.y = sin(t) * r *z;
  return pt;
}
