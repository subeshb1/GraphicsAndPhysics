/**
 * @class Scene
 * @summary -  An API to make Canvas and Graphics Handling Easier.
 * This class acts as a backbone to the entire graphics in the canvas. It is based on the GraphicsItem and Scene Modal
 * i.e The Scene captures all the events and handles all the draw(). It also finds the collision among
 *
 *
 */
class Scene {
  /**
   * @constructor 
   * 
   */
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
      r: 255,
      g: 255,
      b: 255,
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


  update() {

  }

  /**
   * add - Description
   *
   * @param {GraphicsItem} graphicsItem - A GraphicsItem instance
   *
   */
  add(...graphicsItem) {
    for (let i = 0; i < graphicsItem.length; i++) {
      if (graphicsItem[i] instanceof GraphicsItem) {

        this.graphicsItem.unshift(graphicsItem[i]);
        this.sort();
      } else {
        console.log("Warning Only GraphicsItem can be added to the Scene");
      }
    }
  //  this.extract();
  }


  sort() {
    this.graphicsItem.sort((a, b) => {
      return a.zindex < b.zindex;
    })
  }

  /**
   * getMouseX - Description
   *
   * @return {Number} - returns mouse x pos with respect to the scene;
   */
  getMouseX() {
    return (mouseX - this.pos.x) / this.zoom;
  }

  /**
   * getMouseY - Description
   *
   * @return {Number} - returns mouse y pos with respect to the scene;
   */
  getMouseY() {
    return (mouseY - this.pos.y) / this.zoom;
  }



  handleMouseDrag(event) {
    let notHandled = this.graphicsItem.every((item) => {
      return item.handleMouseDrag(this.getMouseX(), this.getMouseY(), event);
    });
    if (this.draggable && notHandled) {

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
        return true;
      }
      return false;
    }
    return true;


  }

  handleMousePressed(event) {
    this.graphicsItem.every((item) => {
      return item.handleMousePressed(this.getMouseX(), this.getMouseY(), event);
    });

    if (this.draggable) {

      this.dragPoint = {
        x: this.pos.x - mouseX,
        y: this.pos.y - mouseY
      }
    }
  }

  handleMouseReleased(event) {
    this.graphicsItem.every((item) => {
      return item.handleMouseReleased(this.getMouseX(), this.getMouseY(), event);
    });

  }

  handleMouseMove(event) {
    this.graphicsItem.every((item) => {
      return item.handleMouseMove(this.getMouseX(), this.getMouseY(), event);
    });
  }



  handleMouseWheel(event) {
    if (event.ctrlKey) {
      let sensativity = 0.0005;

      this.zoom += sensativity * event.delta;

      this.zoom = constrain(this.zoom, this.minZoom, this.maxZoom);
      if (this.zoom < 1) {
        this.pos.x = 0;
        this.pos.y = 0;
      }

      return false;
    } else
      return true;
  }


  draw() {

    push();

    translate(this.pos.x, this.pos.y);
    scale(this.zoom);

    push();
    noStroke();
    fill(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, this.backgroundColor.a);
    rect(0, 0, this.width, this.height);
    pop();


    this.graphicsItem.reverseEach(item => {
      item.drawAll()
      //console.log(item);
    });


    pop();
  }


}

Array.prototype.reverseEach = function(callback) {
  let len = this.length;
  for (let i = len-1; i >=0 ; i--) {
    callback(this[i]);
  }
}
