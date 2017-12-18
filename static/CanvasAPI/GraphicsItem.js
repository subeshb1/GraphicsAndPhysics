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
    this.children.forEach((child) => child.zindex += this.zindex);

  }
  addChild(graphicsItem) {
    this.children.push(graphicsItem);
    graphicsItem.zindex += this.zindex;
  }

  handleMouseDrag(mousex, mousey, e) {

    if (this.isDragged) {
      this.pos.x = mousex + this.draggedPoint.x;
      this.pos.y = mousey + this.draggedPoint.y;
      return false;
    }


    return true;
  }

  handleMouseMove(mousex, mousey, e) {
    if (this.isDraggable && this.isInside(mousex, mousey)) {
      cursor(MOVE);
      return false;
    } else {
      cursor(ARROW);
      return true;
    }


  }

  isInside(mousex, mousey) {

  }
  handleMousePressed(mousex, mousey, e) {
    if (this.isInside(mousex, mousey)) {
      if (this.isDraggable) {
        this.isDragged = true;
        this.draggedPoint.x =this.pos.x -  mousex;
        this.draggedPoint.y = this.pos.y - mousey;
      }


      return false;
    }

    return true;
  }
  handleMouseReleased(mousex, mousey, e) {

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
      b: 100,
      a: 255
    }

  }
  draw() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b, this.fill.a);
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
    pop();
  }
  isInside(mousex, mousey) {
    if (dist(mousex, mousey, this.pos.x, this.pos.y) <= this.radius)
      return true;
    return false;
  }
}
