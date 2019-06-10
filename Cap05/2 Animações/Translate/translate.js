
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

    this.ctx.translate(-1, 0);
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    // Will always clear the right space
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
    this.render();

  }

}

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
      if (layer.x >= -layer.w) {
        layer.x -= layer.delta;
      } else {
        layer.x += layer.w-layer.delta;
      }

      this.ctx.drawImage(layer.img, layer.x + layer.w-1, layer.y, layer.w, layer.h);
      this.ctx.drawImage(layer.img, layer.x, layer.y, layer.w, layer.h);
    });
  }

}

window.onload = () => {

  // Selecionando o elemento canvas
  let canvas = document.querySelector("#game-canvas");

  // Obter o contexto 2d
  let context = canvas.getContext("2d");
  context.imageSmoothingEnabled = false;

  let game = new Game({
    canvas: canvas
  });

  const f = 2.75,
        w = 256 * f,
        h = 176 * f;

  let bg = new BackgroundParallax(context);
  bg.addLayer("../assets/bg/sky.png", 0, w, h, 0, 0);

  let estados = {
    andando: {
      frames: 7,
      ticksFrame: 6,
      sw: 80,
      sh: 64,
      dx: 80,
      dy: canvas.height - 64 * 2,
      dw: 80 * 2,
      dh: 64 * 2,
      loop: true,
      imgSRC: "../assets/bipedal-unit.png",
      img: new Image(),
    },
  }

  context.translate(-100, 0);

  let personagem = new Sprite2d (context, estados);
  personagem.estadoAtual = estados.andando;
  personagem.update = () => {
    estados.andando.dx++;
  };

  game.start();

}
