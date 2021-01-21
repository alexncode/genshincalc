<template>
  <div
    class="bg-gray-700 p-2 text-gray-200 hw-save flex flex-col justify-between"
    @click.stop
  >
    <div class="flex flex-col flex-grow min-h-0">
      <h2 class="text-2xl text-center">Save & Load</h2>
      <div class="overflow-y-auto my-2">
        <div
          v-for="(name, i) in saveNames"
          :key="name"
          class="flex justify-between p-1 mt-1 bg-gray-800"
        >
          <div class="flex">
            <div class="mr-2 font-bold">{{ i+1 }}.</div>
            <div class="whitespace-nowrap mr-2">{{ name }}</div>
          </div>
          <div>
            <button
              class="bg-gray-600 rounded px-2 w-14 hover:text-green-500"
              @click="load(name)"
            >LOAD</button>
            <button
              class="bg-gray-600 rounded px-2 w-14 hover:text-red-500 ml-2"
              @click="del(i)"
            >DEL</button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div
        v-if="errorMessage"
        class="text-red-500 font-bold"
      >
        The save with that name already exist.
      </div>
      <div class="mt-2 flex justify-between">
        <input
          type="text"
          name=""
          id=""
          v-model="saveName"
          class="text-gray-800 w-full text-left px-2"
        >
        <button
          class="bg-gray-600 rounded ml-2 px-2 w-14 hover:text-green-500"
          @click="save"
        >SAVE</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  name: "Save",
  data() {
    return {
      saveName: "New save",
      saveNames: JSON.parse(window.localStorage.getItem("saveNames")) || [],
      errorMessage: false,
    };
  },
  computed: {
    ...mapFields([
      "character",
      "set",
      "additionalStats",
      "weapon",
      "artifacts",
    ]),
  },
  methods: {
    save() {
      const saveData = {
        character: this.character,
        sets: this.set,
        additionalStats: this.additionalStats,
        weapon: this.weapon,
        artifacts: this.artifacts,
      };
      if (this.saveNames.includes(this.saveName)) {
        this.errorMessage = true;
      } else {
        this.errorMessage = false;
        this.saveNames.push(this.saveName);
        window.localStorage.setItem(
          "saveNames",
          JSON.stringify(this.saveNames)
        );
        window.localStorage.setItem(this.saveName, JSON.stringify(saveData));
      }
    },
    load(name) {
      const loadData = JSON.parse(window.localStorage.getItem(name));
      this.set = loadData.sets;
      this.character = loadData.character;
      this.weapon = loadData.weapon;
      this.artifacts = loadData.artifacts;
      this.$emit("visibility");
    },
    del(index) {
      window.localStorage.removeItem(this.saveNames[index]);
      this.saveNames.splice(index, 1);
      window.localStorage.setItem("saveNames", JSON.stringify(this.saveNames));
    },
  },
};
</script>

<style>
.hw-save {
  height: 60vh;
  width: 460px;
}
</style>