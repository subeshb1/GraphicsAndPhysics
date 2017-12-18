/**
 * @class Scene
 * @summary -  An API to make Canvas and Graphics Handling Easier.
 * This class acts as a backbone to the entire graphics in the canvas. It is based on the GraphicsItem and Scene Modal
 * i.e The Scene captures all the events and handles all the draw(). It also finds the collision among
 *
 *
 */
class Scene {
  constructor() {
    this.draggable = true;
    this.dragPoint = {
      x: 0,
      y: 0
    };
    this.width = width;
    this.height = height;
    this.selectedItems = [];
    this.backgroundColor = {
      r: 100,
      g: 100,
      b: 100,
      a: 255
    };
    this.item = [];
    this.graphicsItem = [];
    this.collidingItems = [];
    this.zoom = 1;
    this.minZoom = 0.1;
    this.maxZoom = 8;
    this.pos = {
      x: 0,
      y: 0
    };

  }


  handleMouseDrag(event) {

    if (this.draggable) {

      if (this.height * this.zoom > height) {
        let translate = {
          x: mouseX + this.dragPoint.x,
          y: this.dragPoint.y + mouseY
        }

        this.pos.x = translate.x;
        this.pos.y = translate.y;

        if (this.pos.x > 0)
          this.pos.x = 0;
        if (this.pos.y > 0)
          this.pos.y = 0;

        if ((this.pos.y + this.height * this.zoom) < height)
          this.pos.y = -(this.height * this.zoom - height);
        if (this.pos.x + this.width * this.zoom < width)
          this.pos.x = -(this.width * this.zoom - width);
      }
    }

  }

  handleMousePressed(event) {
    if (this.draggable) {

      this.dragPoint = {
        x: this.pos.x - mouseX,
        y: this.pos.y - mouseY
      }
    }
  }

  handleMouseReleased(event) {


  }

  handleMouseMove(event) {
    this.graphicsItem.forEach((item) => {
      item.handleMouseIn(event);
    });
  }

  handleMouseOut(event) {

  }

  handleMouseWheel(event) {
    if (event.ctrlKey) {
      let sensativity = 0.0005;

      this.zoom += sensativity * event.delta;

      this.zoom = constrain(this.zoom, this.minZoom, this.maxZoom);
      if(this.zoom < 1) {
        this.pos.x = 0; this.pos.y = 0;
      }

      return false;
    }
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    scale(this.zoom);
    fill(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, this.backgroundColor.a);
    push();
    noStroke();
    rect(0, 0, this.width , this.height );
    pop();

    this.graphicsItem.forEach(item => item.draw());


    pop();
  }

  update() {

  }

  add(graphicsItem) {
    if (graphicsItem instanceof GraphicsItem) {
      this.item.push(graphicsItem);
    } else {
      console.log("Warning Only GraphicsItem can be added to the Scene");
    }
  }

  extract() {
    this.item.forEach(graphicsItem => {
      addChildren(graphicsItem);
      this.graphicsItem.push(graphicsItem);
    });
    this.sort();
  }

  sort() {
    this.graphicsItem.sort((a, b) => {
      return a.zindex > b.zindex;
    })
  }

  addChildren(graphicsItem) {
    if (!graphicsItem.children.length)
      return;
    graphicsItem.children.forEach(child => {
      addChildren(child);
      this.graphicsItem.push(child);
    });

  }

}
