/*
 * Atividades de exercício com o elemento canvas e javascript
 * Daniel de Oliveira
 * Desenvolvimento de Jogos com JavaScript
 */

 // Selecionando o elemento canvas
 const canvas = document.querySelector("#game-canvas");

 // Obtain a context object
 const context = canvas.getContext("2d");

 // --- Desenhando formas ---

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

 // ---

 // --- Desenhando linhas ---

   // Posiciona  oinício da linha em (x, y)
   context.moveTo(pos.x, pos.y);

   // Desenhar a linha
   context.lineTo(pos.x + tamanho.largura, pos.y + tamanho.altura);

   // Posiciona  oinício da linha em (x, y)
   context.moveTo(pos.x, pos.y + tamanho.altura);

   // Desenhar a linha
   context.lineTo(pos.x + tamanho.largura, pos.y);

   // Desenha a(s) linha(s) ou um caminho
   context.stroke();

 // ---

 // --- Exibindo Texto ---

   const mensagem = {
     font: "20px Arial",
     cor: "",
     texto: "Enjoy & Learn"
   }

   context.font = mensagem.font;
   context.fillStyle = "#9999cc";
   context.fillText(mensagem.texto, pos.x, pos.y - 10);

 // ---

 // --- Exibindo imagens ---

    // TODO: Melhorar esta parte...

    var img = new Image();
    img.src = "https://cdn.glitch.com/ad7c6b5e-e383-4f8f-8570-9b1c06487137%2Fenjoy-learn.png?1558314934967";
    img.onload = () => {
      context.drawImage(img, canvas.width/2-55, 235, 110, 110);
    };

 // ---
