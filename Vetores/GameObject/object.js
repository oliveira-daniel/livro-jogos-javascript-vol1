
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
    //Game.ctx.translate(-1, 0);
    //Game.ctx.save();
    //Game.ctx.setTransform(1, 0, 0, 1, 0, 0);
    // Will always clear the right space
    Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
    //Game.ctx.restore();
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
}

class PlayerObject extends GameObject {

  constructor (x, y) {
    super();
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    this.ctx2d = Game.ctx;
  }

  get velMov () {
    return 4;
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

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

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

  }

}

class Sprite2d extends GameObject {

  constructor (ctx2d, estados) {
    super();
    this.ctx = ctx2d;
    this.canvas = ctx2d.canvas;
    this.frameIndex = 0;
    this.tickCount = 0;

    for (let key in estados) {
      estados[key].img.src = estados[key].imgSRC;
    }
  }

  draw () {
    // --- Update
    this.update();

    this.tickCount += 1;
    if (this.tickCount > this.estadoAtual.ticksFrame) {
      this.tickCount = 0;
      // Calcular os frames por segundo
      if (this.frameIndex < this.estadoAtual.frames - 1) {
        // Avançar ao próximo frame
        this.frameIndex += 1;
      } else if (this.estadoAtual.loop) {
        // Verifica se deve executar a animação em loop
        this.frameIndex = 0;
      }
    }

    this.ctx.drawImage(this.estadoAtual.img, this.frameIndex * this.estadoAtual.sw,
      0, this.estadoAtual.sw, this.estadoAtual.sh, this.estadoAtual.dx,
      this.estadoAtual.dy, this.estadoAtual.dw, this.estadoAtual.dh);
  }

}

class BackgroundParallax extends GameObject {

  constructor (ctx2d) {
    super();
    this.layers = new Array();
    this.ctx = ctx2d;
  }

  addLayer(newLayer, delta, w, h, x, y) {
    let img = new Image();
    img.src = newLayer;
    this.layers.push({img: img, x: x, y: y, w: w, h: h, delta: delta});
  }

  draw () {
    this.layers.forEach(layer => {
      /*if (layer.x >= -layer.w) {
        layer.x -= layer.delta;
      } else {
        layer.x += layer.w-layer.delta;
      }*/



      this.ctx.drawImage(layer.img, layer.x + layer.w-1, layer.y, layer.w, layer.h);
      this.ctx.drawImage(layer.img, layer.x, layer.y, layer.w, layer.h);
    });
  }

}

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }
}

window.onload = () => {

  // Selecionando o elemento canvas
  let canvas = document.querySelector("#game-canvas");

  canvas.focus();

  // Obter o contexto 2d
  let context = canvas.getContext("2d");
  context.imageSmoothingEnabled = false;

  let game = new Game({
    canvasId: "game-canvas"
  });

  let player1 = new PlayerObject(280, 280);

  game.start();

  let player = new Vector(20, canvas.height);
  let vel    = new Vector(2.5, 0);
  let jump   = new Vector(0, -10);
  let gravity = new Vector(0, 0.5);
  let jumping = false;

  let obstaculo = new Vector(420, canvas.height);

  function update() {
      requestAnimationFrame(update);
      clear();

      // Definir uma cor ao desenho
      context.fillStyle = "#9999cc";
      // Desenhar um retângulo
      context.fillRect(player.x, player.y - 60, 20, 60);

      // Definir uma cor ao desenho
      context.fillStyle = "#999966";
      context.fillRect(obstaculo.x, obstaculo.y - 40, 20, 40);

      if (jumping) {
        vel.add(jump);
        jump.set(0, 0);
      }

      context.translate(-vel.x, 0);

      vel.add(gravity);
      player.add(vel);

      if (player.y > canvas.height) {
        vel.y *= 0;
        player.y = canvas.height;
        jump.set(0, -10);
        jumping = false;
      }
  }

  function clear() {
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    // Will always clear the right space
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
  }

  function keyPressed(e) {
    // Armazenar a tecla pressionada.
    var k = e.key;

    if (k == ' ' && !jumping) {
      jumping = true;
    }
  }

  // addEventListener("keydown", keyPressed);

  // update();

}
