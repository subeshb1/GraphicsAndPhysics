class Bezier extends GraphicsItem {
  constructor(...ctrpt) {
    super();

    this.ctrpt = [];
    ctrpt.forEach(pt => {

      this.ctrpt.push(new Circle(pt.x, pt.y, 10));
    });
    this.ctrpt.forEach(pt => this.children.unshift(pt));
    this.animate = false;
    this.t = 1000;
    this.inc = 10;
    this.showLine = true;
  }

  update() {
    if (this.t >= 1000)
      this.inc = -10;
    else if (this.t <= 0)
      this.inc = 10;
    this.t += this.inc;
  }

  draw() {
    if(this.animate)
      this.update();
    //Lines
    let len = this.ctrpt.length;
    
    for (let i = 1; i < len; i++) {
      push();
      stroke(0,90);
      line(this.ctrpt[i - 1].pos.x, this.ctrpt[i - 1].pos.y, this.ctrpt[i].pos.x, this.ctrpt[i].pos.y);
      pop();
    }
    
    let color = [{
        r: 10,
        g: 200,
        b: 255
      },
      {
        r: 10,
        g: 200,
        b: 100  
      },
      {
        r: 50,
        g: 100,
        b: 200
      },
      {
        r: 200,
        g: 200,
        b: 0
      },
      {
        r: 150,
        g: 20,
        b: 150
      }
    ];
    let prev = this.ctrpt[0].pos;
    for (let k = 0; k <= this.t; k += Math.abs(this.inc)) {
      let t = k / 1000;
      let ctrpt = [];
      this.ctrpt.forEach((pt) => ctrpt.push(pt.pos));
      while (ctrpt.length > 1) {
        let pt = [];

        for (let i = 1; i < ctrpt.length; i++) {
          pt.push({
            x: this.lerp(t, ctrpt[i - 1].x, ctrpt[i].x),
            y: this.lerp(t, ctrpt[i - 1].y, ctrpt[i].y)
          });

        }
        //  console.log(pt);
        if (this.showLine && k == this.t && k!=1000) {
          for (let i = 0; i < pt.length - 1; i++) {

            push();
            let c = ctrpt.length - 1;
            strokeWeight(2);
            stroke(color[c % 5].r, color[c % 5].g, color[c % 5].b, 90);
            line(pt[i].x, pt[i].y, pt[i + 1].x, pt[i + 1].y);
            pop();
          }
          pt.forEach((pt) => {
            let c = ctrpt.length - 1;

            push();
            noStroke();
            if(c!=1)
            fill(color[c % 5].r, color[c % 5].g, color[c % 5].b);
            else
            fill(255,0,0);
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