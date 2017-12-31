let k;
let d = 8;
let n = 5;
let z = 10;
let sliderD;
let sliderN;
let sliderA;
let sliderZ;

function setup() {
  // put setup code here
  let can = createCanvas(1400, 1400);
  can.parent('parent');
  sliderD = createSlider(1, 359, 90, 1);
  sliderN = createSlider(1, 359, 2, 1);
  sliderA = createSlider(1, 360, 360, 1);
  sliderZ = createSlider(0.1, 1, 0.1, 0.1);
  sliderD.touchMoved(() => redraw());
  sliderN.touchMoved(() => redraw());
  sliderA.touchMoved(() => redraw());
  sliderZ.touchMoved(() => redraw());
  noLoop();
}

function draw() {
  // put drawing code here
   angleMode(RADIANS);
  d = sliderD.value();
  n = sliderN.value();
  z = lerp(100, 1000, sliderZ.value());
  let k = sliderA.value();
  

  background(255);
  translate(500, 500);
  push();
  noFill();
  
  strokeWeight(1.5);
  // beginShape();
  let T = 0,c = 0;

  
  do {
    console.log("FIRST");
    
    let theta = T;
    let p = {
      x: (TWO_PI * theta) / 360,
      y: sin( (TWO_PI * n * theta) / 360)
    };
    
    
    let old = toRectangular(p.x, p.y);

    do {
      console.log("SECOND");
      theta += d;
      if (theta >= 360) {
        theta %= 360;
      }
      let aux = n * theta;
      aux %= 360;

      
      let x = (aux * PI) / 180;
      let r = sin(x);
      let t = (theta*Math.PI)/180;

      let pt = toRectangular(r, t);
      stroke(random(0,100));
      line(old.x, old.y, pt.x, pt.y);

      c++;
      console.log(theta);
      console.log("END SECOND");
      if(theta  === T)
        break;
        old  = pt;
      
      
      
    } while (1);
    
    if(c >= 360)
      break;
    T++;
    console.log("END FIRST");
  } while (1);

  console.log(T,c);
  

  // endShape();
  pop();
}


function toRectangular(r, t) {
 
  let pt = {};
  pt.x = cos(t) * r * z;
  pt.y = sin(t) * r * z;
 
  return pt;
}




// let theta = 0;
// let old = {x:0,y:0};
// do {

//   theta += d;
//   if(theta>=k) {
//     theta %= k;
//   }
//   let aux = (n*theta);
//   aux %= k;
//   angleMode(RADIANS); 
//   let x = aux*PI/180;

//   let r = sin(x);
//   let t = (theta*Math.PI)/180; 

//   let pt =  toRectangular(r,t);

//   let color = random(0,100);
//   stroke(color);
//   line(old.x,old.y,pt.x,pt.y);
//   old = pt;
//   // vertex(pt.x,pt.y);
//   angleMode(DEGREES);
// }while(theta!=0);