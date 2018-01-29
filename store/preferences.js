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

  setRotation (state, rotation) {
    state.rotation = rotation
  },

  loaded (state) {
    state.loaded = true
  },
}

export const actions = {
  load ({ commit, dispatch }) {
    try {
      const json = localStorage.getItem('giclock/preferences')
      const { length, rotation } = JSON.parse(json)
      commit('setLength', length)
      commit('setRotation', rotation)
    }
    catch (error) {
      // just ignore
    }

    commit('loaded')
  },

  save ({ state, commit }, { length, rotation }) {
    commit('setLength', length)
    commit('setRotation', rotation)

    const data = { length, rotation }
    const json = JSON.stringify(data)
    localStorage.setItem('giclock/preferences', json)
  },
}
