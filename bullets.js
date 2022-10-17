const { bounds } = require('./print');

function outOfBounds(item) {
  return (item.x > (bounds.x - 2) || item.x < 1) || (item.y > (bounds.y - 3) || item.y < 1) 
}

const bullets = []
const speed = 2;
const MAX_BULLETS = 3;

const draw = "·"

function fire({ x, y, facing }) {
  if (bullets.filter(({ dead }) => !dead).length >= MAX_BULLETS) return

  switch(facing) {
    case 'up': {
      bullets.push({ x, y, dx: 0, dy: -speed, draw })
      break;
    }
    case 'down': {
      bullets.push({ x, y, dx: 0, dy: speed, draw })
      break;
    }
    case 'left': {
      bullets.push({ x, y, dx: -speed, dy: 0, draw })
      break;
    }
    case 'right': {
      bullets.push({ x, y, dx: speed, dy: 0, draw })
      break;
    }
  }
}

function removeDeadBullets() {
  bullets.forEach((bullet, idx) => {
    if (outOfBounds(bullet) || bullet.dead) {
      bullets.splice(idx, 1)
    }
  })
}

function clearAll () {
  bullets.forEach(bullet => bullet.dead = true)
}

module.exports = {
  bullets,
  fire,
  removeDeadBullets,
  clearAll,
}