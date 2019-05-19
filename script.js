const keyboard = {
  
  validKeys: {
    ' ': 'shoot', //space
    'w': 'up'   ,
    'a': 'left' ,
    's': 'down' ,
    'd': 'right',
  },
  
  start: function () {
       
    addEventListener('keydown', event => {
      
      // Armazenar a tecla pressionada
      var k = event.key;
      
      // Verificar se foi uma tecla válida
      if (keyboard.validKeys[k]) {
        
        // Mostrar no console a tecla for válida
        console.log("Tecla válida", k, keyboard.validKeys[k]);
        
      } else {
        
        // Mostrar no console o erro de tecla for inválida
        console.error("Tecla inválida", k);
        
      }
      
    });
    
  }
  
}

window.addEventListener("load", () => {
  // Ativar os eventos de teclado
  keyboard.start();
});