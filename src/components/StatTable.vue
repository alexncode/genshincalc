<template>
  <div>
    <table class="table-auto w-full mt-1 text-gray-300 leading-none bg-gray-900 overflow-y-auto">
      <thead>
        <tr>
          <th class="border px-2 py-1 w-2/6">
            Attribute
          </th>
          <th class="border px-2 py-1 w-2/6">
            First set
          </th>
          <th class="border px-2 py-1 w-2/6">
            Second set
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="att in attributesFiltered"
          :key="att.name"
          class="bg-gray-800 even:bg-gray-900"
        >
          <td
            class="border border-gray-600 px-1 py-1 whitespace-nowrap"
            :class="[att.name == 'Elemental mastery' ? 'underline cursor-pointer' : '',
                     formulaList.includes(att.name) ? 'underline cursor-pointer' : '']"
            @click="showModalF(att.name, 2)"
          >
            {{ att.name }}
          </td>
          <td
            v-for="(res, j) in allResultsFormatted[att.index].value"
            :key="'' + res + j"
            class="border border-gray-600 px-1 py-1 text-center"
            :class="[j > 0 ? allResultsFormatted[att.index].class : '', infoList.includes(att.name) ? 'underline cursor-pointer' : '']"
            @click="showModalF(att.name, j)"
          >
            {{ res }}<sup v-if="j > 0 && allResultsFormatted[att.index].class"> {{ allResultsFormatted[att.index].percent }}%</sup>
          </td>
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
          <div>
            Increases damage caused by <span class="text-lightBlue-400">Vaporize</span>
            and <span class="text-lightBlue-300">Melt</span> by {{ melt[0] +' | ' + melt[1] }}%.
          </div>
          <div>
            Also increases damage caused by <span class="text-red-500">Overloaded</span>,
            <span class="text-lightBlue-200">Superconduct</span>,
            <span class="text-purple-500">Electro-Charged</span>,
            <span class="text-lightBlue-100">Shattered</span> and
            <span class="text-emerald-400">Swirl</span> by {{ overload[0] +' | ' + overload[1] }}%.
          </div>
          <div>
            Increases the damage absorption power of shields created through
            <span class="text-yellow-400">Crystallize</span> by {{ crystal[0] +' | ' + crystal[1] }}%.
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
    <div
      v-if="showFormula"
      @click="showFormula = false"
    >
      <Modal>
        <div class="bg-gray-800 text-gray-200 p-4 max-w-screen-md">
          <div v-if="attribute == 'Elemental attack'">
            Formula: <code class="text-blue-300">Attack * (1 + (ElemBonus% + AllBonus%)) * (CritRate% * CritDMG%)</code>
          </div>
          <div v-if="attribute == 'Physical attack'">
            Formula: <code class="text-blue-300">Attack * (1 + (PhysBonus% + AllBonus%)) * (CritRate% * CritDMG%)</code>
          </div>
          <div v-if="attribute == 'Normal attack'">
            Formula: <code class="text-blue-300">Attack * (1 + (max(PhysBonus%, ElemBonus%) + NormalBonus% + AllBonus%)) * (CritRate% * CritDMG%)</code>
          </div>
          <div v-if="attribute == 'Charged attack'">
            Formula: <code class="text-blue-300">Attack * (1 + (max(PhysBonus%, ElemBonus%) + ChargedBonus% + AllBonus%)) * (CritRate% * CritDMG%)</code>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Modal from "./modal/Modal.vue";

import Optimizer from "./modal/Optimizer.vue";

export default {
  name: "StatTable",
  components: { Modal, Optimizer },
  data() {
    return {
      showModal: false,
      showOptimize: false,
      showFormula: false,
      setNumber: 0,
      infoList: [
        "Attack",
        "Physical attack",
        "Elemental attack",
        "Normal attack",
        "Charged attack",
      ],
      formulaList: [
        "Physical attack",
        "Elemental attack",
        "Normal attack",
        "Charged attack",
      ],
      attribute: "Physical attack",
    };
  },
  computed: {
    ...mapState(["filteredAttributes", "attributes"]),
    ...mapGetters(["allResultsFormatted"]),
    melt() {
      return this.allResultsFormatted[11].value.map(
        (em) => Math.round(278 * (em / (em + 1400)) * 10) / 10
      );
    },
    overload() {
      return this.allResultsFormatted[11].value.map(
        (em) => Math.round(1600 * (em / (em + 2000)) * 10) / 10
      );
    },
    crystal() {
      return this.allResultsFormatted[11].value.map(
        (em) => Math.round(444 * (em / (em + 1400)) * 10) / 10
      );
    },
    attributesFiltered() {
      return this.attributes.map((x, i) => ({name: x, index: i})).filter(x => !this.filteredAttributes.includes(x.name))
    }
  },
  methods: {
    showModalF(att, j) {
      this.attribute = att;
      if (att == "Elemental mastery") {
        this.showModal = true;
      }
      if (this.formulaList.includes(att) && j == 2) {
        this.showFormula = true;
      }
      if (this.infoList.includes(att) && j < 2) {
        this.setNumber = j;
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