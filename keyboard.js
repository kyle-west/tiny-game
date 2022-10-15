const CTRL_C = "\u0003"
const ESC = "\u001b"

const friendlyNames = {
  "\u001b[A": "ArrowUp",
  "\u001b[B": "ArrowDown",
  "\u001b[D": "ArrowLeft",
  "\u001b[C": "ArrowRight",
}

const listeners = []

process.stdin.setRawMode(true);
process.stdin.on("data", (chunk) => {
  const char = chunk.toString()
  if (char === ESC || char === CTRL_C) {
    process.exit(0);
  }
  const name = friendlyNames[char] || char
  listeners.forEach(handler => handler(name))
})

function addListener(handler) {
  listeners.push(handler)
}

module.exports = {
  addListener,
}