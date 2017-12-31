class MaurerRoseV1 {
  constructor() {
    this.line = [];
    this.lineCounter = 0;
  }
  calc() {
    d = sliderD.value();
    n = sliderN.value();
    z = lerp(100, 1000, sliderZ.value());
    let k = sliderA.value();
    this.line = [];
    let theta = 0;
    let old = {
      x: 0,
      y: 0
    };
    do {

      theta += d;
      if (theta >= 360) {
        theta %= 360;
      }
      let aux = (n * theta);
      aux %= 360;
      // angleMode(RADIANS);
      let x = aux * PI / 180;

      let r = Math.sin(x);
      let t = (theta * Math.PI) / 180;

      let pt = toRectangular(r, t);

      this.line.push([old, pt]);
      old = pt;

    } while (theta != 0);




  }


  draw() {

    stroke(1);
    let val = lerp(0, this.line.length, sliderA.value());


    for (let i = 0; i < val; i++) {
      let line1 = this.line[i];

      line(line1[0].x, line1[0].y, line1[1].x, line1[1].y);
    }
  }
}



class MaurerRoseV3 {
  constructor() {
    this.line = [];
  }

  calc() {
    d = sliderD.value();
    n = sliderN.value();
     z = lerp(100, 1000, sliderZ.value());
    let z1 = 360;
    let k = sliderA.value();
    this.line = [];

    let T = 0,
      c = 0;
    do {
      let theta = T;
      let p = {
        x: Math.PI*2 * theta / z1,
        y: Math.sin(Math.PI*2 * n * theta / z1)
      }
      let old = toRectangular(p.x, p.y);
      do {
        theta += d;
        if (theta >= z1)
          theta %= z1;
        let aux = n * theta;
        aux %= z1;
       
        
        let x = aux * Math.PI*2 / z1;
        
        let r = Math.sin(x);
        let t = Math.PI*2 * theta / z1;
        // console.log(t);
        let pt = toRectangular(r, t);
      console.log(pt);
      
        
        
        this.line.push([old, pt]);
        
        if (theta == T)
        break;
        old = pt;
        c++;
      } while (1);
      if (c >= z1)
        break;
      T++;

    } while (1);

  }

  draw() {
    stroke(1);
    let val = lerp(0, this.line.length, sliderA.value());


    for (let i = 0; i < val; i++) {
      let line1 = this.line[i];
      // console.log(line1);
      
      stroke(random(0,100));
      line(line1[0].x, line1[0].y, line1[1].x, line1[1].y);
    }

  }

}




































let k;
let d = 8;
let n = 5;
let z = 10;
let sliderD;
let sliderN;
let sliderA;
let sliderZ;
let subesh = new MaurerRoseV3();

function setup() {
  // put setup code here
  let can = createCanvas(1400, 1400);
  can.parent('parent');
  sliderD = createSlider(1, 359, 72, 1);
  sliderN = createSlider(1, 359, 6, 1);
  sliderA = createSlider(0, 1, 1, 0.01);
  sliderZ = createSlider(0.1, 1, 0.1, 0.1);
  sliderD.touchMoved(() => {
    subesh.calc();
    redraw();
  });
  sliderN.touchMoved(() => {
    subesh.calc();
    redraw();
  });
  sliderA.touchMoved(() => {
    redraw();
  });
  sliderZ.touchMoved(() => {
    subesh.calc();
    redraw();
  });
  subesh.calc();
  noLoop();
}

function draw() {
  // put drawing code here
  background(255);
  translate(500, 500);

  push();
  noFill();

  strokeWeight(1.5);
  subesh.draw();
  pop();

}


function toRectangular(r, t) {

  let pt = {};
  pt.x = Math.cos(t) * r * z;
  pt.y = Math.sin(t) * r * z;

  return pt;
}