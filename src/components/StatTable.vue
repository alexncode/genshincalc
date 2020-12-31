<template>
  <div>
    <table class="table-auto w-full mt-1 text-gray-300 leading-none bg-gray-900 overflow-y-auto">
      <thead>
        <tr>
          <th class="border px-2 py-2 w-2/6">Attribute</th>
          <th class="border px-2 py-2 w-2/6">First set</th>
          <th class="border px-2 py-2 w-2/6">Second set</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(att, i) in attributes"
          :key="att"
          class="bg-gray-800 even:bg-gray-900"
        >
          <td
            class="border border-gray-600 px-1 py-1"
            :class="att == 'Elemental mastery' ? 'underline cursor-pointer' : ''"
            @click="showModalF(att)"
          >{{ att }}</td>
          <td
            class="border border-gray-600 px-1 py-1 text-center"
            :class="[j > 0 ? allResults[i].class : '', infoList.includes(att) ? 'underline cursor-pointer' : '']"
            v-for="(res, j) in allResults[i].value"
            :key="'' + res + j"
            @click="showModalF(att, j)"
          >{{ res }}<sup v-if="j > 0 && allResults[i].class"> {{ allResults[i].percent }}%</sup></td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="showModal"
      @click="closeModal"
    >
      <Modal>
        <div class=" bg-blueGray-700 text-gray-200 p-4">
          <div>The higher a character's elemental mastery, the stronger the elemental energy that can be released.</div>
          <div>Increases damage caused by <span class="text-lightBlue-400">Vaporize</span>
            and <span class="text-lightBlue-300">Melt</span> by {{melt[0] +' | ' + melt[1]}}%.</div>
          <div>Also increases damage caused by <span class="text-red-500">Overloaded</span>,
            <span class="text-lightBlue-200">Superconduct</span>,
            <span class="text-purple-500">Electro-Charged</span>,
            <span class="text-lightBlue-100">Shattered</span> and
            <span class="text-emerald-400">Swirl</span> by {{overload[0] +' | ' + overload[1]}}%.
          </div>
          <div>Increases the damage absorption power of shields created through
            <span class="text-yellow-400">Crystallize</span> by {{crystal[0] +' | ' + crystal[1]}}%.
          </div>
        </div>
      </Modal>
    </div>
    <div
      v-if="showOptimize"
      @click="showOptimize = false"
    >
      <Modal>
        <Optimizer
          :attribute="attribute"
          :order="setNumber"
        />
      </Modal>
    </div>
  </div>
</template>

<script>
import Modal from "./modal/Modal.vue";

import Optimizer from "./modal/Optimizer.vue";

export default {
  name: "StatTable",
  components: { Modal, Optimizer },
  props: {
    attributes: Array,
    allResults: Array,
  },
  data() {
    return {
      showModal: false,
      showOptimize: false,
      setNumber: 0,
      infoList: [
        "Attack",
        "Physical attack",
        "Elemental attack",
        "Normal attack",
        "Charged attack",
      ],
      attribute: "Physical attack",
    };
  },
  computed: {
    melt() {
      return this.allResults[9].value.map(
        (em) => Math.round(((1 * em * (25 / 9)) / (em + 1400)) * 1000) / 10
      );
    },
    overload() {
      return this.melt.map((x) => Math.round(x * 2.4 * 10) / 10);
    },
    crystal() {
      return this.melt.map((x) => Math.round(x * 1.5 * 10) / 10);
    },
  },
  methods: {
    showModalF(att, j) {
      if (att == "Elemental mastery") {
        this.showModal = true;
      }
      if (this.infoList.includes(att)) {
        this.setNumber = j;
        this.attribute = att;
        this.showOptimize = true;
      }
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style>
</style>