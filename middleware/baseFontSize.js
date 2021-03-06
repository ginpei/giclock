/**
 * Set base font size to 1/100 for some direction.
 * A rect which size is 100 x 50 rem or 50 x 100 rem
 * should be able to be contained inside document.
 */

const listeners = {
  change: new Set(),
}

export function calculateFontSize ({ width, height }) {
  const length = height > width ? Math.min(width, height / 2) : Math.min(width / 2, height)
  const size = length / 50
  return size
}

function update () {
  const el = document.createElement('div')
  el.setAttribute('style', `
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    visibility: visible;
    width: 100%;
  `)
  document.body.appendChild(el)
  const width = el.clientWidth - 2 // decrease for margin around the content
  const height = el.clientHeight - 2
  document.body.removeChild(el)

  const size = calculateFontSize({ width, height })
  document.documentElement.style.fontSize = `${size}px`

  listeners.change.forEach(f => f(size))
}

let baseFontSize
export default baseFontSize = {
  on (eventType, listener) {
    if (!listeners[eventType]) {
      listeners[eventType] = new Set()
    }
    listeners[eventType].add(listener)
  },

  off (eventType, listener) {
    if (listeners[eventType]) {
      listeners[eventType].delete(listener)
    }
  },

  dispatch (eventType, ...options) {
    if (listeners[eventType]) {
      listeners[eventType].forEach(f => f(...options))
    }
  },

  activate () {
    update()
    window.addEventListener('resize', update)
  },

  deactivate () {
    window.removeEventListener('resize', update)
  },

  reset () {
    baseFontSize.deactivate()
    listeners.length = 0
  },
}
