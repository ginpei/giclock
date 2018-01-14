export const state = () => {
  return {
    length: 25 * 60 * 1000,
    restTime: 0,
    startedAt: 0
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
  }
}

export const actions = {
  start ({ commit }, { now: _now } = {}) {
    const now = _now || Date.now()
    const nowOnSec = now - now % 1000 // remove ms
    commit('setStartedAt', nowOnSec)
  },

  stop ({ commit }) {
    commit('setStartedAt', 0)
  }
}
