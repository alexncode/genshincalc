<template>
  <div class="mt-4">
    <div class="flex text-gray-100">
      <div
        class="border-2 rounded px-2"
        title="Affect only Vaporize and Melt"
      >
        Attack type:
        <label class="px-2 text-gray-200">Normal<input
            type="radio"
            id="normal"
            value="Normal"
            v-model="attackType"
            class="ml-2"
          ></label>
        <label class="px-2 text-yellow-200">Charged<input
            type="radio"
            id="Charged"
            value="Charged"
            v-model="attackType"
            class="ml-2"
          ></label>
        <label class="px-2 text-green-200">Skill<input
            type="radio"
            id="Skill"
            value="Skill"
            v-model="attackType"
            class="ml-2"
          ></label>
        <label class="px-2 text-blue-200">Burst<input
            type="radio"
            id="Burst"
            value="Burst"
            v-model="attackType"
            class="ml-2"
          ></label>
      </div>
    </div>
    <table class="table-auto w-full mt-4 text-gray-300 leading-none bg-gray-900">
      <thead>
        <tr>
          <th class="border px-2 py-2 w-1/5">Reaction</th>
          <th class="border px-2 py-2 w-2/5">First set</th>
          <th class="border px-2 py-2 w-2/5">Second set</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="reaction in reactions"
          :key="reaction.name"
          class="bg-gray-800 even:bg-gray-900"
        >
          <td class="border border-gray-600 px-1 py-1">{{ reaction.name }}</td>
          <td class="border border-gray-600 px-1 py-1">{{ reaction.damage[0] | round }}</td>
          <td
            class="border border-gray-600 px-1 py-1"
            :class="damageClass(reaction.damage)"
          >{{ reaction.damage[1] | round }} <sup>{{ damagePercent(reaction.damage) }}%</sup></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

const reactionElements = {
  Electro: ["Superconductor", "Electro-charged", "Overload"],
  Fire: [
    "Melt",
    "Melt critical",
    "Melt average",
    "Vaporize",
    "Vaporize critical",
    "Vaporize average",
    "Overload",
  ],
  Ice: ["Superconductor", "Melt", "Melt critical", "Melt average", "Shattered"],
  Anemo: ["Swirl"],
  Water: [
    "Vaporize",
    "Vaporize critical",
    "Vaporize average",
    "Shattered",
    "Electro-charged",
  ],
  Geo: ["Crystalize"],
};

export default {
  name: "Reactions",
  data() {
    return {
      reactionElements: reactionElements,
      charged: false,
      attackType: "Normal",
    };
  },
  computed: {
    // Superconductor : Swirl : Electro-charged : Shattered : Overload = 1 : 1.2 : 2.4 : 3 : 4
    ...mapState(["allElemental", "character", "set"]),
    ...mapGetters(["allStats", "allResults"]),
    EM() {
      return this.allResults[9];
    },
    percent() {
      return this.EM.map(
        (em) => Math.round(278 * (em / (em + 1400)) * 10) / 10
      );
    },
    majorPercent() {
      return this.EM.map(
        (em) => Math.round(1600 * (em / (em + 2000)) * 10) / 10
      );
    },
    crystalPercent() {
      return this.EM.map(
        (em) => Math.round(444 * (em / (em + 1400)) * 10) / 10
      );
    },
    superconduct() {
      return this.reaction(1, "Superconduct");
    },
    swirl() {
      return this.reaction(1.2, "Swirl");
    },
    electroCharge() {
      return this.reaction(2.4, "Electro-charged");
    },
    shattered() {
      return this.reaction(3, "Shattered");
    },
    overload() {
      return this.reaction(4, "Overload");
    },
    damageType() {
      return this.charged ? "Charged" : "Normal";
    },
    melt() {
      return this.reacDamage(`${this.attackType} hit`, "Melt");
    },
    meltCritical() {
      return this.reacDamage(`${this.attackType} critical`, "Melt");
    },
    meltAverage() {
      return this.reacDamage(`${this.attackType} average`, "Melt");
    },
    vaporize() {
      return this.reacDamage(`${this.attackType} hit`, "Vaporize");
    },
    vaporizeCritical() {
      return this.reacDamage(`${this.attackType} critical`, "Vaporize");
    },
    vaporizeAverage() {
      return this.reacDamage(`${this.attackType} average`, "Vaporize");
    },
    crystalize() {
      const shield = {
        1: 91,
        10: 159,
        20: 304,
        30: 438,
        40: 557,
        50: 715,
        60: 896,
        70: 1096,
        80: 1277,
        90: 1424,
      };
      return this.crystalPercent.map((x) => {
        return shield[parseInt(this.character.charLvl)] * (1 + (x * 1.6) / 100);
      });
    },
    reactions() {
      const reac = this.reactionElements[this.character.element];
      const damage = {
        Superconductor: () => this.superconduct,
        Swirl: () => this.swirl,
        "Electro-charged": () => this.electroCharge,
        Shattered: () => this.shattered,
        Overload: () => this.overload,
        Melt: () => this.melt,
        Vaporize: () => this.vaporize,
        "Melt critical": () => this.meltCritical,
        "Melt average": () => this.meltAverage,
        "Vaporize critical": () => this.vaporizeCritical,
        "Vaporize average": () => this.vaporizeAverage,
        Crystalize: () => this.crystalize,
      };
      return reac.map((x) => {
        return { name: x, damage: damage[x]() };
      });
    },
  },
  methods: {
    reaction(k, name) {
      const start = {
        1: 9,
        10: 17,
        20: 40,
        30: 68,
        40: 104,
        50: 162,
        60: 245,
        70: 383,
        80: 540,
        90: 725,
      };
      return this.majorPercent.map((p, i) => {
        return Math.round(
          start[parseInt(this.character.charLvl)] * k * (1 + ((p + this.allStats[i][name])) / 100) * 0.9
        );
      });
    },
    reacDamage(type, reaction) {
      let mod = 1.5;
      if (reaction == "Melt" && this.character.element == "Fire") mod = 2;
      if (reaction == "Vaporize" && this.character.element == "Water") mod = 2;
      return this.allElemental[type].map(
        (x, i) =>
          x * (1 + (this.percent[i] + this.allStats[i][reaction]) / 100) * mod
      );
    },
    damageClass(dmg) {
      let cs = "";
      if (dmg[0] > dmg[1]) cs = "text-red-400";
      if (dmg[0] < dmg[1]) cs = "text-green-400";
      return cs;
    },
    damagePercent(dmg) {
      return (((dmg[1] - dmg[0]) / Math.abs(dmg[0])) * 100).toFixed(1);
    },
  },
  filters: {
    round: function (value) {
      return Math.round(value);
    },
  },
};
</script>

<style>
</style>