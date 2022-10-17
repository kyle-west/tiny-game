const { paint, bounds, apply } = require('./print');
const { div, physics, physicsWithBounds, keepInBounds } = require('./math');
const { addListener } = require('./keyboard');

const { fire, bullets, removeDeadBullets, clearAll: clearAllBullets } = require('./bullets');
const { addZombie, track, zombies, removeDeadZombies, killZombies, zombieStats, clearAll: clearAllZombies } = require('./zombie');
const { knife, throwKnife, holdKnife, stabFrom, placeKnife } = require('./knife');

const board = `╔${"═".repeat(bounds.x-2)}╗\n${`║${" ".repeat(bounds.x-2)}║\n`.repeat(bounds.y-3)}╚${"═".repeat(bounds.x-2)}╝`
let inGameMessage = 'WELCOME! Press the spacebar to begin.'

const player = {}
function resetPlayer() {
  return Object.assign(player, {
    x: div(bounds.x, 2),
    y: div(bounds.y, 2),
    draw: '👮', // `■`,
    facing: 'right',
    hasKnife: false,
    hasGun: false,
    dead: false,
  })
}
resetPlayer()

addListener((key) => {
  if (inGameMessage) {
    if (key === ' ') {
      inGameMessage = null
    }
    return
  }

  if (player.dead) {
    if (key === ' ') {
      resetPlayer()
      zombieStats.kills = 0;
      lastCount = 0;
      clearAllBullets()
      clearAllZombies()
      placeKnife()
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
    case "Enter": {
      if (player.hasKnife) {
        throwKnife(player)
        player.hasKnife = false;
      }
      break;
    }
    case ' ': {
      if (player.hasGun) {
        fire(player)
      } else if (player.hasKnife) {
        stabFrom(player)
      }
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

placeKnife()

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
    paint(apply(board, {...player, draw: '🧠🧟' }, message, stats))
    return
  }

  physics(...bullets)
  
  holdKnife(player)
  physicsWithBounds(knife)
  
  killZombies(player, bullets, knife)
  removeDeadBullets()
  removeDeadZombies()
  track(player)

  if (zombieStats.count === 0) {
    makeMoreZombies()
  }

  const inventory = [
    player.hasKnife && knife.draw,
  ].filter(Boolean).join(' ')

  const stats = {
    x: 2,
    y: 0,
    draw: ` Zombies: ${zombieStats.count} | Kills: ${zombieStats.kills}${inventory ? ` | Inventory: ${inventory}` : ''} `
  }
  const playerHasKnifeButIsNotUsingIt = player.hasKnife && knife.x === player.x && knife.y === player.y
  paint(apply(board, player, ...bullets, ...zombies, playerHasKnifeButIsNotUsingIt || knife, stats))
}

gameLoop()
setInterval(gameLoop, 100)