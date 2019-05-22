
// TODO: Explicar o porque do let...
let currentLevel;

// Mapa 6 x 6
const mapLevel = `000000
000110
000000
010000
002000
002200`;

var imgW = 64,
    imgH = 64;

// TODO: Explicar melhor e redefinir as nomeclaturas...
function parseLevel(lvl) {
  const toRows = lvl.split("\n");
  const toColumns = toRows.map(r => r.split(""));
  return toColumns;
}

function draw() {
  for (let row = 0; row < currentLevel.length; row++) {
    for (let col = 0; col < currentLevel[0].length; col++) {

      let imgBg = new Image();
      let tile  = new Image();

      imgBg.src = "assets/bg.png";

      if (currentLevel[row][col] === "1") {
        tile.src = "assets/greenery.png";
      }

      if (currentLevel[row][col] === "2") {
        tile.src = "assets/stones.png";
      }

      imgBg.onload = () => {
        context.drawImage(imgBg, col * imgH, row * imgW, imgW, imgH);
      }

      tile.onload = () => {
        context.drawImage(tile, col * imgH, row * imgW, imgW, imgH);
      }

    }
  }
}

// Selecionando o elemento canvas
const canvas = document.querySelector("#game-canvas");

// Obtain a context object
const context = canvas.getContext("2d");

window.onload = () => {
  currentLevel = parseLevel(mapLevel);
  draw();
  console.log("Level loaded!");
}
