const { bounds } = require('./print');

function clamp (min, value, max) {
  return Math.min(Math.max(value, min), max)
}

function div (value, divisor) {
  if (divisor === 0) return 0
  return Math.round(value / divisor)
}

function physics (...items) {
  items.forEach(item => {
    const { dx = 0, dy = 0 } = item
    item.x = item.x + dx 
    item.y = item.y + dy 
  });
}

function normalize (value) {
  if (value > 0) return 1
  if (value < 0) return -1;
  return 0;
}

function keepInBounds(item) {
  item.x = clamp(1, item.x, bounds.x - 2)
  item.y = clamp(1, item.y, bounds.y - 3)
  return item
}

// this needs to work regardless of if v1 and v2 are in any particular order
function between (v1, target, v2) {
  const sorted = [v1, target, v2].sort()
  return sorted[1] === target
}

module.exports = {
  clamp,
  div,
  physics,
  keepInBounds,
  normalize,
  between,
}