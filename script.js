const keyboard = {
  
  validKeys: {
    ' ': 'shoot', //space
    'w': 'up'   ,
    'a': 'left' ,
    's': 'down' ,
    'd': 'right',
  },
  
  start: function () {
    
    console.log("Aguardando comandos de teclados...");
    
    addEventListener('keydown', event => {
      
      // Armazenar a tecla pressionada
      var k = event.key;
      
      // Verificar se foi uma tecla válida
      if (keyboard.validKeys[k]) {
        
        console.log("Tecla válida", k);
        
      }
      
    });
    
  }
  
}



keyboard.start();