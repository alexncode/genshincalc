<template>
  <div class="mt-4">
    <div class="flex mb-1 border-b-2 border-gray-800 pb-1">
      <label
        for="normal"
        class="mr-2 border-r-2 border-gray-900"
      >Normal% <input
        id="normal"
        v-model.number="character.normal"
        type="text"
        class="text-gray-900 w-14 mx-2"
      ></label>

      <label
        for="charged"
        class="mr-2 border-r-2 border-gray-900"
      >Charged%<input
        id="charged"
        v-model.number="character.charged"
        type="text"
        class="text-gray-900 w-14 mx-2 "
      ></label>
      <label
        for="skill"
        class="mr-2 border-r-2 border-gray-900"
      >Skill%<input
        id="skill"
        v-model.number="character.skill"
        type="text"
        class="text-gray-900 w-14 mx-2 "
      ></label>
      <label for="burst">Burst%<input
        id="burst"
        v-model.number="character.burst"
        type="text"
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
          id="mob"
          v-model="mob"
          name="mob"
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
        id="enemyLevel"
        v-model.number="enemyLevel"
        type="text"
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
          id="physical"
          v-model="damageType"
          type="radio"
          value="Physical%"
          class="text-gray-900 mx-2"
        >
        <label
          for="elemental"
          :class="elementColor"
        >Elemental</label>
        <input
          id="elemental"
          v-model="damageType"
          type="radio"
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
            id="Normal"
            v-model="attackType"
            type="radio"
            value="Normal"
            class="ml-2"
          ></label>
        <label :class="elementColor">
          Skill & Burst
          <input
            id="Skill"
            v-model="attackType"
            type="radio"
            value="Skill"
            class="ml-2"
          ></label>
        <label class="text-yellow-500">
          All
          <input
            id="All"
            v-model="attackType"
            type="radio"
            value="All"
            class="ml-2"
          ></label>
      </div>
    </div>
    <div hidden>
      {{ allElemental }}
    </div>
    <table class="table-auto w-full mt-2 text-gray-300 leading-none bg-gray-900">
      <thead>
        <tr>
          <th class="border px-2 py-2 w-1/5">
            Attack type
          </th>
          <th class="border px-2 py-2 w-2/5">
            First set
          </th>
          <th class="border px-2 py-2 w-2/5">
            Second set
          </th>
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
    ...mapFields(["character", "buffs", "weapon"]),
    ...mapGetters(["allStats", "allResults", "atkPower", "critDmg"]),
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
    physMod() {
      return this.allStats.map((side) => {
        return side["Physical%"];
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
          atk = this.allResults[13][i];
        }
        return (
          atk *
          (1 + (side["Elemental%"] + side["AllDMG%"] + side["SkillDMG%"]) / 100)
        );
      });
    },
    burstHit() {
      let mod = this.elemMod
      if (["Xinyan", "Eula"].includes(this.character.charName)) mod = this.physMod
      return this.calcHit(mod, ["AllDMG%", "Burst%"]);
    },
    additionalBurst() {
      let res = [0,0];
      if (this.character.charName == "Zhongli" && this.character.talentsBonus[0].active) {
        res = this.calcAdditional(0.33, ["AllDMG%", "Burst%"], "elemental")
      }
      return res;
    },
    additionalNormal() {
      let res = [0,0];
      if (this.weapon[0].weaponName == "Everlasting Moonglow" || this.weapon[1].weaponName == "Everlasting Moonglow") {
        res = this.calcAdditional(0, ["AllDMG%", "NormalATK%", "NCATK%"])
      }
      if (this.character.charName == "Zhongli" && this.character.talentsBonus[0].active) {
        res = this.calcAdditional(0.0139, ["AllDMG%", "NormalATK%", "NCATK%"])
      }
      if (this.character.charName == "Kokomi"  && this.character.talentsBonus[0].active) {
        const normB = [4.84, 5.2, 5.57, 6.05, 6.41, 6.78, 7.26, 7.74, 8.23, 8.71, 9.2, 9.68, 10.29, 10.89, 11.5]
        res = this.calcAdditional(normB[this.character.talentLvl - 1] / 100, ["AllDMG%", "NormalATK%", "NCATK%"], null, "Normal")
      }
      return res;
    },
    additionalCharged() {
      let res = [0,0];
      if (this.character.charName == "Zhongli" && this.character.talentsBonus[0].active) {
        res = this.calcAdditional(0.0139, ["AllDMG%", "Charged%", "NCATK%"])
      }
      if (this.character.charName == "Kokomi" && this.character.talentsBonus[1].active) {
        const charB = [6.78, 7.28, 7.79, 8.47, 8.98, 9.49, 10.16, 10.84, 11.52, 12.2, 12.87, 13.55, 14.4, 15.25, 16.09]
        res = this.calcAdditional(charB[this.character.talentLvl - 1] / 100, ["AllDMG%", "Charged%", "NCATK%"], null, "Charged")
      }
      return res;
    },
    additionalSkill() {
      let res = [0,0];
      if (this.character.charName == "Zhongli" && this.character.talentsBonus[0].active) {
        res = this.calcAdditional(0.019, ["AllDMG%", "SkillDMG%"], "elemental")
      }
      if (this.character.charName == "Kokomi" && this.character.talentsBonus[1].active) {
        const charB = [6.78, 7.28, 7.79, 8.47, 8.98, 9.49, 10.16, 10.84, 11.52, 12.2, 12.87, 13.55, 14.4, 15.25, 16.09]
        res = this.calcAdditional(charB[this.character.talentLvl - 1] / 100, ["AllDMG%", "Charged%", "NCATK%"])
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
        result["Normal hit"][i] = this.calcNormal(n, normHit, vals) + (this.additionalNormal[i].normal || 0);
        result["Normal critical"][i] = this.calcCritical(n, normHit, vals) + (this.additionalNormal[i].critical || 0);
        result["Normal average"][i] = this.calcAverage(n, normHit, vals) + (this.additionalNormal[i].average || 0);
        result["Charged hit"][i] = this.calcNormal(c, charHit, vals) + (this.additionalCharged[i].normal || 0);
        result["Charged critical"][i] = this.calcCritical(c, charHit, vals) + (this.additionalCharged[i].critical || 0);
        result["Charged average"][i] = this.calcAverage(c, charHit, vals) + (this.additionalCharged[i].average || 0);
        result["Skill hit"][i] = this.calcNormal(s, skillHit, el) + (this.additionalSkill[i].normal || 0);
        result["Skill critical"][i] = this.calcCritical(s, skillHit, el) + (this.additionalSkill[i].critical || 0);
        result["Skill average"][i] = this.calcAverage(s, skillHit, el) + (this.additionalSkill[i].average || 0);
        result["Burst hit"][i] = this.calcNormal(b, burstHit, el) + (this.additionalBurst[i].normal || 0);
        result["Burst critical"][i] = this.calcCritical(b, burstHit, el) + (this.additionalBurst[i].critical || 0);
        result["Burst average"][i] = this.calcAverage(b, burstHit, el) + (this.additionalBurst[i].average || 0);
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
        const hp = this.allResults[14][i];
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
    calcAdditional(hpPer, mods, type, damageType) {
      const r = []
      let def = this.defMod
      let mod = this.modific
      if (type == "elemental") {
        def = this.elemDef
        mod = this.elemMod
      }
      this.allStats.forEach((x, i) => {
        const vals = {
          def: def,
          cDmg: x["CDmg%"],
          cRate: x["CRate%"],
        };

        let bonus = 0
        if (this.character.charName == "Kokomi"  && this.character.talentsBonus[1].active 
            && ["Normal", "Charged"].includes(damageType)) {
          bonus = x["Healing%"] * 0.15 / 100
          console.log("Bonus from heal");
        }
        console.log(damageType);
        
        if (this.allStats[i]["NormalByHP"]) {
          bonus += this.allStats[i]["NormalByHP"] / 100
        }
        
        const hit = this.calcHitHP(hpPer + bonus, mod, mods);
        r.push({
          normal: this.calcNormal(100, hit[i], vals),
          critical: this.calcCritical(100, hit[i], vals),
          average: this.calcAverage(100, hit[i], vals),
        });
      });
      return r
    }
  },
};
</script>
