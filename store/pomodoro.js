export const state = () => {
  return {
    length: 25 * 60 * 1000,
    baseRemainingTime: 0,
    startedAt: 0,
    tmCallback: null
  }
}

export const getters = {
  working (state) {
    return state.startedAt !== 0
  },

  getRestTime (state) {
    return (now) => {
      if (typeof now !== 'number' || isNaN(now)) {
        throw new Error('Current time must be set as a number')
      }

      if (state.startedAt === 0) {
        return NaN
      }

      const restTime = state.startedAt + state.length - now
      return restTime
    }
  }
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
  }
}

export const actions = {
  start ({ state, commit }, { now: _now, onComplete } = {}) {
    const now = _now || Date.now()
    const diff = now % 1000
    const nowOnSec = now - diff // remove ms
    commit('setStartedAt', nowOnSec)

    const baseRemainingTime = state.length - diff
    commit('setBaseRemainingTime', baseRemainingTime)

    commit('setCallback', setTimeout(onComplete, baseRemainingTime))
  },

  stop ({ state, commit }) {
    commit('setStartedAt', 0)
    clearTimeout(state.tmCallback)
    commit('setCallback', null)
  }
}
