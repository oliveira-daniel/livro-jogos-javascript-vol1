// Construção do objeto que fará o controle
// das teclas pressionadas.
const keyboard = {

  // Propriedade contendo o Objeto de teclas válidas.
  validKeys: {
    ' ': 'disparar' , // espaço
    'w': 'cima'     ,
    'a': 'esquerda' ,
    's': 'baixo'    ,
    'd': 'direita'
  },

  // Método para iniciar a escuta por eventos de teclado.
  start: () => {

    // Adicionar a escuta pela evento de tecla pressionada.
    addEventListener('keydown', keyEvent => {

      // Armazenar a tecla pressionada.
      var k = keyEvent.key;

      // Verificar se foi uma tecla válida.
      if (keyboard.validKeys[k]) {

        // Mostrar no console a tecla for válida.
        console.log("Tecla válida", k, keyboard.validKeys[k]);

      } else {

        // Mostrar no console o erro de tecla for inválida.
        console.error("Tecla inválida", k);

      }

    });

  }

  // ### Desafio! ###
  // Crie agora o método que detecta quando o usuário
  // solta a tecla pressionada.

}

const mouse = {

  buttons: {
    "0": "Disparando torpedos!",
    "2": "Levantando escudos!"
  },

  start: () => {

    addEventListener("click", mouseEvent =>{

      let btn = mouseEvent.button,
          posMessage;

      // Verificar o botão do mouse pressionado
      if (mouse.buttons[btn]) {

        // Informar a posição da tela onde o mouse estava quando foi acionado
        posMessage = `Posição x=${mouseEvent.x}, y=${mouseEvent.y}`;

        console.log(mouse.buttons[btn], posMessage);

      } else {

        // Mostrar no console o erro de botão sem ação.
        console.error("Botão central sem ação programada!");

      }

    });
  }

}

window.addEventListener("load", () => {

  // Ativar os eventos de teclado
  keyboard.start();

  // Ativar os eventos de mouse
  mouse.start();

});
