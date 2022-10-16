const { keepInBounds } = require('./math');
const { bounds } = require('./print');

const speed = 2;
const knife = (() => {
  const x = Math.floor(Math.random() * 2)
  const y = Math.floor(Math.random() * 2)
  return keepInBounds({
    x: Math.random() > 0.5 ? x : bounds.x - x,
    y: Math.random() > 0.5 ? y : bounds.y - y,
    draw: '🗡️',
    dx: 0,
    dy: 0,
  })
})()

function throwKnife({ facing }) {
  switch(facing) {
    case 'up': {
      knife.dy = -speed
      break;
    }
    case 'down': {
      knife.dy = speed
      break;
    }
    case 'left': {
      knife.dx = -speed
      break;
    }
    case 'right': {
      knife.dx = speed
      break;
    }
  }
}

module.exports = {
  knife,
  throwKnife,
}