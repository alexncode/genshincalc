<template>
  <div class="grid grid-auto gap-1 mt-1 mb-2">
    <label :for="weapon.id">{{weapon.label}}</label>
    <input
      type="text"
      :id="weapon.id + side"
      v-model.number="weapon.value"
      class="text-gray-900"
    >
    <div></div>
    <select
      name="mainStat"
      :id="weapon.id + side"
      v-if="weapon.mainStat"
      v-model="weapon.mainStatName"
      class="text-gray-900"
      @change="maxStat"
    >
      <option
        v-for="val in weapon.mainStat"
        :key="val"
        :value="val"
      >{{ val }}</option>
    </select>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "Weapon",
  props: {
    weapon: Object,
    side: String,
  },
  methods: {
    maxStat() {
      this.weapon.value = this.weapon.maxStats[this.weapon.mainStatName];
    },
  },
};
</script>