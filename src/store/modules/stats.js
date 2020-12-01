import { createHelpers } from 'vuex-map-fields';

const { getStats, updateStats } = createHelpers({
  getterType: 'getStats',
  mutationType: 'updateStats',
});

export const stats = {
  state: {
    baseATK: 0,
    weaponBaseATK: 0
  },
  getters: {
    getStats
  },
  mutations: {
    updateStats
  },
  actions: {

  }
}