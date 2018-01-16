/**
 * Set base font size to 1/100 for some direction.
 * A rect which size is 100 x 50 rem or 50 x 100 rem
 * should be able to be contained inside document.
 */

if (process.BROWSER_BUILD) {
  console.log('# ok?')
}

const listeners = {
  change: new Set()
}

function update () {
  const el = document.scrollingElement
  const w = el.clientWidth
  const h = el.clientHeight
  const length = h > w ? Math.min(w, h / 2) : Math.min(w / 2, h)

  // affects rem unit
  const size = length / 50
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
    window.addEventListener('resize', update)
  },

  deactivate () {
    window.removeEventListener('resize', update)
  },

  reset () {
    baseFontSize.deactivate()
    listeners.length = 0
  }
}
