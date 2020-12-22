<template>
  <div
    class="flex flex-col md:flex-row bg-gray-800 max-w-screen-md p-1 py-4 overflow-y-auto max-h-screen"
    @click.stop
  >
    <div class="flex flex-wrap md:w-4/6">
      <div
        v-for="(char, key) in sets"
        :key="key"
        class="m-2 cursor-pointer"
        @click.stop="setName = key"
      >
        <img
          :src="`/img/sets/${fileNameFrom(key)}.png`"
          :alt="key"
          :title="key"
        >
      </div>
    </div>
    <div class="md:w-2/6 text-blueGray-200">
      <div class="text-gay-800 text-center">{{ setName }}</div>
      <div><span class="text-green-200">2pcs:</span> {{ currentSet['2pcs'].bonusText}}</div>
      <div><span class="text-blue-200">4pcs:</span> {{ currentSet['4pcs'].bonusText}}</div>
      <button
        class="px-4 py-2 bg-green-600 rounded hover:bg-green-500 w-full mt-4 font-bold text-gray-100 mb-4 md:mb-1"
        @click="setSet"
      >Select</button>
    </div>
  </div>
</template>

<script>
import { sets } from "@/data/sets";

export default {
  name: "SetPick",
  props: {
    name: String,
  },
  data() {
    return {
      sets,
      setName: this.name,
    };
  },
  computed: {
    currentSet() {
      return this.sets[this.setName];
    },
  },
  methods: {
    fileNameFrom(name) {
      return name.replaceAll(" ", "_");
    },
    setSet() {
      this.$emit("set-set", this.setName);
      this.$emit("visibility");
    },
  },
};
</script>

<style>
</style>