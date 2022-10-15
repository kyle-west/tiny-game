const { normalize, between } = require('./math');

const zombies = []
const speed = 1;
const stats = { kills: 0, count: 0 };

const draw = "Z"

function track(target) {
  const { x, y } = target
  zombies.forEach((zombie) => {
    const step = Math.random() > 0.5 ? 'x' : 'y'
    if (step === 'x' && zombie.x !== x) {
      zombie.x = zombie.x + normalize(x - zombie.x) * speed
    }
    if (step === 'y' && zombie.y !== y) {
      zombie.y = zombie.y + normalize(y - zombie.y)
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