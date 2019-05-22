




// Selecionando o elemento canvas
const canvas = document.querySelector("#game-canvas");

// Obtain a context object
const context = canvas.getContext("2d");

// Criar um objeto de imagem
var img = new Image(),
  imgW = 64,
  imgH = 64,
  qtdTiles = 6;

// Definir a origem dessa nova imagem
img.src = "assets/bg.png";

// Executar a animação após carregá-la
img.onload = () => {
  // Desenhas vários "blocos" de imagens
  for (var i = 0; i < qtdTiles; i++) {
    for (var j = 0; j < qtdTiles; j++) {
      // Desenhar a imagem
      context.drawImage(img, i * imgW, j * imgH, imgW, imgH);
    }
  }
};
