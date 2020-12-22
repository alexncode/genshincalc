<template>
  <div class="mt-1 text-gray-200">
    <button
      @click="showAdditional = !showAdditional"
      class=" rounded w-full h-4 leading-none font-extrabold"
      :class="showAdditional ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'"
      title="Show additional stats"
    >{{showAdditional ? "-" : "+"}}</button>
    <div v-show="showAdditional">
      <div class="flex justify-between">
        <div>Additional stats</div>
        <button
          class="bg-green-700 hover:bg-green-600 rounded px-2 font-bold mb-1"
          @click="add"
        >ADD</button>
      </div>
      <div
        v-for="(stat, index) in  additionalStats[side]"
        :key="stat.stat+index"
        class="flex justify-between mt-1"
      >
        <input
          type="text"
          class="bg-transparent mr-1 text-left text-gray-200 w-32"
          v-model="stat.desc"
        >
        <input
          type="text"
          class="text-gray-800 mr-1 w-12"
          v-model.number="stat.value"
        />
        <select
          class="text-gray-800 mr-1 w-24"
          v-model="stat.stat"
        >
          <option
            v-for="option in options"
            :key="option"
          >{{ option }}</option>
        </select>
        <button
          @click="additionalStats[side].splice(index, 1)"
          class="rounded bg-red-500 px-1 hover:bg-red-400"
          title="Delete"
        >&#128465;</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  name: "Additional",
  props: {
    side: String,
  },
  data() {
    return {
      options: [
        "ATK%",
        "Elemental%",
        "Physical%",
        "NormalATK%",
        "Charged%",
        "CRate%",
        "CDmg%",
        "FlatATK",
      ],
      showAdditional: false,
    };
  },
  computed: {
    ...mapFields(["additionalStats"]),
  },
  methods: {
    add() {
      this.additionalStats[this.side].push({
        stat: "ATK%",
        value: 10,
        desc: "Bonus name",
      });
    },
  },
};
</script>

<style>
</style>