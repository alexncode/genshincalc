<template>
  <div class="mt-4">
    <div class="flex mb-1 border-b-2 border-gray-800 pb-1">
      <label
        for="normal"
        class="mr-2 border-r-2 border-gray-900"
      >Normal% <input
          type="text"
          id="normal"
          v-model.number="character.normal"
          class="text-gray-900 w-14 mx-2"
        ></label>

      <label
        for="charged"
        class="mr-2 border-r-2 border-gray-900"
      >Charged%<input
          type="text"
          id="charged"
          v-model.number="character.charged"
          class="text-gray-900 w-14 mx-2 "
        ></label>
      <label
        for="skill"
        class="mr-2 border-r-2 border-gray-900"
      >Skill%<input
          type="text"
          id="skill"
          v-model.number="character.skill"
          class="text-gray-900 w-14 mx-2 "
        ></label>
      <label for="burst">Burst%<input
          type="text"
          id="burst"
          v-model.number="character.burst"
          class="text-gray-900 w-14 mx-2 "
        ></label>
    </div>
    <div class="flex mb-1 border-b-2 border-gray-800 pb-1">
      <label
        for="mob"
        class="mr-2 border-r-2 border-gray-900"
      >
        Enemy
        <select
          name="mob"
          id="mob"
          v-model="mob"
          class="text-gray-900 mx-2"
        >
          <option
            v-for="(val, key) in enemies"
            :key="key"
            :value="key"
          >{{ key }}</option>
        </select>
      </label>
      <label
        for="enemyLevel"
        class="border-r-2 border-gray-900"
      >Enemy level<input
          type="text"
          id="enemyLevel"
          v-model.number="enemyLevel"
          class="text-gray-900 w-10 mx-2"
        ></label>
      <div
        class="text-gray-200 bg-blue-500 rounded px-2 hover:bg-blue-600 cursor-pointer ml-2"
        @click="showBuffs = true"
      >
        Buffs & Debuffs
      </div>
    </div>
    <div class="flex">
      <div class="mr-2 border border-gray-500 text-gray-200 rounded px-1">
        <label for="physical">Physical</label>
        <input
          type="radio"
          id="physical"
          v-model="damageType"
          value="Physical%"
          class="text-gray-900 mx-2"
        >
        <label
          for="elemental"
          :class="elementColor"
        >Elemental</label>
        <input
          type="radio"
          id="elemental"
          v-model="damageType"
          value="Elemental%"
          class="text-gray-900 mx-2"
        >
      </div>
      <div
        class="border rounded px-1 border-gray-500"
        title="Type of attack"
      >
        <label class="text-gray-200">
          Normal & Charged
          <input
            type="radio"
            id="Normal"
            value="Normal"
            v-model="attackType"
            class="ml-2"
          ></label>
        <label :class="elementColor">
          Skill & Burst
          <input
            type="radio"
            id="Skill"
            value="Skill"
            v-model="attackType"
            class="ml-2"
          ></label>
        <label class="text-yellow-500">
          All
          <input
            type="radio"
            id="All"
            value="All"
            v-model="attackType"
            class="ml-2"
          ></label>
      </div>

    </div>
    <div hidden>{{allElemental}}</div>
    <table class="table-auto w-full mt-2 text-gray-300 leading-none bg-gray-900">
      <thead>
        <tr>
          <th class="border px-2 py-2 w-1/5">Attack type</th>
          <th class="border px-2 py-2 w-2/5">First set</th>
          <th class="border px-2 py-2 w-2/5">Second set</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="name in resultsShown"
          :key="name"
          class="bg-gray-800 even:bg-gray-900"
        >
          <td class="border border-gray-600 px-1 py-1">
            {{ name }}
          </td>
          <td class="border border-gray-600 px-1 py-1 text-center">
            {{ allDamage[name][0] }}
          </td>
          <td
            class="border border-gray-600 px-1 py-1 text-center"
            :class="damageClass(allDamage[name])"
          >
            {{ allDamage[name][1] }}<sup> {{ damagePercent(allDamage[name]) }}%</sup>
          </td>
        </tr>
      </tbody>
    </table>
    <div @click="showBuffs = false">
      <Modal v-if="showBuffs">
        <Buffs @visibility="showBuffs = false" />
      </Modal>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal";
