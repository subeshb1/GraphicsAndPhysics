class GraphicsItem {

  constructor() {
    this.zindex = 0;
    this.children = [];
    this.pos = {
      x: 0,
      y: 0
    };
    this.isSelectable = false;
    this.isSelected = false;
    this.isDraggable = false;
    this.isDragged = false;
    this.draggedPoint = {
      x: 0,
      y: 0
    };
    this.stroke = {
      r: 0,
      g: 0,
      b: 0,
      a: 255
    };
    this.fill = {
      r: 0,
      g: 0,
      b: 0,
      a: 255
    };
    this.strokeWeight = 1;

  }

  setZindex(val) {
    this.zindex = val;
  }

  addChild(...graphicsItem) {
    graphicsItem.forEach((graphicsItem) => {
      this.children.push(graphicsItem);
    });
  }

  handleMouseDrag(mousex, mousey, e) {
    let notHandled = this.children.every(child => {
      return child.handleMouseDrag(mousex - this.pos.x, mousey - this.pos.y, e);
    });

    if (notHandled) {
    //  console.log(this.isDragged);
      if (this.isDragged) {
        this.pos.x = mousex + this.draggedPoint.x;
        this.pos.y = mousey + this.draggedPoint.y;

        return false;
      } else return true;
    }else
      return false;
  }

  handleMouseMove(mousex, mousey, e) {
    let notHandled = this.children.every(child => {

      return child.handleMouseMove(mousex - this.pos.x, mousey - this.pos.y, e);
    });

    if (notHandled) {
      if (this.isDraggable && this.isInside(mousex, mousey)) {
        cursor(MOVE);
        return false;
      } else {
        cursor(ARROW);
        return true;
      }
    }
    return false;

  }

  isInside(mousex, mousey) {

  }
  handleMousePressed(mousex, mousey, e) {
    let notHandled = this.children.every(child => {
      return child.handleMousePressed(mousex - this.pos.x, mousey - this.pos.y, e);
    });
    if (notHandled) {
      if (this.isInside(mousex, mousey)) {
        if (this.isDraggable) {
          this.isDragged = true;
          this.draggedPoint.x = this.pos.x - mousex;
          this.draggedPoint.y = this.pos.y - mousey;
          return false;
        }
      } return true;
    }

    return false;
  }

  handleMouseReleased(mousex, mousey, e) {
    let notHandled = this.children.every(child => {
      return child.handleMouseReleased(mousex - this.pos.x, mousey - this.pos.y, e);
    });
    if (notHandled) {

      if (this.isDraggable && this.isDragged) {
        this.isDragged = false;
        console.log(this.children.length);
        return false;
      }
      return true

    }

    return false;
  }

  drawAll() {
    push();
    this.draw();
    translate(this.pos.x, this.pos.y);

    this.children.reverseEach(child => child.drawAll());

    pop();
  }
  draw() {

  }

}




class Circle extends GraphicsItem {
  constructor(x, y, r) {
    super();
    this.isDraggable = true;
    this.pos = {
      x: x,
      y: y
    };
    this.radius = r;
    this.fill = {
      r: 200,
      g: 200,
      b: 200,
      a: 255
    }

  }
  draw() {
    push();
    noStroke();
    fill(this.fill.r, this.fill.g, this.fill.b, this.fill.a);
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
    pop();
  }
  isInside(mousex, mousey) {
    if (dist(mousex, mousey, this.pos.x , this.pos.y ) <= this.radius)
      return true;
    return false;
  }
  handleMouseMove(mousex, mousey, e) {
    let notHandled = this.children.every(child => {

      return child.handleMouseMove(mousex - this.pos.x, mousey - this.pos.y, e);
    });

    if (notHandled) {
      if (this.isDraggable && this.isInside(mousex, mousey)) {
        cursor(MOVE);
        this.fill = {
          r: 200,
          g: 200,
          b: 200,
          a: 200};
          redraw();
        return false;
      } else {
        this.fill = {
          r: 100,
          g: 100,
          b: 100,
          a: 200};
        
         
        cursor(ARROW);
        
        return true;
      }
    }
   
    return false;

  }
}
