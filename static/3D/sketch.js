let angle = 0.0;
function setup() {
  let c = createCanvas(600,400,WEBGL);

}

function draw() {
  // put drawing code here
  // pointLight(0,0,255,mouseX-200 , mouseY-200, 0);
  // ambientLight(255,0,0, 200 , 200, 0);
  background(175);

  rectMode(CENTER);
  //  noStroke(); 
  //  normalMaterial();
  
  // translate(0,0,mouseX);
  rotateY(angle * 0.3);
  rotateX(angle * 0.5);
  rotateZ(angle * 0.2);
  // rect(0,0,150,150);
  push();
  noFill();
  stroke(255);
  strokeWeight(1);
  //  box(100,100,100);
   torus(100,10);
  sphere(100);

  pop();
  push();
  strokeWeight(3);
  box();
  
  pop();
  

  angle += 0.07;
}