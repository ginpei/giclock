export const state = () => {
  return {
    bgColor: '#000',
    fgColor: '#0f9',
    length: '25m',
    loaded: false,
    notifyWhenFinish: true,
    ringWhenStart: true,
    rotation: 'none',
    soundName: 'chime',
  }
}

export const mutations = {
  setLength (state, length) {
    state.length = length
  },

  setLoaded (state, loaded) {
    state.loaded = loaded
  },

  setNotifyWhenFinish (state, bNotify) {
    state.notifyWhenFinish = bNotify
  },

  setRingWhenStart (state, bRing) {
    state.ringWhenStart = bRing
  },

  setRotation (state, rotation) {
    state.rotation = rotation
  },

  setSoundName (state, soundName) {
    state.soundName = soundName
  },
}

export const actions = {
  load ({ commit, dispatch }) {
    commit('setLoaded', false)
    try {
      const json = localStorage.getItem('giclock/preferences')
      const preferences = JSON.parse(json)

      const {
        length,
        notifyWhenFinish,
        ringWhenStart,
        rotation,
        soundName,
      } = preferences

      commit('setLength', length)
      commit('setNotifyWhenFinish', notifyWhenFinish)
      commit('setRingWhenStart', ringWhenStart)
      commit('setRotation', rotation)
      commit('setSoundName', soundName)
    }
    catch (error) {
      // just ignore
    }

    commit('setLoaded', true)
  },

  save ({ state, commit }, preferences) {
    const {
      length,
      notifyWhenFinish,
      ringWhenStart,
      rotation,
      soundName,
    } = preferences
    const data = {
      length,
      notifyWhenFinish,
      ringWhenStart,
      rotation,
      soundName,
    }

    commit('setLength', length)
    commit('setNotifyWhenFinish', notifyWhenFinish)
    commit('setRingWhenStart', ringWhenStart)
    commit('setRotation', rotation)
    commit('setSoundName', soundName)

    const json = JSON.stringify(data)
    localStorage.setItem('giclock/preferences', json)
  },

  reset ({ commit, dispatch }) {
    const data = {
      length: '25m',
      notifyWhenFinish: true,
      ringWhenStart: true,
      rotation: 'none',
      soundName: 'schoolChime',
    }
    dispatch('save', data)
  },
}
