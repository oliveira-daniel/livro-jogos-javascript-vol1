
class Sprite {

  constructor(defs) {

    console.log("Iniciando sprite");

    this.tickCount  = 0;
    this.frameIndex = defs.frameIndex;
    this.frames     = defs.frames;
    this.ticksFrame = defs.ticksFrame;
    this.sx = defs.sx;
    this.sy = defs.sy;
    this.sw = defs.sw;
    this.sh = defs.sh;
    this.dx = defs.dx;
    this.dy = defs.dy;
    this.dw = defs.dw;
    this.canvas = defs.canvas;
    this.ctx2d  = defs.ctx2d;
    this.loop   = defs.loop;

    this.img = new Image();
    this.img.src = defs.imgSrc;

    console.log(this);

    // console.log(this.ctx2d);

    // Executar a animação após carregá-la
    this.img.onload = () => {
      console.log("Imagem carregada!");
      // Desenhar a imagem cortada
      this.animar();
    };
  }

  animar() {

    console.log("Animando!");

    // requestAnimationFrame(() => {this.animar();});

    // var loop = loopCheckBox.checked,
    // this.ticksFrame = parseInt(framesText.value);

    // --- Update
    this.tickCount += 1;
    if (this.tickCount > this.ticksFrame) {

      this.tickCount = 0;

      // Calcular os frames por segundo da explosão
      if (this.frameIndex < this.frames - 1) {
        // Go to the next frame
        this.frameIndex += 1;
      } else if (this.loop) {
        this.rameIndex = 0;
      }

    }

    // --- Render
    // Apaga o que está dentro do canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(this.img, this.frameIndex * this.sx, this.sy,
      this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
  }

}

// Selecionando o elemento canvas
let canvas = document.querySelector("#game-canvas");

// Obtain a context object
let context = canvas.getContext("2d");

let imgArray = [
  "../assets/Skeleton Walk.png",
  "../assets/Skeleton Attack.png",
];

let imgWx = [
  22, 43
];

let imgWy = [
  33, 37
];

var index = 0;

let _defs = {
  frameIndex: 0,
  frames: 13,
  ticksFrame: 4,
  imgSrc: imgArray[index],
  canvas: canvas,
  ctx2d: canvas.getContext("2d"),
  sx: imgWx[index],
  sy: 0,
  sw: imgWx[index],
  sh: 37,
  dx: canvas.width / 2 - imgWx[index] / 2 * 4,
  dy: canvas.height / 2 - imgWx[index] / 2 * 4,
  dw: imgWx[index] * 4,
  dh: 37 * 4,
  loop: true,
  tickCount: 0,
}

_defs.img = new Image();
_defs.img.src = _defs.imgSrc;

_defs.img.onload = () => {
  _defs.ctx2d.imageSmoothingEnabled = false;
  // animar();
}

function animar() {

  requestAnimationFrame(animar);

  // --- Update
  _defs.tickCount += 1;

  if (_defs.tickCount > _defs.ticksFrame) {

    _defs.tickCount = 0;

    // Calcular os frames por segundo da explosão
    if (_defs.frameIndex < _defs.frames - 1) {
      // Go to the next frame
      _defs.frameIndex += 1;
    } else if (_defs.loop) {
      _defs.frameIndex = 0;
    }

  }

  // --- Render
  // Apaga o que está dentro do canvas
  _defs.ctx2d.clearRect(0, 0, _defs.canvas.width, _defs.canvas.height);
  _defs.ctx2d.drawImage(_defs.img, _defs.frameIndex * _defs.sx, _defs.sy,
    _defs.sw, _defs.sh, _defs.dx, _defs.dy, _defs.dw, _defs.dh);
}

// new Sprite(_defs);
class GameObject {
  constructor () {
    Game.addGameObj(this);
  }
}

class Sprite2d extends GameObject {

  constructor (ctx2d, img) {
    super();
    this.ctx = ctx2d;
    this.img = img;

    this._defs = {
      frameIndex: 0,
      frames: 13,
      ticksFrame: 4,
      sx: 43,
      sy: 0,
      sw: 43,
      sh: 37,
      dx: canvas.width / 2 - 43 / 2 * 4,
      dy: canvas.height / 2 - 43 / 2 * 4,
      dw: 43 * 4,
      dh: 37 * 4,
      loop: true,
      tickCount: 0,
    }
  }

  draw () {
    // this.ctx.fillStyle = "#FF0000";
    // this.ctx.drawImage(this.img, 0, 0);

    // --- Update
    this._defs.tickCount += 1;

    if (this._defs.tickCount > this._defs.ticksFrame) {

      this._defs.tickCount = 0;

      // Calcular os frames por segundo da explosão
      if (this._defs.frameIndex < this._defs.frames - 1) {
        // Go to the next frame
        this._defs.frameIndex += 1;
      } else if (_defs.loop) {
        this._defs.frameIndex = 0;
      }

    }

    _defs.ctx2d.drawImage(this.img, this._defs.frameIndex * this._defs.sx, this._defs.sy,
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

  let imgCaveira = new Image();
  imgCaveira.src = "../assets/Skeleton Attack.png";

  imgCaveira.onload = () => {
    let caveira = new Sprite2d(context, imgCaveira);

    game.start();
  }



  //console.log(Game.gameObjects);

  // game.start();
}
