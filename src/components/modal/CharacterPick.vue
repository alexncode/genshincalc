<template>
  <div class="w-480 bg-gray-800 rounded">
    <p
      v-show="note"
      class="text-gray-100 bg-blue-600 rounded mt-4 px-4 py-2 border-blue-300 border-2 flex justify-between mx-4"
    >
      NOTE: All characters are level 80.
      <span
        class="text-red-400 text-2xl leading-none hover:text-red-300 cursor-pointer"
        @click.stop="note = false"
      >&#11199;</span>
    </p>
    <div class="flex flex-wrap">
      <div
        v-for="(char, key) in characters"
        :key="key"
        class="m-2 cursor-pointer"
        @click="$emit('input', key)"
      >
        <img
          :src="`/img/avatars/${key}.png`"
          :alt="key"
          :title="key"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { characters } from "@/data/characters";

export default {
  name: "CharacterPick",
  data() {
    return {
      characters: characters,
      note: true,
    };
  },
};
</script>

<style>
.w-480 {
  width: 480px;
}
</style>