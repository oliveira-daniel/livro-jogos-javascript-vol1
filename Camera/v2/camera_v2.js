

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

// Camera handler
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

// Keyboard handler
const KeyCode = {
  UP : 38,
  DOWN : 40,
  LEFT : 37,
  RIGHT : 39
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

  static isDown (keyCode) {
    return this._keys[keyCode];
  }

}

Keyboard._keys = new Array;

// Game class
class Game {

  static start (canvasID) {
    Game.canvas = document.getElementById(canvasID);
    Game.ctx = this.canvas.getContext('2d');
    Game.init();
    requestAnimationFrame(this.tick);
  }

  static init () {
    Game._previousElapsed = 0;
    Game.camera = new Camera(gameMap, 315, 315);
  }

  static tick (elapsed) {
    window.requestAnimationFrame(Game.tick);

    // compute delta time in seconds -- also cap it
    var delta = (elapsed - Game._previousElapsed) / 1000.0;
    delta = Math.min(delta, 0.25); // maximum delta of 250 ms
    Game._previousElapsed = elapsed;

    // clear previous frame
    Game.ctx.clearRect(0, 0, 300, 300);

    Game.update(delta);
    Game.render();
  }

  static update (delta) {
    // handle camera movement with arrow keys
    var dirx = 0;
    var diry = 0;
    var step = 2.5;

    if (Keyboard.isDown(KeyCode.LEFT)) { dirx = -step; }
    if (Keyboard.isDown(KeyCode.RIGHT)) { dirx = step; }
    if (Keyboard.isDown(KeyCode.UP)) { diry = -step; }
    if (Keyboard.isDown(KeyCode.DOWN)) { diry = step; }

    Game.camera.move(delta, dirx, diry);
  }

  static render () {
    var startCol = Math.floor(Game.camera.x / gameMap.tsize);
    var endCol = startCol + (Game.camera.width / gameMap.tsize);
    var startRow = Math.floor(Game.camera.y / gameMap.tsize);
    var endRow = startRow + (Game.camera.height / gameMap.tsize);
    var offsetX = -Game.camera.x + startCol * gameMap.tsize;
    var offsetY = -Game.camera.y + startRow * gameMap.tsize;

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
        Game.ctx.fillRect(Math.round(x), Math.round(y), gameMap.tsize, gameMap.tsize);
      }
    }
  }

}

window.onload = () => {

  Game.start("game-canvas");

  Keyboard.listenForEvents();

}
