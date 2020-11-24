import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    elementalDamage: false,
    allDamage: {}
  },
  mutations: {
    SET_ELEMENTAL_DAMAGE(state, val) {
      state.elementalDamage = val
    },
    SET_ALL_DAMAGE(state, val) {
      state.allDamage = val
    }
  },
  actions: {
  },
  modules: {
  }
})
