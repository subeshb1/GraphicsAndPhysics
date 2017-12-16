class Bezier {
  constructor(start, end, ...ctrpt) {
    this.start = start;
    this.end = end;
    this.ctrpt = ctrpt;
    this.t = 0;
    this.inc = 0.1;
  }

  update() {
     if (this.t >= 1)
      this.inc = -0.1;
     else if(this.t <= 0)
      this.inc = 0.1;
    this.t += this.inc;
  }

  draw() {
    //points
    push();
    ellipseMode(CENTER);
    fill(0);
    ellipse(this.start.x, this.start.y, 10);
    ellipse(this.end.x, this.end.y, 10);
    this.ctrpt.forEach((item)=>ellipse(item.x, item.y, 10));

    pop();

    //Lines
    let len = this.ctrpt.length;
    line(this.start.x, this.start.y, this.ctrpt[0].x, this.ctrpt[0].y);
    for(let i = 1 ; i < len; i++) {
        line(this.ctrpt[i-1].x, this.ctrpt[i-1].y, this.ctrpt[i].x, this.ctrpt[i].y);
    }
    line(this.ctrpt[len-1].x, this.ctrpt[len-1].y, this.end.x, this.end.y);

    for (let t = 0; t < this.t; t += 0.1) {

      let pt = [];
      pt[0] = {
       x: this.lerp(t,  this.ctrpt[0].x,this.start.x),
       y: this.lerp(t, this.ctrpt[0].y, this.start.y)
     }
      for(let i = 1 ; i < len; i++) {
        pt[i] = {
         x: this.lerp(t, this.ctrpt[i-1].x, this.ctrpt[i].x),
         y: this.lerp(t, this.ctrpt[i-1].y, this.ctrpt[i].y)
       }
       console.log('------------');
       console.log(pt[i]);
       console.log('------------');
      }

      pt[pt.length] = {
        x: this.lerp(t, this.end.x, this.ctrpt[len-1].x),
        y: this.lerp(t,  this.end.y,this.ctrpt[len-1].y)
      }
      console.log(pt);

      for(let i = 0 ; i < pt.length-1; i++) {
        console.log(i);

        line(pt[i].x, pt[i].y, pt[i+1].x, pt[i+1].y);
      }

    }


  }

  lerp(t, max, min) {

    return (max - min) * t + min;

  }
}
