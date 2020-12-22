import Vue from 'vue'
import Vuex from 'vuex'

import { getField, updateField } from 'vuex-map-fields';

import { stats } from "@/store/modules/stats.js"

import { getCharData } from "@/data/characters"
import { getWeaponData } from "@/data/weapons"

Vue.use(Vuex)

function generateResObject() {
  return {
    "HP%": 0,
    "ATK%": 0,
    "DEF%": 0,
    EM: 0,
    HP: 0,
    FlatDEF: 0,
    FlatATK: 0,
    "CRate%": 0,
    "CDmg%": 0,
    "Healing%": 0,
    "Elemental%": 0,
    "Physical%": 0,
    "EnRe%": 0,
    "Charged%": 0,
    "NormalATK%": 0,
    "NCATK%": 0,
    "SkillDMG%": 0,
    "AllDMG%": 0,
    Melt: 0,
    Vaporize: 0,
    Overload: 0,
    Superconduct: 0,
    "Electro-charged": 0,
    Swirl: 0,
    Shattered: 0,
  };
}

export default new Vuex.Store({
  state: {
    elementalDamage: false,
    allDamage: {},
    allElemental: {},
    allStats: [generateResObject(), generateResObject()],
    character: getCharData("Keqing", 80, 5),
    set: [
      { pieces: "4pcs", set: ["Gladiator's Finale", "none"] },
      { pieces: "4pcs", set: ["Bloodstained Chivalry", "none"] },
    ],
    weapon: {
      0: getWeaponData("The Black Sword"),
      1: getWeaponData("The Black Sword")
    },
    additionalStats: [[{ stat: "ATK%", value: 0, desc: "Description" }], [{ stat: "ATK%", value: 0, desc: "Description" }]]
  },
  getters: {
    getField,
  },
  mutations: {
    SET_ALL_DAMAGE(state, val) {
      state.allDamage = val
    },
    SET_ALL_ELEMENTAL(state, val) {
      state.allElemental = val
    },
    SET_ALL_STATS(state, val) {
      state.allStats = val
    },
    updateField
  },
  actions: {
  },
  modules: {
    stats
  }
})
