<template>
  <div
    class="max-w-screen-md bg-gray-700 p-4 flex flex-col"
    @click.stop
  >
    <div class="flex flex-wrap gap-4 max-w-screen-md justify-center">
      <label
        for="superc"
        class="text-blue-200"
      >
        Superconduct
        <input
          id="superc"
          v-model="superc"
          type="checkbox"
        >
      </label>
      <label
        for="viri"
        class="text-green-500"
      >
        Viridescent Venerer
        <input
          id="viri"
          v-model="viri"
          type="checkbox"
        >
      </label>
      <label
        for="adept"
        class="text-amber-400"
      >
        Adeptus' Temptation
        <input
          id="adept"
          v-model="adept"
          type="checkbox"
        >
      </label>
      <div class="flex gap-4">
        <label
          for="def"
          class="text-gray-400"
        >
          DEF debuff
          <input
            id="def"
            v-model.number="additionalDEF"
            class="w-12 text-gray-800"
            type="number"
          >
        </label>
        <label
          for="res"
          class="text-gray-200"
        >
          Physical debuff
          <input
            id="res"
            v-model.number="additionalRES"
            class="w-12 text-gray-800"
            type="number"
          >
        </label>
        <label
          for="res"
          class="text-red-400"
        >
          Elemental debuff
          <input
            id="res"
            v-model.number="additionalERES"
            class="w-12 text-gray-800"
            type="number"
          >
        </label>
      </div>
    </div>
    <div class="mt-4">
      <div
        class="bg-green-600 rounded p-1 mt-4 cursor-pointer hover:bg-green-500 text-center text-gray-200 max-w-md mx-auto"
        @click="$emit('visibility')"
      >
        OK
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  name: "Buffs",
  data() {
    return {
      superc: false,
      viri: false,
      adept: false,
      additionalDEF: 0,
      additionalRES: 0,
      additionalERES: 0,
    };
  },
  watch: {
    allEffects() {
      this.buffs = this.allEffects;
    },
  },
  computed: {
    ...mapFields(["buffs"]),
    allEffects() {
      const res = this.buffs;
      res.flatATK = 0;
      res.CRate = 0;
      res.ERES = this.additionalERES;
      res.RES = this.additionalRES;
      res.DEF = this.additionalDEF;
      if (this.adept) {
        res.flatATK = 372;
        res.CRate = 12;
      }
      if (this.viri) {
        res.ERES += 40;
      }
      if (this.superc) {
        res.RES += 40;
      }
      return res;
    },
  },
};
</script>
