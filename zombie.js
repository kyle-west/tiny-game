const { normalize, between } = require('./math');

const zombies = []
const speed = 1;
const stats = { kills: 0, count: 0 };

const draw = "🧟"

function taken(x, y) {
  return Boolean(zombies.find(z => (z.x === x && z.y === y)))
}

function track(target) {
  const { x, y } = target
  zombies.forEach((zombie) => {
    let step = Math.random() > 0.5 ? 'x' : 'y'
    if (step === 'y' && zombie.y !== y) {
      const newY = zombie.y + normalize(y - zombie.y)
      if (!taken(x, newY)) {
        zombie.y = newY
      } else {
        step = 'x'
      }
    }
    if (step === 'x' && zombie.x !== x) {
      const newX = zombie.x + normalize(x - zombie.x) * speed
      if (!taken(newX, y)) {
        zombie.x = newX
      }
    }
    if (zombie.x === x && zombie.y === y) {
      target.dead = true
    }
  })
}

function removeDeadZombies() {
  zombies.forEach((bullet, idx) => {
    if (bullet.dead) {
      zombies.splice(idx, 1)
    }
  })
  stats.count = zombies.length
}

function addZombie({ x, y }) {
  zombies.push({ x, y, draw })
}

function killZombies(bullets) {
  zombies.forEach((zombie) => {
    bullets.forEach((bullet) => {
      if (
          !bullet.dead
          && between(bullet.x - (bullet.dx/2), zombie.x, bullet.x + (bullet.dx/2))
          && between(bullet.y - (bullet.dy/2), zombie.y, bullet.y + (bullet.dy/2))
        ) {
        zombie.dead = true
        bullet.dead = true
        stats.kills = stats.kills + 1
      }
    })
  })
}

function clearAll () {
  zombies.forEach(zombie => zombie.dead = true)
}

module.exports = {
  zombies,
  removeDeadZombies,
  addZombie,
  killZombies,
  track,
  zombieStats: stats,
  clearAll,
}