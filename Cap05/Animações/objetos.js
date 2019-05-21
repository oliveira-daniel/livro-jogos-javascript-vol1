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

 var posX = 0;

 function animar() {
   context.clearRect(0, 0, canvas.width, canvas.height);

   context.drawImage(img, posX, 0, 110, 110);

   if (posX > canvas.width)
      posX = 0;
   else {
      posX += 1.5;
   }

   requestAnimationFrame(animar);
 }

 var img = new Image();
 img.src = "assets/enjoy-learn.png";
 img.onload = () => {
   animar();
 };

 // ---
