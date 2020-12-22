<template>
  <div class="mt-4">
    <div class="flex text-gray-100">
      <Input
        label="Your level"
        type="text"
        v-model.number="level"
      />
      <div
        class="border-2 rounded ml-4 px-2"
        title="Affect only Vaporize and Melt"
      >
        Attack type:
        <label class="px-2 text-gray-200">Normal<input
            type="radio"
            name="normal"
            id="normal"
            value="Normal"
            v-model="attackType"
            class="ml-2"
          ></label>
        <label class="px-2 text-yellow-200">Charged<input
            type="radio"
            name="Charged"
            id="Charged"
            value="Charged"
            v-model="attackType"
            class="ml-2"
          ></label>
        <label class="px-2 text-green-200">Skill<input
            type="radio"
            name="Skill"
            id="Skill"
            value="Skill"
            v-model="attackType"
            class="ml-2"
          ></label>
        <label class="px-2 text-blue-200">Burst<input
            type="radio"
            name="Burst"
            id="Burst"
            value="Burst"
            v-model="attackType"
            class="ml-2"
          ></label>
      </div>
    </div>
    <!-- <label class="ml-4">Charged attack?<input
        type="checkbox"
        v-model="charged"
        class="ml-2"
      ></label> -->
    <p
      v-show="note"
      class="text-gray-100 bg-blue-600 rounded mt-4 px-4 py-2 border-blue-300 border-2 flex justify-between"
    >
      NOTE: To view different reactions pick different characters.
      <span
        class="text-red-400 text-2xl leading-none hover:text-red-300 cursor-pointer"
        @click="note = false"
      >&#11199;</span>
    </p>
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
import Input from "@/components/UI/Input.vue";

import { mapState } from "vuex";

const reactionElements = {
  Electro: [
    { name: "Superconductor" },
    { name: "Electro-charged" },
    { name: "Overload" },
  ],
  Fire: [
    { name: "Melt" },
    { name: "Melt critical" },
    { name: "Vaporize" },
    { name: "Vaporize critical" },
    { name: "Overload" },
  ],
  Ice: [
    { name: "Superconductor" },
    { name: "Melt" },
    { name: "Melt critical" },
    { name: "Shattered" },
  ],
  Anemo: [{ name: "Swirl" }],
  Water: [
    { name: "Vaporize" },
    { name: "Vaporize critical" },
    { name: "Shattered" },
    { name: "Electro-charged" },
  ],
  Geo: [{ name: "Crystalize" }],
};

export default {
  name: "Reactions",
  components: {
    Input,
  },
  props: {
    EM: Array,
    set: Array,
  },
  data() {
    return {
      level: 80,
      reactionElements: reactionElements,
      charged: false,
      note: true,
      attackType: "Normal",
    };
  },
  computed: {
    // Superconductor : Swirl : Electro-charged : Shattered : Overload = 1 : 1.2 : 2.4 : 3 : 4
    ...mapState(["allElemental", "allStats", "character"]),
    percent() {
      return this.EM.map(
        (em) => Math.round(((1 * em * (25 / 9)) / (em + 1400)) * 1000) / 10
      );
    },
    superconduct() {
      return this.reaction(1, this.level, "Superconduct");
    },
    swirl() {
      return this.reaction(1.2, this.level, "Swirl");
    },
    electroCharge() {
      return this.reaction(2.4, this.level, "Electro-charged");
    },
    shattered() {
      return this.reaction(3, this.level, "Shattered");
    },
    overload() {
      return this.reaction(4, this.level, "Overload");
    },
    damageType() {
      return this.charged ? "Charged" : "Normal";
    },
    melt() {
      return this.allElemental[`${this.attackType} hit`].map(
        (x, i) =>
          x *
          (1 + (this.percent[i] + this.allStats[i]["Melt"]) / 100) *
          (this.character.element == "Fire" ? 2 : 1.5)
      );
    },
    meltCritical() {
      return this.allElemental[`${this.attackType} critical`].map(
        (x, i) =>
          x *
          (1 + (this.percent[i] + this.allStats[i]["Melt"]) / 100) *
          (this.character.element == "Fire" ? 2 : 1.5)
      );
    },
    vaporize() {
      return this.allElemental[`${this.attackType} hit`].map(
        (x, i) =>
          x *
          (1 + (this.percent[i] + this.allStats[i]["Vaporize"]) / 100) *
          (this.character.element == "Fire" ? 1.5 : 2)
      );
    },
    vaporizeCritical() {
      return this.allElemental[`${this.attackType} critical`].map(
        (x, i) =>
          x *
          (1 + (this.percent[i] + this.allStats[i]["Vaporize"]) / 100) *
          (this.character.element == "Fire" ? 1.5 : 2)
      );
    },
    reactions() {
      const reac = this.reactionElements[this.character.element];
      const damage = {
        Superconductor: this.superconduct,
        Swirl: this.swirl,
        "Electro-charged": this.electroCharge,
        Shattered: this.shattered,
        Overload: this.overload,
        Melt: this.melt,
        Vaporize: this.vaporize,
        "Melt critical": this.meltCritical,
        "Vaporize critical": this.vaporizeCritical,
      };
      return reac.map((x) => {
        return { ...x, damage: damage[x.name] || [0, 0] };
      });
    },
  },
  methods: {
    reaction(k, x, name) {
      const start =
        -0.0000006815 * x ** 5 +
        0.0001257728 * x ** 4 -
        0.0073286198 * x ** 3 +
        0.2100526539 * x ** 2 -
        0.5937899697 * x +
        8.4614696213;
      return this.percent.map((p, i) => {
        return Math.round(
          start * k * (1 + (p * 2.4 + this.allStats[i][name]) / 100) * 0.9
        );
      });
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