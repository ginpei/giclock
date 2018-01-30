export const state = () => {
  return {
    bgColor: '#000',
    fgColor: '#0f9',
    length: '25m',
    loaded: false,
    rotation: 'none',
  }
}

export const mutations = {
  setLength (state, length) {
    state.length = length
  },

  setLoaded (state, loaded) {
    state.loaded = loaded
  },

  setRotation (state, rotation) {
    state.rotation = rotation
  },
}

export const actions = {
  load ({ commit, dispatch }) {
    commit('setLoaded', false)
    try {
      const json = localStorage.getItem('giclock/preferences')
      const { length, rotation } = JSON.parse(json)
      commit('setLength', length)
      commit('setRotation', rotation)
    }
    catch (error) {
      // just ignore
    }

    commit('setLoaded', true)
  },

  save ({ state, commit }, { length, rotation }) {
    commit('setLength', length)
    commit('setRotation', rotation)

    const data = { length, rotation }
    const json = JSON.stringify(data)
    localStorage.setItem('giclock/preferences', json)
  },

  reset ({ commit, dispatch }) {
    const data = {
      length: '25m',
      rotation: 'none',
    }
    dispatch('save', data)
  },
}
