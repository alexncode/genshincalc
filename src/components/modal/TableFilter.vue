<template>
  <div
    class="bg-gray-700 p-2 w-96"
    @click.stop
  >
    <h3 class="text-xl text-center">
      Filter table values
    </h3>
    <div
      v-for="(att, i) in attributes"
      :key="att"
      class="flex justify-between border-b px-2 border-gray-500"
      :class="filteredAttributes.includes(att) ? 'text-gray-400' : 'text-gray-200'"
    >
      <div>{{ att }}</div>
      <input
        :id="att"
        type="checkbox"
        :name="att"
        :checked="!filteredAttributes.includes(att)"
        :value="i"
        class="self-center cursor-pointer"
        @change="changeFilter(i)"
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TableFilter",
  computed: {
    ...mapState(["attributes", "filteredAttributes"])
  },
  methods: {
    changeFilter(i) {
      const att = this.attributes[i]
      if (this.filteredAttributes.includes(att)) {
        this.filteredAttributes.splice(this.filteredAttributes.indexOf(att), 1)
      } else {
        this.filteredAttributes.push(att)
      }
      window.localStorage.setItem("filteredAttributes", JSON.stringify(this.filteredAttributes));
    }  
  }
}
</script>
