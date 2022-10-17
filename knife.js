const { keepInBounds, between, distance } = require('./math');
const { bounds } = require('./print');

const speed = 2;
const knife = keepInBounds({
  x: Math.floor(Math.random() * bounds.x),
  y: Math.floor(Math.random() * bounds.y),
  draw: '🗡️',
  dx: 0,
  dy: 0,
})

function throwKnife(player) {
  const { x, y, facing } = player
  Object.assign(knife, { x, y })

  switch(facing) {
    case 'up': {
      knife.dy = -speed
      knife.dx = 0
      break;
    }
    case 'down': {
      knife.dy = speed
      knife.dx = 0
      break;
    }
    case 'left': {
      knife.dx = -speed
      knife.dy = 0
      break;
    }
    case 'right': {
      knife.dx = speed
      knife.dy = 0
      break;
    }
  }
}

function pickupKnife(player) {
  const inMotion = (knife.dy || knife.dx)
  if (!inMotion && player.y === knife.y && between(knife.x - 1, player.x, knife.x + 1)) {
    player.hasKnife = true
  }
}

module.exports = {
  knife,
  throwKnife,
  pickupKnife,
}