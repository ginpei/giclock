const Vue = require('vue');
const Vuex = require('vuex');

Vue.use(Vuex);

module.exports = new Vuex.Store({
	modules: {
		time: {
			namespaced: true,

			state: {
			},

			getters: {
				xxx(state) {
					return state.xxx
				},
			},

			mutations: {
				XXX(state, payload) {
					state.xxx = payload
				},
			},

			actions: {
				xxx({ commit }, payload) {
					commit('XXX', payload)
				},
			},
		},
	},
});
