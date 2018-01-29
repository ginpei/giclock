export const state = () => {
  return {
    length: 0,
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
        return state.baseRemainingTime
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

  setLength (state, length) {
    state.length = length
  },

  setBaseRemainingTime (state, baseRemainingTime) {
    state.baseRemainingTime = baseRemainingTime
  },

  setCallback (state, id) {
    state.tmCallback = id
  },
}

export const actions = {
  load ({ commit, dispatch }) {
    try {
      const json = localStorage.getItem('giclock/pomodoro')
      const { startedAt, baseRemainingTime } = JSON.parse(json)
      const finishTime = startedAt + baseRemainingTime
      console.log(startedAt, baseRemainingTime, new Date(finishTime))
      if (startedAt && finishTime > Date.now()) {
        const remainingTime = finishTime - Date.now()
        commit('setBaseRemainingTime', remainingTime)
        return { running: true }
      }
    }
    catch (error) {
      // just ignore
    }
    return { running: false }
  },

  save ({ commit }, { startedAt, baseRemainingTime }) {
    const data = { startedAt, baseRemainingTime }
    const json = JSON.stringify(data)
    localStorage.setItem('giclock/pomodoro', json)
  },

  start ({ state, getters, commit, dispatch }, { now: _now, length, onComplete } = {}) {
    if (!length || typeof length !== 'number') {
      throw new Error('Length as number is required')
    }

    const now = _now || Date.now()

    // remove ms
    const diff = now % 1000
    const nowOnSec = now - diff
    commit('setStartedAt', nowOnSec)
    commit('setLength', length)

    const remainingTime = getters['getRemainingTime'](now)
    if (onComplete) {
      commit('setCallback', setTimeout(onComplete, remainingTime))
    }

    dispatch('save', { startedAt: nowOnSec, baseRemainingTime: remainingTime })
  },

  stop ({ state, getters, commit, dispatch }, { now: _now } = {}) {
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

    dispatch('save', { startedAt: 0, baseRemainingTime: 0 })
  },

  reset ({ commit }) {
    commit('setBaseRemainingTime', 0)
    commit('setStartedAt', 0)
    commit('setCallback', null)
  },
}
