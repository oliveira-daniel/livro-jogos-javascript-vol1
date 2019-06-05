
// Selecionando o elemento canvas
let canvas = document.querySelector("#game-canvas");

// Obtain a context object
let context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;

class GameObject {
  constructor () {
    Game.addGameObj(this);
  }
}

class Sprite2d extends GameObject {

  constructor (ctx2d, estados) {
    super();
    this.ctx = ctx2d;
    this.canvas = ctx2d.canvas;
    this.frameIndex = 0;
    this.tickCount = 0;

    // this.estados = estados;

    for (let key in estados) {
      estados[key].img.src = estados[key].imgSRC;
    }
  }

  draw () {
    // --- Update
    this.update();

    this.tickCount += 1;
    if (this.tickCount > this._defs.ticksFrame) {
      this.tickCount = 0;
      // Calcular os frames por segundo da explosão
      if (this.frameIndex < this._defs.frames - 1) {
        // Go to the next frame
        this.frameIndex += 1;
      } else if (this._defs.loop) {
        this.frameIndex = 0;
      }
    }

    this.ctx.drawImage(this._defs.img, this.frameIndex * this._defs.sw, 0,
      this._defs.sw, this._defs.sh, this._defs.dx, this._defs.dy, this._defs.dw, this._defs.dh);
  }

}

class Game {

  constructor (args) {
    Game.gObjcts = new Array();
    this.canvas = args.canvas;
    this.ctx = this.canvas.getContext("2d");
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
      go.draw();
    });
  }

  start () {

    this.update();
  }

  update () {
    requestAnimationFrame(() => this.update());

    // console.log("animando...");
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.render();
  }

}

window.onload = () => {
  let game = new Game({
    canvas: canvas
  });

  let estados = {
    andando: {
      frames: 13,
      ticksFrame: 4,
      sw: 22,
      sh: 33,
      dx: canvas.width  / 2 - 22 / 2 * 4,
      dy: canvas.height / 2 - 33 / 2 * 4,
      dw: 22 * 4,
      dh: 33 * 4,
      loop: true,
      imgSRC: "../assets/Skeleton Walk.png",
      img: new Image(),
    },
    atacando: {
      frames: 18,
      ticksFrame: 4,
      sw: 43,
      sh: 37,
      dx: canvas.width  / 2 - 43 / 2 * 4 + 30,
      dy: canvas.height / 2 - 37 / 2 * 4 - 7,
      dw: 43 * 4,
      dh: 37 * 4,
      loop: false,
      imgSRC: "../assets/Skeleton Attack.png",
      img: new Image(),
    }
  }

  let caveira = new Sprite2d(context, estados);
  caveira._defs = estados.andando;

  let atacarBtn = document.querySelector("#atacar");
  atacarBtn.addEventListener("click", () => {
    caveira._defs = estados.atacando;
    caveira.frameIndex = 0
  });

  let andarBtn = document.querySelector("#andar");
  andarBtn.checked = true;
  andarBtn.addEventListener("click", () => {
    caveira._defs = estados.andando;
    caveira.frameIndex = 0
  });

  caveira.update = () => {

  }

  game.start();
}
