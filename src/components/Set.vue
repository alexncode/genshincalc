<template>
  <div class="flex items-center mt-1 mb-2">
    <div
      @click="setPick = true"
      class="bg-gray-800 rounded pt-1 px-1 cursor-pointer hover:bg-gray-700"
      
    >
      <img
        :src="`/img/sets/${fileName[0]}.png`"
        :alt="currentSet.set[0]"
        :title="currentSet.set[0]"
        style="background-color: #c28135"
      >
    </div>
    <div
      @click="secondSetPick = true"
      class="bg-gray-800 rounded pt-1 px-1 cursor-pointer hover:bg-gray-700"
      v-if="currentSet.pieces == '2pcs'"
    >
      <img
        :src="`/img/sets/${fileName[1]}.png`"
        :alt="currentSet.set[1]"
        :title="currentSet.set[1]"
        style="background-color: #c28135"
      >
    </div>
    <div class="bg-gray-800 rounded px-1">
      <label
        for="2pcs"
        class="mr-2"
      >2pcs
        <input
          type="radio"
          :id="'2pcs' + side"
          value="2pcs"
          v-model="currentSet.pieces"
        ></label>

      <label for="4pcs">4pcs
        <input
          type="radio"
          :id="'4pcs' + side"
          value="4pcs"
          v-model="currentSet.pieces"
        >
      </label>
    </div>
    <div @click="setPick = false">
      <Modal v-if="setPick">
        <SetPick
          @set-set="setSet"
          @visibility="setPick = !setPick"
          :name="currentSet.set[0]"
        />
      </Modal>
    </div>
    <div @click="secondSetPick = false">
      <Modal v-if="secondSetPick">
        <SetPick
          @set-set="secondSetSet"
          @visibility="secondSetPick = !secondSetPick"
          :name="currentSet.set[1]"
        />
      </Modal>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
// import SetPick from "./modal/SetPick.vue";

import { mapFields } from "vuex-map-fields";

export default {
  name: "Weapon",
  components: {
    Modal,
    SetPick: () =>
      import(/* webpackChunkName: "set" */ "@/components/modal/SetPick.vue"),
  },
  props: {
    side: Number,
  },
  data() {
    return {
      setPick: false,
      secondSetPick: false,
    };
  },
  computed: {
    ...mapFields(["set"]),
    currentSet() {
      return this.set[this.side];
    },
    fileName() {
      return this.currentSet.set.map((x) => x.replaceAll(" ", "_"));
    },
  },
  methods: {
    setSet(name) {
      this.currentSet.set = [name, "none"];
    },
    secondSetSet(name) {
      this.currentSet.set = [this.currentSet.set[0], name];
    },
  },
};
</script>
