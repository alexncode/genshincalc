<template>
  <div class="mt-4">
    <div class="flex mb-2">
      <label
        for="normal"
        class="mr-2 border-r-2 border-gray-900"
      >Normal attack% <input
          type="text"
          id="normal"
          v-model.number="normal"
          class="text-gray-900 w-10 mx-2"
        ></label>

      <label
        for="charged"
        class="mr-2 border-r-2 border-gray-900"
      >Charged attack%<input
          type="text"
          id="charged"
          v-model.number="charged"
          class="text-gray-900 w-10 mx-2 "
        ></label>

      <label
        for="skill"
        class="mr-2 border-r-2 border-gray-900"
      >Skill attack%<input
          type="text"
          id="skill"
          v-model.number="skill"
          class="text-gray-900 w-10 mx-2 "
        ></label>

      <label for="level">Your level<input
          type="text"
          id="level"
          v-model.number="level"
          class="text-gray-900 w-10 mx-2"
        ></label>
    </div>
    <div class="flex">
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
        for="elemental"
        class="mr-2 border-r-2 border-gray-900"
      >Elemental damage?<input
          type="checkbox"
          id="elemental"
          v-model="elementalDamage"
          class="text-gray-900 mx-2"
        ></label>
      <label for="superc">Superconduct?<input
          type="checkbox"
          id="superc"
          v-model="superc"
          class="text-gray-900 mx-2"
        ></label>

    </div>
    <table class="table-auto w-full mt-4 text-gray-300 leading-none bg-gray-900">
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
            :class="damage[0] > damage[1] ? 'text-red-400' : 'text-green-400'"
          >
            {{ damage[1] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Damage",
  props: {
    sumAllStats: Array,
    atkPower: Array,
  },
  data() {
    return {
      normal: 59.6,
      charged: 237,
      skill: 235,
      level: 80,
      enemyLevel: 80,
      superc: false,
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
    elementalDamage: {
      get() {
        return this.$store.state.elementalDamage;
      },
      set() {
        this.$store.commit("SET_ELEMENTAL_DAMAGE", !this.elementalDamage);
      },
    },
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
    allDamage() {
      let result = {
        "Normal hit": [0, 0],
        "Normal critical": [0, 0],
        "Charged hit": [0, 0],
        "Charged critical": [0, 0],
        "Skill hit": [0, 0],
        "Skill critical": [0, 0],
      };
      const levelNerf =
        (100 + this.level) / (100 + this.level + 100 + this.enemyLevel);

      for (let i = 0; i < this.sumAllStats.length; i++) {
        const modific = this.elementalDamage
          ? this.sumAllStats[i]["Elemental%"]
          : this.sumAllStats[i]["Physical%"];
        const def = this.elementalDamage ? this.elemDef : this.def;
        const normalHit =
          this.atkPower[i] *
          (1 +
            (modific +
              this.sumAllStats[i]["NormalATK%"] +
              this.sumAllStats[i]["AllDMG%"] +
              this.sumAllStats[i]["NCATK%"]) /
              100);
        const chargetHit =
          this.atkPower[i] *
          (1 +
            (modific +
              this.sumAllStats[i]["Charged%"] +
              this.sumAllStats[i]["AllDMG%"] +
              this.sumAllStats[i]["NCATK%"]) /
              100);
        const skillHit =
          this.atkPower[i] *
          (1 +
            (this.sumAllStats[i]["Elemental%"] +
              this.sumAllStats[i]["AllDMG%"] +
              this.sumAllStats[i]["SkillDMG%"]) /
              100);
        const calcNormal = (mod, hit, def) => {
          return Math.round(hit * (mod / 100) * levelNerf * def);
        };
        const calcCritical = (mod, hit, def) => {
          return Math.round(
            hit *
              (1 + (50 + this.sumAllStats[i]["CDmg%"]) / 100) *
              (mod / 100) *
              levelNerf *
              def
          );
        };
        result["Normal hit"][i] = calcNormal(this.normal, normalHit, def);
        result["Normal critical"][i] = calcCritical(
          this.normal,
          normalHit,
          def
        );
        result["Charged hit"][i] = calcNormal(this.charged, chargetHit, def);
        result["Charged critical"][i] = calcCritical(
          this.charged,
          chargetHit,
          def
        );
        result["Skill hit"][i] = calcNormal(this.skill, skillHit, this.elemDef);
        result["Skill critical"][i] = calcCritical(
          this.skill,
          skillHit,
          this.elemDef
        );
      }
      this.$store.commit("SET_ALL_DAMAGE", result);
      return result;
    },
  },
};
</script>

<style>
</style>