class Bezier {
  constructor(start, end, ...ctrpt) {
    this.start = start;
    this.end = end;
    this.ctrpt = ctrpt;
    this.t = 0;
    this.inc = 5;
  }

  update() {
    if (this.t >= 1000)
      this.inc = -10;
    else if (this.t <= 0)
      this.inc = 10;
    this.t += this.inc;
  }

  draw() {
    //points
    push();
    ellipseMode(CENTER);
    fill(0);
    ellipse(this.start.x, this.start.y, 10);
    ellipse(this.end.x, this.end.y, 10);
    this.ctrpt.forEach((item) => ellipse(item.x, item.y, 10));
    pop();

    //Lines
    let len = this.ctrpt.length;
    line(this.start.x, this.start.y, this.ctrpt[0].x, this.ctrpt[0].y);
    for (let i = 1; i < len; i++) {
      line(this.ctrpt[i - 1].x, this.ctrpt[i - 1].y, this.ctrpt[i].x, this.ctrpt[i].y);
    }
    line(this.ctrpt[len - 1].x, this.ctrpt[len - 1].y, this.end.x, this.end.y);

    //console.log(pt);
    let color = [{
        r: 200,
        g: 0,
        b: 0
      },
      {
        r: 200,
        g: 50,
        b: 50
      },
      {
        r: 50,
        g: 100,
        b: 200
      },
      {
        r: 100,
        g: 200,
        b: 100
      }
      ,
      {
        r: 50,
        g: 100,
        b: 200
      },
      {
        r: 100,
        g: 200,
        b: 100
      
      },
      {
        r: 100,
        g: 200,
        b: 100
      }
      ,
      {
        r: 50,
        g: 100,
        b: 200
      },
      {
        r: 100,
        g: 200,
        b: 100
      }
    ];
    let prev = this.start;
    for (let k = 0; k <= this.t; k += Math.abs(this.inc)) {
      let t = k / 1000;
      let ctrpt = [this.start, ...this.ctrpt, this.end];
      while (ctrpt.length > 1) {
        let pt = [];

        for (let i = 1; i < ctrpt.length; i++) {
          pt.push({
            x: this.lerp(t, ctrpt[i - 1].x, ctrpt[i].x),
            y: this.lerp(t, ctrpt[i - 1].y, ctrpt[i].y)
          });

        }
        //  console.log(pt);
        if (k == this.t) {
          for (let i = 0; i < pt.length - 1; i++) {

            push();
            let c = ctrpt.length - 1;
            strokeWeight(2)
            stroke(color[c].r, color[c].g, color[c].b);
            line(pt[i].x, pt[i].y, pt[i + 1].x, pt[i + 1].y);
            pop();
          }
          pt.forEach((pt) => {
            let c = ctrpt.length - 1;

            push();
            noStroke();
            fill(color[c].r, color[c].g, color[c].b);
            ellipseMode(CENTER);
            ellipse(pt.x, pt.y, 10);
              pop();
          });

        }
        ctrpt = pt;

        //  console.log(ctrpt);
      }
      push();
      stroke(255, 0, 0);
      strokeWeight(2)

      line(prev.x, prev.y, ctrpt[0].x, ctrpt[0].y);
      pop();
      prev = ctrpt[0];
    }


  }

  lerp(t, min, max) {

    return (max - min) * t + min;

  }
}
