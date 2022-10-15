const { addListener } = require('./keyboard');
const { paint, bounds, apply } = require('./print');

const board = `╔${"═".repeat(bounds.x-2)}╗\n${`║${" ".repeat(bounds.x-2)}║\n`.repeat(bounds.y-3)}╚${"═".repeat(bounds.x-2)}╝`

const player = {
  x: 10,
  y: 4,
  draw: `■`,
  facing: 'right'
}

addListener((key) => {
  switch(key) {
    case 'ArrowUp': {
      player.y = player.y - 1 
      break;
    }
    case 'ArrowDown': {
      player.y = player.y + 1 
      break;
    }
    case 'ArrowLeft': {
      player.x = player.x - 1 
      break;
    }
    case 'ArrowRight': {
      player.x = player.x + 1 
      break;
    }
  }
})

function gameLoop () {
  paint(apply(board, player))
}

gameLoop()
setInterval(gameLoop, 100)