<template>
  <div class="mt-4">
    <Input
      label="Your level"
      type="text"
      v-model.number="level"
    />
    <label class="ml-4">Charged attack?<input
        type="checkbox"
        v-model="charged"
        class="ml-2"
      ></label>
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
          <td class="border border-gray-600 px-1 py-1">{{ reaction.damage[1] | round }}</td>
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
  Earth: [{ name: "Crystalize" }],
};

export default {
  name: "Reactions",
  components: {
    Input,
  },
  props: {
    EM: Array,
    hero: Object,
  },
  data() {
    return {
      level: 80,
      reactionElements: reactionElements,
      charged: false,
      note: true,
    };
  },
  computed: {
    // Superconductor : Swirl : Electro-charged : Shattered : Overload = 1 : 1.2 : 2.4 : 3 : 4
    ...mapState(["allDamage"]),
    percent() {
      return this.EM.map(
        (em) => Math.round(((1 * em * (25 / 9)) / (em + 1400)) * 1000) / 10
      );
    },
    superconduct() {
      return this.reaction(1, this.level);
    },
    swirl() {
      return this.reaction(1.2, this.level);
    },
    electroCharge() {
      return this.reaction(2.4, this.level);
    },
    shattered() {
      return this.reaction(3, this.level);
    },
    overload() {
      return this.reaction(4, this.level);
    },
    vaporize() {
      return 0;
    },
    reactions() {
      const reac = this.reactionElements[this.hero.element];
      const type = this.charged ? "Charged" : "Normal";
      const meltPercent = this.percent;
      const damage = {
        Superconductor: this.superconduct,
        Swirl: this.swirl,
        "Electro-charged": this.electroCharge,
        Shattered: this.shattered,
        Overload: this.overload,
        Melt: this.allDamage[`${type} hit`].map(
          (x, i) =>
            x *
            (1 + meltPercent[i] / 100) *
            (this.hero.element == "Fire" ? 2 : 1.5)
        ),
        Vaporize: this.allDamage[`${type} hit`].map(
          (x, i) =>
            x *
            (1 + meltPercent[i] / 100) *
            (this.hero.element == "Fire" ? 1.5 : 2)
        ),
        "Melt critical": this.allDamage[`${type} critical`].map(
          (x, i) =>
            x *
            (1 + meltPercent[i] / 100) *
            (this.hero.element == "Fire" ? 2 : 1.5)
        ),
        "Vaporize critical": this.allDamage[`${type} critical`].map(
          (x, i) =>
            x *
            (1 + meltPercent[i] / 100) *
            (this.hero.element == "Fire" ? 1.5 : 2)
        ),
      };
      return reac.map((x) => {
        return { ...x, damage: damage[x.name] || [0, 0] };
      });
    },
  },
  methods: {
    reaction(k, x) {
      const start =
        -0.0000006815 * x ** 5 +
        0.0001257728 * x ** 4 -
        0.0073286198 * x ** 3 +
        0.2100526539 * x ** 2 -
        0.5937899697 * x +
        8.4614696213;
      return this.percent.map((p) =>
        Math.round(start * k * (1 + (p * 2.4) / 100) * 0.9)
      );
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