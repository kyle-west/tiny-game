const { stdout } = process

const bounds = {
  x: stdout.columns,
  y: stdout.rows,
}

function clear () {
  stdout.write('\033c')
  stdout.moveCursor(0, 1 - bounds.y)
}

function stamp(str, index, replacement) {
  if (!str) return
  return str.substring(0, index) + replacement + str.substring(index + replacement.length);
}

function apply (base, ...rest) {
  const lines = base.split('\n')
  rest.filter(Boolean).forEach(({ x, y, draw }) => {
    lines[y] = stamp(lines[y], x, draw)
  })
  return lines.join('\n')
}

function paint(str) {
  clear()
  stdout.write(str);
}

module.exports = {
  paint,
  bounds,
  apply
}