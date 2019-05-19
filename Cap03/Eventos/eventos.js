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
  start: function () {

    // Adicionar a escuta pela evento de tecla pressionada.
    addEventListener('keydown', event => {

      // Armazenar a tecla pressionada.
      var k = event.key;

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

  // Crie agora o método que detecta quando o usuário
  // solta a tecla pressionada.

}

window.addEventListener("load", () => {
  // Ativar os eventos de teclado
  keyboard.start();
});
