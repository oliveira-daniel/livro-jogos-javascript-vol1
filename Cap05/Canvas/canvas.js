
// Selecionando o elemento canvas
const canvas = document.querySelector("#game-canvas");

// Obtain a context object
const context = canvas.getContext("2d");

// Largura em pixels dentro do canvas
const tamanho = {
  largura: 150,
  altura: 100
}

// Posição do objeto dentro do canvas
const pos = {
  x: canvas.width  / 2 - tamanho.largura / 2,
  y: canvas.height / 2 - tamanho.altura  / 2
}

// Definir uma cor ao desenho
context.fillStyle = "#9999cc";

// Desenhar um retângulo
context.fillRect(pos.x, pos.y, tamanho.largura, tamanho.altura);