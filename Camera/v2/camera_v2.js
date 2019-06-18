

let gameMap = {
  map: [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1,
    1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ],
  cols: 12,
  rows: 12,
  tsize: 45,
  getTile: function (col, row) {
    return this.map[row * gameMap.cols + col];
  }
};

class Camera {

  constructor (map, width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.maxX = map.cols * map.tsize - width;
    this.maxY = map.rows * map.tsize - height;
  }

  move (delta, dirx, diry) {
    // move camera
    this.x += dirx * Camera.SPEED * delta;
    this.y += diry * Camera.SPEED * delta;
    // clamp values
    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));

    // console.log("Camera interagindo", this.x);
  }

}

Camera.SPEED = 50; // pixels per second

//
// Keyboard handler
//
const KeyCode = {
  UP : 38,
  DOWN : 40,
}

class Keyboard {

  static listenForEvents () {
    window.addEventListener("keydown", Keyboard.downEvent);
    window.addEventListener("keyup", Keyboard.upEvent);
  }

  static downEvent (event) {
    var keyCode = event.keyCode;
    Keyboard._keys[keyCode] = true;
  }

  static upEvent (event) {
    var keyCode = event.keyCode;
    Keyboard._keys[keyCode] = false;
  }

}

Keyboard._keys = new Array;

class Game {}

Game.start = function (canvasID) {
  this.canvas = document.getElementById(canvasID);
  this.ctx = this.canvas.getContext('2d');
  this.init();
  requestAnimationFrame(this.tick);
}

Game.init = function () {
  this._previousElapsed = 0;
  this.camera = new Camera(gameMap, 315, 315);
}

Game.tick = function (elapsed) {
  window.requestAnimationFrame(this.tick);

  // compute delta time in seconds -- also cap it
  var delta = (elapsed - this._previousElapsed) / 1000.0;
  delta = Math.min(delta, 0.25); // maximum delta of 250 ms
  this._previousElapsed = elapsed;

  // clear previous frame
  this.ctx.clearRect(0, 0, 300, 300);

  this.update(delta);
  this.render();

}.bind(Game);

Game.update = function (delta) {

  // handle camera movement with arrow keys
  var dirx = 0;
  var diry = 0;

  if (Keyboard._keys[KeyCode.DOWN]) { diry = 1; }
  this.camera.move(delta, dirx, diry);
};

Game.render = function () {
  var startCol = Math.floor(this.camera.x / gameMap.tsize);
  var endCol = startCol + (this.camera.width / gameMap.tsize);
  var startRow = Math.floor(this.camera.y / gameMap.tsize);
  var endRow = startRow + (this.camera.height / gameMap.tsize);
  var offsetX = -this.camera.x + startCol * gameMap.tsize;
  var offsetY = -this.camera.y + startRow * gameMap.tsize;

  for (var c = startCol; c <= endCol; c++) {
    for (var r = startRow; r <= endRow; r++) {
      var tile = gameMap.getTile(c, r);
      var x = (c - startCol) * gameMap.tsize + offsetX;
      var y = (r - startRow) * gameMap.tsize + offsetY;
      if (tile !== 0) { // 0 => empty tile
        this.ctx.fillStyle = "#6699cc";
      } else {
        this.ctx.fillStyle = "#3333cc";
      }
      // Desenhar um retângulo
      this.ctx.fillRect(Math.round(x), Math.round(y), gameMap.tsize, gameMap.tsize);
    }
  }
}

window.onload = () => {

  Game.start("game-canvas");

  Keyboard.listenForEvents();

}
