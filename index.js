const { paint, bounds, apply } = require('./print');
const { div, physics, keepInBounds, clamp } = require('./math');
const { addListener } = require('./keyboard');

const { fire, bullets, removeDeadBullets, clearAll: clearAllBullets } = require('./bullets');
const { addZombie, track, zombies, removeDeadZombies, killZombies, zombieStats, clearAll: clearAllZombies } = require('./zombie');

const board = `╔${"═".repeat(bounds.x-2)}╗\n${`║${" ".repeat(bounds.x-2)}║\n`.repeat(bounds.y-3)}╚${"═".repeat(bounds.x-2)}╝`
let inGameMessage = 'WELCOME! Press the spacebar to begin.'
const player = {
  x: div(bounds.x, 2),
  y: div(bounds.y, 2),
  draw: `■`,
  facing: 'right'
}

addListener((key) => {
  if (inGameMessage) {
    if (key === ' ') {
      inGameMessage = null
    }
    return
  }

  if (player.dead) {
    if (key === ' ') {
      Object.assign(player, {
        x: div(bounds.x, 2),
        y: div(bounds.y, 2),
        dead: false
      })
      zombieStats.kills = 0;
      lastCount = 0;
      clearAllBullets()
      clearAllZombies()
    }
    return
  }

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

let lastCount = 0

function makeMoreZombies() {
  lastCount = lastCount + 1
  for (let i = 0; i < lastCount; i++) {
    const x = Math.floor(Math.random() * i * 2)
    const y = Math.floor(Math.random() * i * 2)
    addZombie(keepInBounds({ x: Math.random() > 0.5 ? x : bounds.x - x, y: Math.random() > 0.5 ? y : bounds.y - y }))
  }
}

function gameLoop () {
  if (inGameMessage) {
    paint(apply(board, {
      x: div(bounds.x, 2) - Math.floor(inGameMessage.length / 2), y: div(bounds.y, 2) - 1, draw: inGameMessage
    }))
    return
  }

  if (player.dead) {
    const stats = { x: 2, y: 0, draw: ` Zombies: ${zombieStats.count} | Kills: ${zombieStats.kills} `}
    const message = { x: div(bounds.x, 2) - 5, y: div(bounds.y, 2) - 1, draw: `GAME OVER`}
    paint(apply(board, {...player, draw: '%Z' }, message, stats))
    return
  }

  physics(...bullets)
  
  killZombies(bullets)
  removeDeadBullets()
  removeDeadZombies()
  
  track(player)

  if (zombieStats.count === 0) {
    makeMoreZombies()
  }

  const stats = { x: 2, y: 0, draw: ` Zombies: ${zombieStats.count} | Kills: ${zombieStats.kills} `}
  paint(apply(board, player, ...bullets, ...zombies, stats))
}

gameLoop()
setInterval(gameLoop, 100)