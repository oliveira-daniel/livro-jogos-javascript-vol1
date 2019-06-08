
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

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.render();
  }

}

class BackgroundParallax {

  constructor (ctx2d) {
    this.layers = new Array();
    this.ctx = ctx2d;
    Game.addGameObj(this);
  }

  addLayer(newLayer, delta, w, h, x, y) {
    let img = new Image();
    img.src = newLayer;
    this.layers.push({img: img, x: x, y: y, w: w, h: h, delta: delta});
  }

  draw () {
    this.layers.forEach(layer => {
      this.ctx.drawImage(layer.img, layer.x + layer.w-1, layer.y, layer.w, layer.h);
      this.ctx.drawImage(layer.img, layer.x, layer.y, layer.w, layer.h);
      if (layer.x >= -layer.w) {
        layer.x -= layer.delta;
      } else {
        layer.x += layer.w-2;
      }
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

  const f = 2.78,
        w = 384 * f,
        h = 216 * f;

  let bg = new BackgroundParallax(context);
  bg.addLayer("../assets/bg/plx-1.png", 0, w, h, 0, 0);
  bg.addLayer("../assets/bg/plx-2.png", .5, w, h, 0, 0);
  bg.addLayer("../assets/bg/plx-3.png", .7, w, h, 0, 0);
  bg.addLayer("../assets/bg/plx-4.png", .9, w, h, 0, 0);
  bg.addLayer("../assets/bg/plx-5.png", 1.2, w, h, 0, 0);
  bg.addLayer("../assets/bg/bottom.png", 1.5, 160 * f, 32 * f, 0, canvas.height - 32 * f);

  game.start();

}
