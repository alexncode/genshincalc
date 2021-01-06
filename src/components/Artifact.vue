<template>
  <div>
    <div class="grid grid-auto gap-1 mt-1">
      <label
        class=" w-28"
        :for="artifact.id"
      >{{artifact.label}}</label>
      <input
        type="text"
        :id="artifact.id + side"
        v-model.number="artifact.value"
        class="text-gray-900"
      >
      <div
        class="h-6 w-4  border-gray-400 rounded cursor-pointer"
        :class="artifact.rarity == 4 ? 'bg-purple-500' : 'bg-amber-500'"
        :title="artifact.rarity == 4 ? 'Epic' : 'Legendary'"
        @click="changeRarity"
      ></div>
      <select
        name="mainStat"
        :id="artifact.id + side"
        v-model="artifact.name"
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
        class="text-gray-100 rounded"
        :class="showSubstats ? 'bg-red-500' : 'bg-green-600'"
        @click="showSubstats = !showSubstats"
      >{{showSubstats ? '-': '+'}}</button>
    </div>
    <div
      v-if="showSubstats"
      class="flex flex-col text-gray-900 ml-4 my-2"
    >
      <div
        v-for="(substat, i) in artifact.substats"
        :key="substat.name"
        class="flex"
      >
        <div class="text-orange-200 font-normal w-value">{{ substat.value }}</div>
        <div class="w-upgrade flex text-green-200 px-2">
          <button
            class="text-blueGray-300 bg-blueGray-800 rounded w-3 hover:bg-blueGray-700"
            @click="minusUpgrade(substat)"
          >-</button>
          <div
            class="px-1"
            title="Number of upgrades maximum of 5 for 5* and 4 for 4*"
          >{{ substat.upgrade }}</div>
          <button
            class="text-blueGray-300 bg-blueGray-800 rounded w-3 hover:bg-blueGray-700"
            @click="plusUpgrade(substat)"
          >+</button>
        </div>
        <input
          type="range"
          name="subVal"
          id="subVal"
          class="w-range mr-1"
          :min="minSubstats[i]"
          :max="maxSubstats[i]"
          :step="possibleStats[substat.name].step"
          v-model.number="substat.value"
        >
        <select
          name="substat"
          :id="substat.name"
          v-model="substat.name"
          @change="changeSubstatVal(substat)"
          class="w-name"
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

// function random(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

function randomSubstatVal(possibleVals) {
  const i = possibleVals.length;
  const j = Math.floor(Math.random() * i);
  return possibleVals[j];
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
        "ATK%": { 5: [4.1, 4.7, 5.3, 5.8], 4: [3.3, 3.7, 4.2, 4.7], step: 0.1 },
        "DEF%": { 5: [5.1, 5.8, 6.6, 7.3], 4: [4.1, 4.7, 5.3, 5.8], step: 0.1 },
        "HP%": { 5: [4.1, 4.7, 5.3, 5.8], 4: [3.3, 3.7, 4.2, 4.7], step: 0.1 },
        EM: { 5: [16, 19, 21, 23], 4: [13, 15, 17, 19], step: 1 },
        "CRate%": {
          5: [2.7, 3.1, 3.5, 3.9],
          4: [2.2, 2.5, 2.8, 3.1],
          step: 0.1,
        },
        "CDmg%": { 5: [5.4, 6.2, 7, 7.8], 4: [4.4, 5, 5.6, 6.2], step: 0.1 },
        "EnRe%": {
          5: [4.5, 5.2, 5.8, 6.5],
          4: [3.6, 4.1, 4.7, 5.2],
          step: 0.1,
        },
        FlatATK: { 5: [14, 16, 18, 19], 4: [11, 12, 14, 16], step: 1 },
        FlatDEF: { 5: [16, 19, 21, 23], 4: [13, 15, 17, 19], step: 1 },
        HP: { 5: [209, 239, 269, 299], 4: [167, 191, 215, 239], step: 1 },
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
  created() {
    this.substats();
  },
  computed: {
    maxUpdates() {
      return this.artifact.rarity == 5 ? 5 : 3;
    },
    availableUpgrades() {
      return this.artifact.substats.reduce(
        (sum, x) => sum - x.upgrade,
        this.maxUpdates
      );
    },
    minSubstats() {
      return this.artifact.substats.map((x) => {
        const val = this.possibleStats[x.name][this.artifact.rarity][0];
        return val + val * x.upgrade;
      });
    },
    maxSubstats() {
      return this.artifact.substats.map((x) => {
        const val = this.possibleStats[x.name][this.artifact.rarity][3];
        return val + val * x.upgrade;
      });
    },
  },
  methods: {
    substats() {
      let substats = shuffle(Object.keys(this.possibleStats));
      let i = 0;
      while (this.artifact.substats.length < 4) {
        if (substats[i] != this.artifact.name) {
          this.artifact.substats.push({
            name: substats[i],
            value: 0,
            upgrade: 0,
          });
        }
        i++;
      }
      this.startingValues();
      this.randomUpgrades();
      this.formatSubstats();
    },
    startingValues() {
      const rarity = this.artifact.rarity;
      this.artifact.substats.forEach((x) => {
        x.value = randomSubstatVal(this.possibleStats[x.name][rarity]);
        x.upgrade = 0;
      });
    },
    randomUpgrades() {
      const rarity = this.artifact.rarity;
      for (let i = 0; i < this.maxUpdates; i++) {
        let x = Math.floor(Math.random() * 4);
        this.artifact.substats[x].upgrade += 1;
        const name = this.artifact.substats[x].name;
        this.artifact.substats[x].value += randomSubstatVal(
          this.possibleStats[name][rarity]
        );
      }
    },
    formatSubstats() {
      this.artifact.substats.forEach((x) => {
        x.value = parseFloat(parseFloat(x.value).toFixed(2));
      });
    },
    maxValue() {
      this.artifact.value = this.maxValues[this.artifact.name][
        this.artifact.rarity
      ];
    },
    changeRarity() {
      this.artifact.rarity = this.artifact.rarity == 4 ? 5 : 4;
      this.startingValues();
      this.randomUpgrades();
      this.formatSubstats();
      this.maxValue();
    },
    changeSubstatVal(substat) {
      const rarity = this.artifact.rarity;
      substat.value = 0;
      for (let i = 0; i < substat.upgrade + 1; i++) {
        substat.value += randomSubstatVal(
          this.possibleStats[substat.name][rarity]
        );
        substat.value = Math.round(substat.value * 10) / 10;
      }
    },
    minusUpgrade(substat) {
      if (substat.upgrade > 0) {
        substat.upgrade -= 1;
        this.changeSubstatVal(substat);
      }
    },
    plusUpgrade(substat) {
      if (this.availableUpgrades > 0) {
        substat.upgrade += 1;
        this.changeSubstatVal(substat);
      }
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
.w-value {
  width: 10%;
}
.w-upgrade {
  width: 20%;
}
.w-range {
  width: 45%;
}
.w-name {
  width: 25%;
}
</style>