import Buffs from "@/components/modal/Buffs";

import { mapFields } from "vuex-map-fields";
import { mapGetters } from "vuex";

export default {
  name: "Damage",
  components: {
    Modal,
    Buffs,
  },
  data() {
    return {
      level: 80,
      enemyLevel: 80,
      damageType: "Physical%",
      attackType: "Normal",
      showBuffs: false,
      enemies: {
        Hilichurls: { phys: 10, elem: 10 },
        Slimes: { phys: 10, elem: 10 },
        Mitachurl: { phys: 30, elem: 10 },
        Samachurl: { phys: 10, elem: 10 },
        "Ruin Guard": { phys: 70, elem: 10 },
        "Abyss Mage": { phys: 10, elem: 10 },
        Fatui: { phys: -20, elem: 10 },
        "Treasure Hunter": { phys: -20, elem: 10 },
        "Stonehide Lawachurl": { phys: 50, elem: 10 },
        "Ruin Hunter": { phys: 50, elem: 10 },
        Cryowhopper: { phys: 35, elem: 35 },
        "Cicin mage": { phys: -20, elem: 40 },
      },
      mob: "Hilichurls",
    };
  },
  computed: {
    ...mapFields(["character", "buffs"]),
    ...mapGetters(["allStats", "allResults", "atkPower"]),
    def() {
      let bonus = this.buffs.RES;
      let res = this.enemies[this.mob].phys - bonus;
      if (res < 0) {
        res = res / 2;
      }
      if (res >= 75) {
        res = (1 / 4) * res + 100;
      }
      return 1 - res / 100;
    },
    elemDef() {
      let bonus = this.buffs.ERES;
      let res = this.enemies[this.mob].elem - bonus;
      if (res < 0) {
        res = res / 2;
      }
      return 1 - res / 100;
    },
    levelNerf() {
      const lvl = parseInt(this.character.charLvl);
      const nw =
        (lvl + 100) /
        Math.abs(
          (1 - this.buffs.DEF / 100) * (lvl + 100 + this.enemyLevel + 100)
        );
      return nw;
    },
    modific() {
      return this.allStats.map((side) => {
        return side[this.damageType];
      });
    },
    elemMod() {
      return this.allStats.map((side) => {
        return side["Elemental%"];
      });
    },
    defMod() {
      return this.damageType == "Elemental%" ? this.elemDef : this.def;
    },
    attackPowFood() {
      if (this.buffs.flatATK > 0)
        return this.atkPower.map((x) => x + this.buffs.flatATK);
      return this.atkPower;
    },
    normalHit() {
      return this.calcHit(this.modific, ["NormalATK%", "AllDMG%", "NCATK%"]);
    },
    chargedHit() {
      return this.calcHit(this.modific, ["Charged%", "AllDMG%", "NCATK%"]);
    },
    normalHitElem() {
      return this.calcHit(this.elemMod, ["NormalATK%", "AllDMG%", "NCATK%"]);
    },
    chargedHitElem() {
      return this.calcHit(this.elemMod, ["Charged%", "AllDMG%", "NCATK%"]);
    },
    skillHit() {
      return this.allStats.map((side, i) => {
        let atk = this.attackPowFood[i];
        if (this.character.charName == "Albedo") {
          atk = this.allResults[11][i];
        }
        return (
          atk *
          (1 + (side["Elemental%"] + side["AllDMG%"] + side["SkillDMG%"]) / 100)
        );
      });
    },
    burstHit() {
      return this.calcHit(this.elemMod, ["AllDMG%", "Burst%"]);
    },
    additionalBurst() {
      const res = [];
      if (
        this.character.charName == "Zhongli" &&
        this.character.talentsBonus[0].active
      ) {
        this.allStats.forEach((x, i) => {
          const vals = {
            def: this.elemDef,
            cDmg: x["CDmg%"],
            cRate: x["CRate%"],
          };
          const hit = this.calcHitHP(0.33, this.elemMod, ["AllDMG%", "Burst%"]);
          res.push({
            normal: this.calcNormal(100, hit[i], vals),
            critical: this.calcCritical(100, hit[i], vals),
            average: this.calcAverage(100, hit[i], vals),
          });
        });
      }
      return res;
    },
    additionalNormal() {
      const res = [];
      if (
        this.character.charName == "Zhongli" &&
        this.character.talentsBonus[0].active
      ) {
        this.allStats.forEach((x, i) => {
          const vals = {
            def: this.defMod,
            cDmg: x["CDmg%"],
            cRate: x["CRate%"],
          };
          const hit = this.calcHitHP(0.0139, this.modific, [
            "AllDMG%",
            "NormalATK%",
            "NCATK%",
          ]);
          res.push({
            normal: this.calcNormal(100, hit[i], vals),
            critical: this.calcCritical(100, hit[i], vals),
            average: this.calcAverage(100, hit[i], vals),
          });
        });
      }
      return res;
    },
    additionalSkill() {
      const res = [];
      if (
        this.character.charName == "Zhongli" &&
        this.character.talentsBonus[0].active
      ) {
        this.allStats.forEach((x, i) => {
          const vals = {
            def: this.defMod,
            cDmg: x["CDmg%"],
            cRate: x["CRate%"],
          };
          const hit = this.calcHitHP(0.019, this.modific, [
            "AllDMG%",
            "SkillDMG%",
          ]);
          res.push({
            normal: this.calcNormal(100, hit[i], vals),
            critical: this.calcCritical(100, hit[i], vals),
            average: this.calcAverage(100, hit[i], vals),
          });
        });
      }
      return res;
    },
    allDamage() {
      let result = {
        "Normal hit": [0, 0],
        "Normal critical": [0, 0],
        "Normal average": [0, 0],
        "Charged hit": [0, 0],
        "Charged critical": [0, 0],
        "Charged average": [0, 0],
        "Skill hit": [0, 0],
        "Skill critical": [0, 0],
        "Skill average": [0, 0],
        "Burst hit": [0, 0],
        "Burst critical": [0, 0],
        "Burst average": [0, 0],
      };
      for (let i = 0; i < this.allStats.length; i++) {
        const n = this.character.normal,
          c = this.character.charged,
          s = this.character.skill,
          b = this.character.burst,
          normHit = this.normalHit[i],
          charHit = this.chargedHit[i],
          skillHit = this.skillHit[i],
          burstHit = this.burstHit[i];
        const vals = {
          def: this.defMod,
          cDmg: this.allStats[i]["CDmg%"],
          cRate: this.allStats[i]["CRate%"] + this.buffs.CRate,
        };
        const el = { ...vals, def: this.elemDef };
        result["Normal hit"][i] = this.calcNormal(n, normHit, vals);
        result["Normal critical"][i] = this.calcCritical(n, normHit, vals);
        result["Normal average"][i] = this.calcAverage(n, normHit, vals);
        result["Charged hit"][i] = this.calcNormal(c, charHit, vals);
        result["Charged critical"][i] = this.calcCritical(c, charHit, vals);
        result["Charged average"][i] = this.calcAverage(c, charHit, vals);
        result["Skill hit"][i] = this.calcNormal(s, skillHit, el);
        result["Skill critical"][i] = this.calcCritical(s, skillHit, el);
        result["Skill average"][i] = this.calcAverage(s, skillHit, el);
        result["Burst hit"][i] = this.calcNormal(b, burstHit, el);
        result["Burst critical"][i] = this.calcCritical(b, burstHit, el);
        result["Burst average"][i] = this.calcAverage(b, burstHit, el);
        if (this.additionalBurst[i]) {
          result["Burst hit"][i] += this.additionalBurst[i].normal;
          result["Burst critical"][i] += this.additionalBurst[i].critical;
          result["Burst average"][i] += this.additionalBurst[i].average;
        }
        if (this.additionalNormal[i]) {
          result["Normal hit"][i] += this.additionalNormal[i].normal;
          result["Normal critical"][i] += this.additionalNormal[i].critical;
          result["Normal average"][i] += this.additionalNormal[i].average;
          result["Charged hit"][i] += this.additionalNormal[i].normal;
          result["Charged critical"][i] += this.additionalNormal[i].critical;
          result["Charged average"][i] += this.additionalNormal[i].average;
        }
        if (this.additionalSkill[i]) {
          result["Skill hit"][i] += this.additionalSkill[i].normal;
          result["Skill critical"][i] += this.additionalSkill[i].critical;
          result["Skill average"][i] += this.additionalSkill[i].average;
        }
      }

      return result;
    },
    allElemental() {
      let result = {
        "Normal hit": [0, 0],
        "Normal critical": [0, 0],
        "Normal average": [0, 0],
        "Charged hit": [0, 0],
        "Charged critical": [0, 0],
        "Charged average": [0, 0],
        "Skill hit": this.allDamage["Skill hit"],
        "Skill critical": this.allDamage["Skill critical"],
        "Skill average": this.allDamage["Skill average"],
        "Burst hit": this.allDamage["Burst hit"],
        "Burst critical": this.allDamage["Burst critical"],
        "Burst average": this.allDamage["Burst average"],
      };
      for (let i = 0; i < this.allStats.length; i++) {
        const n = this.character.normal,
          c = this.character.charged,
          normHit = this.normalHitElem[i],
          charHit = this.chargedHitElem[i];
        const vals = {
          def: this.elemDef,
          cDmg: this.allStats[i]["CDmg%"],
          cRate: this.allStats[i]["CRate%"] + this.buffs.CRate,
        };
        result["Normal hit"][i] = this.calcNormal(n, normHit, vals);
        result["Normal critical"][i] = this.calcCritical(n, normHit, vals);
        result["Normal average"][i] = this.calcAverage(n, normHit, vals);
        result["Charged hit"][i] = this.calcNormal(c, charHit, vals);
        result["Charged critical"][i] = this.calcCritical(c, charHit, vals);
        result["Charged average"][i] = this.calcAverage(c, charHit, vals);
      }
      this.$store.commit("SET_ALL_ELEMENTAL", result);
      return result;
    },
    elementColor() {
      const colors = {
        Water: "text-blue-500",
        Fire: "text-red-500",
        Electro: "text-purple-500",
        Anemo: "text-green-400",
        Ice: "text-blue-200",
        Geo: "text-yellow-400",
      };
      return colors[this.character.element];
    },
    resultsShown() {
      if (this.attackType == "Normal") {
        return Object.keys(this.allDamage).slice(0, 6);
      }
      if (this.attackType == "Skill") {
        return Object.keys(this.allDamage).slice(6, 12);
      }
      return Object.keys(this.allDamage);
    },
  },
  methods: {
    damageClass(dmg) {
      let cs = "";
      if (dmg[0] > dmg[1]) cs = "text-red-400";
      if (dmg[0] < dmg[1]) cs = "text-green-400";
      return cs;
    },
    damagePercent(dmg) {
      return (((dmg[1] - dmg[0]) / Math.abs(dmg[0])) * 100).toFixed(1);
    },
    calcHit(mods, bonuses) {
      return this.allStats.map(
        (side, i) =>
          this.attackPowFood[i] *
          (1 + (mods[i] + bonuses.reduce((a, b) => a + side[b], 0)) / 100)
      );
    },
    calcHitHP(percent, mods, bonuses) {
      return this.allStats.map((side, i) => {
        const hp = this.allResults[this.allResults.length - 1][i];
        return (
          hp *
          percent *
          (1 + (mods[i] + bonuses.reduce((a, b) => a + side[b], 0)) / 100)
        );
      });
    },
    calcNormal(mod, hit, { def }) {
      return Math.round(hit * (mod / 100) * this.levelNerf * def);
    },
    calcCritical(mod, hit, { def, cDmg }) {
      return Math.round(
        hit * (1 + (50 + cDmg) / 100) * (mod / 100) * this.levelNerf * def
      );
    },
    calcAverage(mod, hit, { def, cDmg, cRate }) {
      return Math.round(
        hit *
          (1 + ((50 + cDmg) / 100) * ((5 + cRate) / 100)) *
          (mod / 100) *
          this.levelNerf *
          def
      );
    },
  },
};
</script>

<style>
</style>