<template>
  <div>
    <div
      @click="showWeapons = true"
      class="bg-gray-700 rounded pt-1 px-1 cursor-pointer hover:bg-gray-600"
    >
      <img
        :src="`/img/weapons/${character.weapon}.png`"
        :alt="character.weapon"
        :title="weapon[side].weaponName"
      >
    </div>
    <div @click="showWeapons = false">
      <Modal v-if="showWeapons">
        <Weapons
          :side="side"
          @visibility="showWeapons = false"
        />
      </Modal>
    </div>
  </div>
</template>

<script>
import Weapons from "@/components/modal/Weapons.vue";
import Modal from "@/components/modal/Modal.vue";

import { mapFields } from "vuex-map-fields";

export default {
  name: "Weapon",
  components: {
    Weapons,
    Modal,
  },
  props: {
    side: String,
  },
  data() {
    return {
      showWeapons: false,
    };
  },
  computed: {
    ...mapFields(["character", "weapon"]),
  },
  methods: {},
};
</script>