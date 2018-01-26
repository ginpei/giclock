export const state = () => {
  return {
    length: 25 * 60 * 1000,
    baseRemainingTime: 0,
    startedAt: 0,
    tmCallback: null,
  }
}

export const getters = {
  working (state) {
    return state.startedAt !== 0
  },

  getRemainingTime (state) {
    return (now) => {
      if (typeof now !== 'number' || isNaN(now)) {
        console.error(`getRemainingTime: ${now}`)
        throw new Error('Current time must be set as a number')
      }

      if (state.startedAt === 0) {
        return NaN
      }

      const finishTime = state.startedAt + (state.baseRemainingTime || state.length)
      const remainingTime = finishTime - now
      return remainingTime
    }
  },
}

export const mutations = {
  setStartedAt (state, startedAt) {
    if (typeof startedAt !== 'number' || isNaN(startedAt)) {
      throw new Error('The time must be set as a number')
    }

    state.startedAt = startedAt
  },

  setBaseRemainingTime (state, baseRemainingTime) {
    state.baseRemainingTime = baseRemainingTime
  },

  setCallback (state, id) {
    state.tmCallback = id
  },
}

export const actions = {
  start ({ state, getters, commit }, { now: _now, onComplete } = {}) {
    const now = _now || Date.now()

    // remove ms
    const diff = now % 1000
    const nowOnSec = now - diff
    commit('setStartedAt', nowOnSec)

    if (onComplete) {
      const remainingTime = getters['getRemainingTime'](now)
      commit('setCallback', setTimeout(onComplete, remainingTime))
    }
  },

  stop ({ state, getters, commit }, { now: _now } = {}) {
    const now = _now || Date.now()

    // remember current status
    const remainingTime = getters['getRemainingTime'](now)
    if (remainingTime > 0) {
      commit('setBaseRemainingTime', remainingTime)
    }
    else {
      commit('setBaseRemainingTime', 0)
    }

    commit('setStartedAt', 0)
    clearTimeout(state.tmCallback)
    commit('setCallback', null)
  },
}
