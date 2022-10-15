const { paint, bounds, apply } = require('./print');
const { div, physics, keepInBounds } = require('./math');
const { addListener } = require('./keyboard');

const { fire, bullets, removeDeadBullets } = require('./bullets');

const board = `╔${"═".repeat(bounds.x-2)}╗\n${`║${" ".repeat(bounds.x-2)}║\n`.repeat(bounds.y-3)}╚${"═".repeat(bounds.x-2)}╝`

const player = {
  x: div(bounds.x, 2),
  y: div(bounds.y, 2),
  draw: `■`,
  facing: 'right'
}

addListener((key) => {
  switch(key) {
    case 'ArrowUp': {
      player.y = player.y - 1
      player.facing = 'up'
      break;
    }
    case 'ArrowDown': {
      player.y = player.y + 1 
      player.facing = 'down'
      break;
    }
    case 'ArrowLeft': {
      player.x = player.x - 1 
      player.facing = 'left'
      break;
    }
    case 'ArrowRight': {
      player.x = player.x + 1 
      player.facing = 'right'
      break;
    }
    case ' ': {
      fire(player)
      break;
    }
  }
  keepInBounds(player)
})

function gameLoop () {
  physics(...bullets)
  removeDeadBullets()
  paint(apply(board, player, ...bullets))
}

gameLoop()
setInterval(gameLoop, 100)