
// TODO: inserir comentário de cabeçalho


// Selecionando o elemento canvas
const canvas = document.querySelector("#game-canvas");

// Obtain a context object
const context = canvas.getContext("2d");

// explosion_03_strip13.png

// Importar a imagem para a cena do canvas

// Criar um objeto de imagem
var img = new Image(),
    index = 0;
    sx = 192,
    sy = 0,
    sw = 192,
    sh = 193,
    dx = 0,
    dy = 0,
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
  // Apaga o que está dentro do canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.drawImage(img, sx * index, sy, sw, sh, dx, dy, dw, dh);

  // Calcular os frames por segundo da explosão

  index = (index + 3) % 3 == 0 < 13 ? ++index : 0;

  requestAnimationFrame(animar);
}

// Cada célula do Sprite Sheet
// 192px x 193px
