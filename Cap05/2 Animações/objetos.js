/*
 * Atividades de exercício com o elemento canvas e animações em javascript
 * Daniel de Oliveira
 * Desenvolvimento de Jogos com JavaScript
 */

// Selecionando o elemento canvas
const canvas = document.querySelector("#game-canvas");

// Obtain a context object
const context = canvas.getContext("2d");

// --- Animando objetos ---

// Armazenar a posição inicial do objeto
var posX = 0,
  posY = canvas.height / 2 - 55;

// Método responsável pela animação
function animar() {
  // Apaga o que está dentro do canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Insere a imagem no canvas
  context.drawImage(img, posX, posY, 87, 105.9);

  // Ajusta a posição:
  // Enquanto não chegar ao final da tela, executar a animação.
  // Voltar ao início caso contrário.
  if (posX > canvas.width - 110) {
    posX = 0;
  } else {
    posX += 1.5;
  }

  // Executar os quadros de animação
  requestAnimationFrame(animar);
}

// Importar a imagem para a cena do canvas

// Criar um objeto de imagem
var img = new Image();

// Definir a origem dessa nova imagem
img.src = "assets/ice-cream-van.png";

// Executar a animação após carregá-la
img.onload = () => {
  // Chamar o método que executará a animação
  animar();
};

 // ---
