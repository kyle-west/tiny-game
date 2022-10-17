const CTRL_C = "\u0003"
const ESC = "\u001b"

const friendlyNames = {
  "\u001b[A": "ArrowUp",
  "\u001b[B": "ArrowDown",
  "\u001b[D": "ArrowLeft",
  "\u001b[C": "ArrowRight",
  "\r": "Enter",
  "\n": "Enter",
  "\r\n": "Enter",
}

const listeners = []

process.stdin.setRawMode(true);
process.stdin.on("data", (chunk) => {
  const char = chunk.toString()
  // console.log(JSON.stringify(char))
  if (char === ESC || char === CTRL_C || char === 'q') {
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