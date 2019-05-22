
// TODO: inserir comentário de cabeçalho


// Selecionando o elemento canvas
const canvas = document.querySelector("#game-canvas");

// Obtain a context object
const context = canvas.getContext("2d");

// explosion_03_strip13.png

// Importar a imagem para a cena do canvas

// Criar um objeto de imagem
var img = new Image(),
  frameIndex = 0,
  frames = 13,
  tickCount = 0
  ticksFrame = 3,
  loop = false;
  sx = 192,
  sy = 0,
  sw = 192,
  sh = 193,
  dx = canvas.width  / 2 - 192/2,
  dy = canvas.height / 2 - 192/2,
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
