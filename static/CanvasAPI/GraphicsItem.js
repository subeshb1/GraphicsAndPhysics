class GraphicsItem {

  constructor() {
    this.zindex = 0;
    this.children = [];
    this.pos = {x:0,y:0};
    this.isSelectable = false;
    this.isSelected = false;
    this.isDraggable = false;
    this.isDragged = false;
    this.draggedPoint = {x:0,y:0};
    this.stroke = {r:0,g:0,b:0,a:255};
    this.fill = {r:0,g:0,b:0,a:255};
    this.strokeWeight = 1

  }

  draw() {

  }

  handleMouseDrag(e) {

  }
  handleMouseIn(e) {
    if( dist(mouseX,mouseY,this.pos.x, this.pos.y) <= 15) {
      cursor(MOVE);
      this.fill = {r:100,g:100,b:100,a:255}
    }
    else {
      cursor(ARROW);
      this.fill = {r:200,g:200,b:100,a:255}
    }
      console.log("HERE");

  }

  handleMouseOut(e) {
    if(this.isDraggable) {
      cursor(ARROW);
    }
  }

  handleMousePressed(e) {

  }
  handleMouseReleased(e) {

  }
}


class Circle extends GraphicsItem{
  constructor() {
    super();
    this.isDraggable = true;
    this.pos = {x:100,y:100};
    this.fill = {r:200,g:200,b:100,a:255}
  }
  draw() {
    push();
    fill(this.fill.r,this.fill.g,this.fill.b,this.fill.a);
    ellipse(this.pos.x,this.pos.y,30);
    fill(100);
    noStroke();
    ellipse(this.pos.x,this.pos.y,10)
    pop();
  }
}
