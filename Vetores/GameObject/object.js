
class Game {

  constructor (args) {
    Game.gObjcts = new Array();
    Game.canvas = document.querySelector(`#${args.canvasId}`);
    Game.ctx = Game.canvas.getContext("2d");
    Game.setControls();
  }

  //
  static addGameObj (gameObject) {
    Game.gObjcts.push(gameObject);
  }

  static get gameObjects () {
    return this.gObjcts;
  }

  render () {
    Game.gameObjects.forEach(go => {
      go.update();
      go.draw();
    });
  }

  clear () {
    Game.ctx.save();
    Game.ctx.setTransform(1, 0, 0, 1, 0, 0);
    // Will always clear the right space
    Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
    Game.ctx.restore();
  }

  static get limits () {
    return {maxw: Game.canvas.width, minw: 0, miny: 0, maxy: Game.canvas.height}
  }

  static setControls () {

    addEventListener("keydown", e => {
      e.preventDefault();
      Game.key = e.key;
    });

    addEventListener("keyup", e => {
      e.preventDefault();
      Game.key = null;
    });

  }

  start () {
    this.update();
  }

  update () {
    requestAnimationFrame(() => this.update());

    this.clear();
    this.render();

  }

}

class GameObject {
  constructor () {
    Game.addGameObj(this);
  }

  update () {}
}

class PlayerObject extends GameObject {

  constructor (x, y) {
    super();
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    this.ctx2d = Game.ctx;
    this.moving = false;
  }

  get velMov () {
    return 7;
  }

  set colisionMap (map) {
    this.map = map;
  }

  draw () {
    // Definir uma cor ao desenho
    this.ctx2d.fillStyle = "#9999cc";
    // Desenhar um retângulo
    this.ctx2d.fillRect(this.pos.x, this.pos.y, 20, 20);
  }

  applyForce (force) {
    this.acc.add(force);
  }

  update () {

    if (!this.moving) {
      if (Game.key == "ArrowLeft") {
        // this.applyForce(new Vector(-.5, 0));
        this.vel.set(-this.velMov, 0);
      }

      if (Game.key == "ArrowRight") {
        // this.applyForce(new Vector(.5, 0));
        this.vel.set(this.velMov, 0);
      }

      if (Game.key == "ArrowUp") {
        // this.applyForce(new Vector(0, -.5));
        this.vel.set(0, -this.velMov);
      }

      if (Game.key == "ArrowDown") {
        // this.applyForce(new Vector(0, .5));
        this.vel.set(0, this.velMov);
      }
    }

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    this.verifyEdges();

    if (this.vel.x > 0 || this.vel.x < 0 ||
        this.vel.y > 0 || this.vel.y < 0) {
      this.moving = true;
    } else {
      this.moving = false;
    }

    this.ctx2d.translate(-this.vel.x * .5, -this.vel.y * .5);
  }

  verifyEdges () {
    if (this.pos.x < 0) {
      this.vel.x *= 0;
      this.pos.x = 0;
    }

    if (this.pos.y < 0) {
      this.vel.y *= 0;
      this.pos.y = 0;
    }

    if (this.pos.x >= Game.limits.maxw - 20) {
      this.vel.x *= 0;
      this.pos.x = Game.limits.maxw - 20;
    }

    if (this.pos.y >= Game.limits.maxy - 20) {
      this.vel.y *= 0;
      this.pos.y = Game.limits.maxy - 20;
    }

    // console.log( Math.floor(this.pos.x / 20) , Math.floor(this.pos.y / 20) );
    var mapX = Math.floor((this.pos.x) / 20);
    var mapY = Math.floor((this.pos.y) / 20);

    // Se deslocando para a direita
    if (this.vel.x > 0 && this.map[(mapX + mapY * 12) + 1] == 1) {
      this.vel.x *= 0;
      this.pos.x = 20 * mapX;
    }

    // Se deslocando para a esquerda
    if (this.vel.x < 0 && this.map[(mapX + mapY * 12)] == 1) {
      this.vel.x *= 0;
      this.pos.x = 20 * mapX + 20;
    }

    // Se deslocando para baixo
    if (this.vel.y > 0 && this.map[(mapX + mapY * 12) + 12] == 1) {
      this.vel.y *= 0;
      this.pos.y = 20 * mapY;
    }

    // Se deslocando para baixo
    if (this.vel.y < 0 && this.map[(mapX + mapY * 12)] == 1) {
      this.vel.y *= 0;
      this.pos.y = 20 * mapY + 20;
    }
  }

}

class TileMap extends GameObject {

  constructor (x, y, color) {
    super();
    this.x = x;
    this.y = y;
    this.color = color;
    this.ctx2d = Game.ctx;
  }

  draw () {
    // Definir uma cor ao desenho
    this.ctx2d.fillStyle = this.color;
    // Desenhar um retângulo
    this.ctx2d.fillRect(this.x, this.y, 20, 20);
  }
}

class Vector {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  add (vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  set (x, y) {
    this.x = x;
    this.y = y;
  }
}

function createMap (map, canvas) {
  let posx = 0;
  let posy = 0;
  for (let i = 0; i < map.length; i++) {
    if (map[i] == 1) new TileMap (posx, posy, "#6699cc");
    else new TileMap (posx, posy, "#3333cc");
    if (posx % 220 == 0 && posx > 0) {
      posx = 0;
      posy += 20;
    } else posx += 20;
  }

  // canvas.width  = map.length * 20;
  // canvas.height = map.length * 20;

}

window.onload = () => {

  // Selecionando o elemento canvas
  let canvas = document.querySelector("#game-canvas");

  // Obter o contexto 2d
  let context = canvas.getContext("2d");
  context.imageSmoothingEnabled = false;

  let game = new Game ({
    canvasId: "game-canvas"
  });

  let gameMap = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1,
    1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];

  createMap(gameMap, canvas);

  let player1 = new PlayerObject (20, 20);
  player1.colisionMap = gameMap;

  game.start();

}
