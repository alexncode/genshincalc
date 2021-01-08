import Vue from 'vue'
import Vuex from 'vuex'

import { getField, updateField } from 'vuex-map-fields';

import { stats } from "@/store/modules/stats.js"

import { getCharData } from "@/data/characters"
import { getWeaponData } from "@/data/weapons"
import { generateArtifacts } from "@/data/artifacts";
import { sets } from "@/data/sets";

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
    "Burst%": 0,
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
    character: getCharData("Keqing", 80, 5),
    set: [
      { pieces: "4pcs", set: ["Gladiator's Finale", "none"] },
      { pieces: "4pcs", set: ["Bloodstained Chivalry", "none"] },
    ],
    artifacts: [generateArtifacts("First"), generateArtifacts("Second")],
    weapon: {
      0: getWeaponData("The Black Sword"),
      1: getWeaponData("The Black Sword")
    },
    additionalStats: [[{ stat: "ATK%", value: 0, desc: "Description" }], [{ stat: "ATK%", value: 0, desc: "Description" }]]
  },
  getters: {
    getField,
    baseATK: (state) => {
      return Object.keys(state.weapon).map(
        (x) => state.weapon[x].baseATK + state.character.baseATK
      );
    },
    setsStats: (state) => {
      let res = state.set.map((x) => {
        let result = {};
        if (x.set[0] != "none") {
          result.a = sets[x.set[0]]["2pcs"]
          if (x.pieces == "4pcs") {
            result.b = sets[x.set[0]]["4pcs"]
          }
          if (x.pieces == "2pcs" && x.set[1] != "none") {
            result.b = sets[x.set[1]]["2pcs"];
          }
        }
        return result;
      });
      return res;
    },
    allStats: (state, getters) => {
      let allStatsRes = [generateResObject(), generateResObject()];
      let allEquip = [state.artifacts, getters.setsStats];
      for (const equip of allEquip) {
        equip.forEach((x, i) => {
          for (const key in x) {
            if (Object.prototype.hasOwnProperty.call(x[key], "name")) {
              let name = x[key].name;
              allStatsRes[i][name] =
                allStatsRes[i][name] + x[key].value || x[key].value;
            }
            if (Object.prototype.hasOwnProperty.call(x[key], "substats")) {
              x[key].substats.forEach((substat) => {
                let name = substat.name;
                allStatsRes[i][name] =
                  allStatsRes[i][name] + substat.value || substat.value;
              });
            }
          }
        });
      }
      state.additionalStats.forEach((side, i) => {
        side.forEach((stat) => {
          allStatsRes[i][stat.stat] =
            allStatsRes[i][stat.stat] + stat.value || stat.value;
        });
      });

      const ch = state.character;
      const wp = state.weapon;
      for (let i = 0; i < 2; i++) {
        allStatsRes[i][ch.name] =
          allStatsRes[i][ch.name] + ch.value || ch.value;
        if (ch.charName == "Xiao" && ch.talentsBonus[0].active) {
          allStatsRes[i]["NCATK%"] =
            allStatsRes[i]["NCATK%"] + ch.burst || ch.burst;
        }
        ch.talentsBonus
          .filter((x) => x.active)
          .forEach(
            (x) =>
            (allStatsRes[i][x.name] =
              allStatsRes[i][x.name] + x.value || x.value)
          );
        if (ch.constellationBonus) {
          ch.constellationBonus
            .filter((x) => x.active)
            .forEach(
              (x) =>
              (allStatsRes[i][x.name] =
                allStatsRes[i][x.name] + x.value || x.value)
            );
        }
        allStatsRes[i][wp[i].name] =
          allStatsRes[i][wp[i].name] + wp[i].value || wp[i].value;
        wp[i].additional
          .filter((x) => x.active)
          .forEach(
            (x) =>
            (allStatsRes[i][x.name] =
              allStatsRes[i][x.name] + x.value || x.value)
          );
      }
      if (ch.charName == "Mona" && ch.talentsBonus[0].active) {
        allStatsRes[0]["Elemental%"] =
          Math.round((allStatsRes[0]["EnRe%"] + 100) * 0.2 * 10) / 10;
        allStatsRes[1]["Elemental%"] =
          Math.round((allStatsRes[1]["EnRe%"] + 100) * 0.2 * 10) / 10;
      }
      return allStatsRes;
    }
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
