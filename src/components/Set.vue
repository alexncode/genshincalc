<template>
  <div class="flex flex-col mt-1 mb-2">
    <div class="flex">
      <label
        for="set"
        class="mr-2"
      >Set</label>
      <select
        name="set"
        :id="'set'+side"
        v-model="value.set[0]"
        class="mr-2"
      >
        <option
          v-for="set in sets"
          :key="set.name"
        >{{ set.name }}</option>
      </select>
      <div class="bg-gray-800 rounded px-1">
        <label
          for="2pcs"
          class="mr-2"
        >2pcs
          <input
            type="radio"
            :id="'2pcs' + side"
            value="2pcs"
            v-model="value.pieces"
          ></label>

        <label for="4pcs">4pcs
          <input
            type="radio"
            :id="'4pcs' + side"
            value="4pcs"
            v-model="value.pieces"
          >
        </label>
      </div>
    </div>
    <div v-if="value.pieces == '2pcs'">
      <label for="set">Second set</label>
      <select
        name="set"
        :id="'set'+side"
        v-model="value.set[1]"
      >
        <option
          v-for="set in sets"
          :key="set.name"
        >{{ set.name }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "Weapon",
  props: {
    sets: Object,
    value: Object,
    side: String,
  },
};
</script>