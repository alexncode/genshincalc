<template>
  <div
    class="max-w-screen-md bg-gray-700 p-4"
    @click.stop
  >
    <div class="flex flex-wrap gap-4 max-w-screen-md">
      <label
        for="superc"
        class="text-blue-200"
      >
        Superconduct
        <input
          type="checkbox"
          id="superc"
          v-model="superc"
        >
      </label>
      <label
        for="viri"
        class="text-green-500"
      >
        Viridescent Venerer
        <input
          type="checkbox"
          id="viri"
          v-model="viri"
        >
      </label>
      <label
        for="adept"
        class="text-amber-400"
      >
        Adeptus' Temptation
        <input
          type="checkbox"
          id="adept"
          v-model="adept"
        >
      </label>
    </div>
    <div class="mt-4">
      <div
        class="bg-green-600 rounded p-1 cursor-pointer hover:bg-green-500 text-center text-gray-200"
        @click="$emit('visibility')"
      >OK</div>
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
      res.ERES = 0;
      res.RES = 0;
      if (this.adept) {
        res.flatATK = 372;
        res.CRate = 12;
      }
      if (this.viri) {
        res.ERES = 40;
      }
      if (this.superc) {
        res.RES = 40;
      }
      return res;
    },
  },
};
</script>
