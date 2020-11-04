<template>
  <div>
    <div class="grid grid-auto gap-1 mt-1">
      <label :for="artifact.id">{{artifact.label}}</label>
      <input
        type="text"
        :id="artifact.id + side"
        v-model.number="artifact.value"
        class="text-gray-900"
      >
      <div
        class="h-6 w-4  border-gray-400 rounded cursor-pointer"
        :class="artifact.rarity == 4 ? 'bg-purple-600' : 'bg-orange-400'"
        :title="artifact.rarity == 4 ? 'Epic' : 'Legendary'"
        @click="changeRarity"
      ></div>
      <select
        name="mainStat"
        :id="artifact.id + side"
        v-model="artifact.mainStatName"
        @change="maxValue"
        class="text-gray-900"
      >
        <option
          v-for="val in artifact.mainStat"
          :key="val"
          :value="val"
        >{{ val }}</option>
      </select>
      <button
        class="bg-green-600 text-gray-100 rounded"
        @click="showSubstats = !showSubstats"
      >+</button>
    </div>
    <div
      v-if="showSubstats"
      class="flex flex-col text-gray-900 ml-4 my-2"
    >
      <div
        v-for="(substat, i) in substats"
        :key="substat.name"
        class="flex"
      >
        <label
          class="text-orange-200 font-normal w-1/6"
          for="substat"
        >{{substat.value}}</label>
        <input
          type="range"
          name="subVal"
          id="subVal"
          class="w-3/6"
          :min="possibleStats[artifact.substats[i].name].min * 1"
          :max="possibleStats[artifact.substats[i].name].max * 6"
          :step="artifact.substats[i].value > 10 ? 1 : 0.1"
          v-model="artifact.substats[i].value"
        >
        <select
          name="substat"
          :id="substat"
          v-model="artifact.substats[i].name"
          class="w-2/6"
        >
          <option
            v-for="(sb, key) in possibleStats"
            :key="key"
            :value="key"
          >{{ key }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
function shuffle(array) {
  let i = array.length,
    j = 0,
    temp;
  while (i--) {
    j = Math.floor(Math.random() * (i + 1));

    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export default {
  name: "Artifact",
  props: {
    artifact: Object,
    side: String,
  },
  data() {
    return {
      showSubstats: false,
      possibleStats: {
        "HP%": { min: 4.1, max: 5.8 },
        "ATK%": { min: 4.1, max: 5.8 },
        "DEF%": { min: 5.1, max: 7.3 },
        EM: { min: 16, max: 23 },
        "CRate%": { min: 2.7, max: 3.9 },
        "CDmg%": { min: 5.4, max: 7.8 },
        "EnRe%": { min: 4.5, max: 6.5 },
        FlatATK: { min: 14, max: 19 },
        FlatDEF: { min: 14, max: 19 },
        HP: { min: 209, max: 299 },
      },
      maxValues: {
        "HP%": { 4: 34.8, 5: 46.6 },
        "ATK%": { 4: 34.8, 5: 46.6 },
        "DEF%": { 4: 43.5, 5: 58.3 },
        EM: { 4: 139, 5: 187 },
        "EnRe%": { 4: 38.7, 5: 51.8 },
        FlatATK: { 4: 232, 5: 311 },
        HP: { 4: 3571, 5: 4780 },
        "Elemental%": { 4: 34.8, 5: 46.6 },
        "Physical%": { 4: 43.5, 5: 58.3 },
        "CRate%": { 4: 23.2, 5: 31.1 },
        "CDmg%": { 4: 46.4, 5: 62.2 },
        "Healing%": { 4: 26.8, 5: 35.9 },
      },
    };
  },
  mounted() {
    this.artifact.substats = this.substats;
  },
  computed: {
    substats() {
      let substats = shuffle(Object.keys(this.possibleStats));
      let result = [];
      let i = 0;
      while (result.length < 4) {
        if (substats[i] != this.artifact.mainStatName) {
          result.push({
            name: substats[i],
            value:
              Math.round(
                ((this.possibleStats[substats[i]].min +
                  this.possibleStats[substats[i]].max) /
                  2) *
                  100
              ) / 100,
          });
        }
        i++;
      }
      for (let i = 0; i < 5; i++) {
        let x = Math.floor(Math.random() * 4);
        result[x].value +=
          (this.possibleStats[result[x].name].min +
            this.possibleStats[result[x].name].max) /
          2;
      }
      result.forEach((x) => {
        x.value = parseFloat(parseFloat(x.value).toFixed(2));
      });
      return result;
    },
  },
  methods: {
    maxValue() {
      this.artifact.value = this.maxValues[this.artifact.mainStatName][
        this.artifact.rarity
      ];
    },
    changeRarity() {
      this.artifact.rarity = this.artifact.rarity == 4 ? 5 : 4;
      this.maxValue();
    },
  },
};
</script>

<style>
label {
  @apply text-gray-200;
}

.grid-auto {
  grid-template-columns: 1fr 3rem 1rem 6rem 2rem;
}
</style>