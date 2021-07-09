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
    additionalStats: [
      [{ stat: "ATK%", value: 0, desc: "Description" }],
      [{ stat: "ATK%", value: 0, desc: "Description" }]
    ],
    buffs: {
      flatATK: 0,
      DEF: 0,
      CRate: 0,
      RES: 0,
      ERES: 0,
    }
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
    allStatsBefore: (state, getters) => {
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
      return allStatsRes;
    },
    allStats: (state, getters) => {
      let all = getters.allStatsBefore
      const ch = state.character;

      for (let i = 0; i < 2; i++) {
        if (ch.charName == "Mona" && ch.talentsBonus[0].active) {
          let bonus = Math.round((all[i]["EnRe%"] + 100) * 0.2 * 10) / 10;
          all[i]["Elemental%"] = all[i]["Elemental%"] + bonus || bonus
        }
        if (ch.charName == "Xiao" && ch.talentsBonus[0].active) {
          all[i]["NCATK%"] =
            all[i]["NCATK%"] + ch.burst || ch.burst;
        }
        if (ch.charName == "Noelle") {
          const defence = ch.baseDEF * (1 + all[i]["DEF%"] / 100) + all[i]["FlatDEF"]
          if (ch.talentsBonus[0].active) {
            const burstBonus = [40, 43, 46, 50, 53, 56, 60, 64, 68, 72, 76, 80, 85, 90, 95]
            const bonus = defence * (burstBonus[ch.talentLvl - 1] / 100)
            all[i]["FlatATK"] += bonus
          }
          if (ch.constellationBonus[1].active) {
            const bonus = defence * 0.5
            all[i]["FlatATK"] += bonus
          }
        }
        if (ch.charName == "Hutao" && ch.talentsBonus[0].active) {
          const hp = Math.round(ch.baseHP * (1 + all[i]["HP%"] / 100) + all[i]["HP"])
          const skillBonus = [3.84, 4.07, 4.3, 4.6, 4.83, 5.06, 5.36, 5.66, 5.96, 6.26, 6.56, 6.85, 7.15, 7.45, 7.75]
          let bonus = hp * (skillBonus[ch.talentLvl - 1] / 100)
          if (bonus > getters.baseATK * 4) {
            bonus = getters.baseATK * 4
          }
          all[i]["FlatATK"] += bonus
        }
        //Weapons effects
        if (state.weapon[i].additional[1]?.name == "ATKByHP" && state.weapon[i].additional[1]?.active) {
          const hp = Math.round(ch.baseHP * (1 + all[i]["HP%"] / 100) + all[i]["HP"])
          const bonus = hp * (state.weapon[i].additional[1].value / 100)
          all[i]["FlatATK"] += bonus
        }
      }
      return all
    },
    atkPower: (state, getters) => {
      return getters.allStats.map((x, i) => {
        return Math.round(
          getters.baseATK[i] * (1 + x["ATK%"] / 100) + x["FlatATK"]
        );
      });
    },
    critDmg: (state, getters) => {
      return getters.allStats.map((x) => {
        return ((50 + x["CDmg%"]) / 100) * ((5 + x["CRate%"]) / 100);
      });
    },
    physAtk: (state, getters) => {
      return getters.allStats.map((x, i) => {
        let phys =
          getters.atkPower[i] * (1 + (x["Physical%"] + x["AllDMG%"]) / 100);
        return Math.round(phys + phys * getters.critDmg[i]);
      });
    },
    normalAtk: (state, getters) => {
      return getters.allStats.map((x, i) => {
        let phys =
          getters.atkPower[i] *
          (1 +
            (Math.max(x["Physical%"], x["Elemental%"]) +
              x["NormalATK%"] +
              x["AllDMG%"] +
              x["NCATK%"]) /
            100);
        return Math.round(phys + phys * getters.critDmg[i]);
      });
    },
    chargedAtk: (state, getters) => {
      return getters.allStats.map((x, i) => {
        let phys =
          getters.atkPower[i] *
          (1 +
            (Math.max(x["Physical%"], x["Elemental%"]) +
              x["Charged%"] +
              x["AllDMG%"] +
              x["NCATK%"]) /
            100);
        return Math.round(phys + phys * getters.critDmg[i]);
      });
    },
    elemAtk: (state, getters) => {
      return getters.allStats.map((x, i) => {
        let elem =
          getters.atkPower[i] * (1 + (x["Elemental%"] + x["AllDMG%"]) / 100);
        return Math.round(elem + elem * getters.critDmg[i]);
      });
    },
    allResults: (state, getters) => {
      const critChance = getters.allStats.map(
        (x) => Math.round((x["CRate%"] + 5) * 10) / 10
      );
      const critDamage = getters.allStats.map(
        (x) => Math.round((x["CDmg%"] + 50) * 10) / 10
      );
      const elem = getters.allStats.map((x) => x["Elemental%"]);
      const phys = getters.allStats.map((x) => x["Physical%"]);
      const EM = getters.allStats.map((x) => x["EM"]);
      const EnRe = getters.allStats.map((x) => Math.round(x["EnRe%"] * 10) / 10 + 100);
      const DEF = getters.allStats.map((x) =>
        Math.round(
          state.character.baseDEF * (1 + x["DEF%"] / 100) + x["FlatDEF"]
        )
      );
      const HP = getters.allStats.map((x) =>
        Math.round(state.character.baseHP * (1 + x["HP%"] / 100) + x["HP"])
      );

      return [
        getters.atkPower,
        getters.physAtk,
        getters.elemAtk,
        getters.normalAtk,
        getters.chargedAtk,
        critChance, //5
        critDamage,
        elem,
        phys,
        EM,
        EnRe,
        DEF,
        HP, //12
      ];
    },
    allResultsFormatted: (state, getters) => {
      return getters.allResults.map((x) => {
        let cs = "";
        if (x[0] < x[1]) {
          cs = "text-green-400";
        }
        if (x[0] > x[1]) {
          cs = "text-red-400";
        }
        return {
          class: cs,
          value: x,
          percent: cs ? (((x[1] - x[0]) / Math.abs(x[0])) * 100).toFixed(1) : 0,
        };
      });
    },
  },
  mutations: {
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
