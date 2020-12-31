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
        for="level"
        class="mr-2 border-r-2 border-gray-900"
      >Your level<input
          type="text"
          id="level"
          v-model.number="level"
          class="text-gray-900 w-10 mx-2"
        ></label>
      <label
        for="enemyLevel"
        class="mr-2 border-r-2 border-gray-900"
      >Enemy level<input
          type="text"
          id="enemyLevel"
          v-model.number="enemyLevel"
          class="text-gray-900 w-10 mx-2"
        ></label>
      <label
        for="mob"
        class="mr-2"
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
    </div>
    <div>
      <label
        for="elemental"
        class="mr-2 border-r-2 border-gray-900"
      >Elemental damage?<input
          type="checkbox"
          id="elemental"
          v-model="elementalDamage"
          class="text-gray-900 mx-2"
        ></label>
      <label
        for="superc"
        class="border-r-2 border-gray-900 mr-2"
      >Superconduct?<input
          type="checkbox"
          id="superc"
          v-model="superc"
          class="text-gray-900 mx-2"
        ></label>
      <label for="food">Adeptus' Temptation?<input
          type="checkbox"
          id="food"
          v-model="food"
          class="text-gray-900 mx-2"
        ></label>
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
          v-for="(damage, name) in allDamage"
          :key="name + damage"
          class="bg-gray-800 even:bg-gray-900"
        >
          <td class="border border-gray-600 px-1 py-1">
            {{ name }}
          </td>
          <td class="border border-gray-600 px-1 py-1 text-center">
            {{ damage[0] }}
          </td>
          <td
            class="border border-gray-600 px-1 py-1 text-center"
            :class="damageClass(damage)"
          >
            {{ damage[1] }}<sup> {{ damagePercent(damage) }}%</sup>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  name: "Damage",
  props: {
    sumAllStats: Array,
    atkPower: Array,
    allResults: Array,
  },
  data() {
    return {
      // normal: 59.6,
      // charged: 237,
      // skill: 235,
      // burst: 679.8,
      level: 80,
      enemyLevel: 80,
      superc: false,
      food: false,
      enemies: {
        Hilichurls: { phys: 10, elem: 10 },
        Slimes: { phys: 10, elem: 10 },
        Mitachurl: { phys: 30, elem: 10 },
        Samachurl: { phys: 10, elem: 10 },
        "Ruin Guard": { phys: 70, elem: 10 },
        "Abyss Mage": { phys: 10, elem: 10 },
        Fatui: { phys: -10, elem: 10 },
        "Treasure Hunter": { phys: -10, elem: 10 },
        "Stonehide Lawachurl": { phys: 50, elem: 10 },
        "Ruin Hunter": { phys: 50, elem: 10 },
        Cryowhopper: { phys: 35, elem: 35 },
        "Cicin mage": { phys: -10, elem: 10 },
      },
      mob: "Hilichurls",
    };
  },
  computed: {
    ...mapFields(["elementalDamage", "character"]),
    def() {
      let superc = 0;
      if (this.superc) {
        if (this.enemies[this.mob].phys < 0) {
          superc = 20;
        }
        if (this.enemies[this.mob].phys > 40) {
          superc = 40;
        }
        if (
          this.enemies[this.mob].phys < 40 &&
          this.enemies[this.mob].phys > 0
        ) {
          superc = (40 - this.enemies[this.mob].phys) / 2;
        }
      }
      return 1 - (this.enemies[this.mob].phys - superc) / 100;
    },
    elemDef() {
      return 1 - this.enemies[this.mob].elem / 100;
    },
    levelNerf() {
      return (100 + this.level) / (100 + this.level + 100 + this.enemyLevel);
    },
    modific() {
      return this.sumAllStats.map((side) => {
        return this.elementalDamage ? side["Elemental%"] : side["Physical%"];
      });
    },
    defMod() {
      return this.elementalDamage ? this.elemDef : this.def;
    },
    attackPowFood() {
      return this.food ? this.atkPower.map((x) => x + 372) : this.atkPower;
    },
    normalHit() {
      return this.sumAllStats.map((side, i) => {
        return (
          this.attackPowFood[i] *
          (1 +
            (this.modific[i] +
              side["NormalATK%"] +
              side["AllDMG%"] +
              side["NCATK%"]) /
              100)
        );
      });
    },
    chargedHit() {
      return this.sumAllStats.map((side, i) => {
        return (
          this.attackPowFood[i] *
          (1 +
            (this.modific[i] +
              side["Charged%"] +
              side["AllDMG%"] +
              side["NCATK%"]) /
              100)
        );
      });
    },
    normalHitElem() {
      return this.sumAllStats.map((side, i) => {
        return (
          this.attackPowFood[i] *
          (1 +
            (side["Elemental%"] +
              side["NormalATK%"] +
              side["AllDMG%"] +
              side["NCATK%"]) /
              100)
        );
      });
    },
    chargedHitElem() {
      return this.sumAllStats.map((side, i) => {
        return (
          this.attackPowFood[i] *
          (1 +
            (side["Elemental%"] +
              side["Charged%"] +
              side["AllDMG%"] +
              side["NCATK%"]) /
              100)
        );
      });
    },
    skillHit() {
      return this.sumAllStats.map((side, i) => {
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
      return this.sumAllStats.map((side, i) => {
        const burstHit =
          this.attackPowFood[i] *
          (1 + (side["Elemental%"] + side["AllDMG%"] + side["Burst%"]) / 100);
        return burstHit;
      });
    },
    additionalBurst() {
      const res = [];
      if (this.character.charName == "Zhongli") {
        let zhongliHP = this.allResults[this.allResults.length - 1];
        zhongliHP.forEach((x, i) => {
          const hit = Math.round(
            x *
              0.33 *
              (1 +
                (this.sumAllStats[i]["Elemental%"] +
                  this.sumAllStats[i]["Burst%"]) /
                  100)
          );
          res.push({
            normal: this.calcNormal(100, hit, this.elemDef),
            critical: this.calcCritical(
              100,
              hit,
              this.elemDef,
              this.sumAllStats[i]["CDmg%"]
            ),
          });
        });
      }
      return res;
    },
    allDamage() {
      let result = {
        "Normal hit": [0, 0],
        "Normal critical": [0, 0],
        "Charged hit": [0, 0],
        "Charged critical": [0, 0],
        "Skill hit": [0, 0],
        "Skill critical": [0, 0],
        "Burst hit": [0, 0],
        "Burst critical": [0, 0],
      };
      for (let i = 0; i < this.sumAllStats.length; i++) {
        result["Normal hit"][i] = this.calcNormal(
          this.character.normal,
          this.normalHit[i],
          this.defMod
        );
        result["Normal critical"][i] = this.calcCritical(
          this.character.normal,
          this.normalHit[i],
          this.defMod,
          this.sumAllStats[i]["CDmg%"]
        );
        result["Charged hit"][i] = this.calcNormal(
          this.character.charged,
          this.chargedHit[i],
          this.defMod
        );
        result["Charged critical"][i] = this.calcCritical(
          this.character.charged,
          this.chargedHit[i],
          this.defMod,
          this.sumAllStats[i]["CDmg%"]
        );
        result["Skill hit"][i] = this.calcNormal(
          this.character.skill,
          this.skillHit[i],
          this.elemDef
        );
        result["Skill critical"][i] = this.calcCritical(
          this.character.skill,
          this.skillHit[i],
          this.elemDef,
          this.sumAllStats[i]["CDmg%"]
        );
        result["Burst hit"][i] =
          this.calcNormal(
            this.character.burst,
            this.burstHit[i],
            this.elemDef
          ) + (this.additionalBurst[i] ? this.additionalBurst[i].normal : 0);
        result["Burst critical"][i] =
          this.calcCritical(
            this.character.burst,
            this.burstHit[i],
            this.elemDef,
            this.sumAllStats[i]["CDmg%"]
          ) + (this.additionalBurst[i] ? this.additionalBurst[i].critical : 0);
      }
      this.$store.commit("SET_ALL_DAMAGE", result);
      return result;
    },
    allElemental() {
      let result = {
        "Normal hit": [0, 0],
        "Normal critical": [0, 0],
        "Charged hit": [0, 0],
        "Charged critical": [0, 0],
        "Skill hit": this.allDamage["Skill hit"],
        "Skill critical": this.allDamage["Skill critical"],
        "Burst hit": this.allDamage["Burst hit"],
        "Burst critical": this.allDamage["Burst critical"],
      };

      for (let i = 0; i < this.sumAllStats.length; i++) {
        result["Normal hit"][i] = this.calcNormal(
          this.character.normal,
          this.normalHitElem[i],
          this.defMod
        );
        result["Normal critical"][i] = this.calcCritical(
          this.character.normal,
          this.normalHitElem[i],
          this.defMod,
          this.sumAllStats[i]["CDmg%"]
        );
        result["Charged hit"][i] = this.calcNormal(
          this.character.charged,
          this.chargedHitElem[i],
          this.defMod
        );
        result["Charged critical"][i] = this.calcCritical(
          this.character.charged,
          this.chargedHitElem[i],
          this.defMod,
          this.sumAllStats[i]["CDmg%"]
        );
      }
      this.$store.commit("SET_ALL_ELEMENTAL", result);
      return result;
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
    calcNormal(mod, hit, def) {
      return Math.round(hit * (mod / 100) * this.levelNerf * def);
    },
    calcCritical(mod, hit, def, cdmg) {
      return Math.round(
        hit * (1 + (50 + cdmg) / 100) * (mod / 100) * this.levelNerf * def
      );
    },
  },
};
</script>

<style>
</style>