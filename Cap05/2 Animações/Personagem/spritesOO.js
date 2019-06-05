
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
    if (this.tickCount > this.estadoAtual.ticksFrame) {
      this.tickCount = 0;
      // Calcular os frames por segundo da explosão
      if (this.frameIndex < this.estadoAtual.frames - 1) {
        // Go to the next frame
        this.frameIndex += 1;
      } else if (this.estadoAtual.loop) {
        this.frameIndex = 0;
      }
    }

    this.ctx.drawImage(this.estadoAtual.img, this.frameIndex * this.estadoAtual.sw, 0,
      this.estadoAtual.sw, this.estadoAtual.sh, this.estadoAtual.dx, this.estadoAtual.dy, this.estadoAtual.dw, this.estadoAtual.dh);
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
      ticksFrame: 3,
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
  caveira.estadoAtual = estados.andando;
  caveira.update = () => {

  }

  game.start();

  let atacarBtn = document.querySelector("#atacar");
  atacarBtn.addEventListener("click", () => {
    caveira.estadoAtual = estados.atacando;
    caveira.frameIndex = 0;
    caveira.tickCount = 0;
  });

  let andarBtn = document.querySelector("#andar");
  andarBtn.addEventListener("click", () => {
    caveira.estadoAtual = estados.andando;
    caveira.frameIndex = 0;
    caveira.tickCount = 0;
  });
  andarBtn.checked = true;
}
