
// TODO: inserir comentário de cabeçalho

// Elementos de opções
const loopCheckBox = document.querySelector("#loop");

// Quantidade de frames por tempo de execução
const framesText = document.querySelector("#frames");

// Selecionando o elemento canvas
const canvas = document.querySelector("#game-canvas");

// Obtain a context object
const context = canvas.getContext("2d");

// Criar um objeto de imagem
var img = new Image(),
  frameIndex = 0,
  frames = 13,
  tickCount = 0,
  sx = 192,
  sy = 0,
  sw = 192,
  sh = 193,
  dx = canvas.width / 2 - 192 / 2,
  dy = canvas.height / 2 - 193 / 2,
  dw = 192,
  dh = 193;

// Definir a origem dessa nova imagem
img.src = "assets/explosion_03_strip13.png";

// Executar a animação após carregá-la
img.onload = () => {
  // Desenhar a imagem cortada
  animar();
};

function animar() {

  requestAnimationFrame(animar);

  var loop = loopCheckBox.checked,
    ticksFrame = parseInt(framesText.value);

  // --- Update
  tickCount += 1;
  if (tickCount > ticksFrame) {

    tickCount = 0;

    // Calcular os frames por segundo da explosão
    if (frameIndex < frames - 1) {
      // Go to the next frame
      frameIndex += 1;
    } else if (loop) {
      frameIndex = 0;
    }

  }

  // --- Render
  // Apaga o que está dentro do canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, frameIndex * sx, sy, sw, sh, dx, dy, dw, dh);
}

// Cada célula do Sprite Sheet
// 192px x 193px
