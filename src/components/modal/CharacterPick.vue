<template>
  <div
    class="max-w-screen-md bg-gray-800 rounded flex flex-col md:flex-row overflow-y-auto max-h-screen"
    @click.stop
  >
    <div class="flex flex-wrap md:w-4/6">
      <div
        v-for="(char, key) in characters"
        :key="key"
        class="m-2 cursor-pointer rounded"
        :class="char.rarity == 4 ? 'hover:bg-purple-500' : 'hover:bg-amber-400'"
        @click="name = key"
      >
        <img
          :src="`/img/avatars/${key}.png`"
          :alt="key"
          :title="key"
        >
      </div>
    </div>
    <div class="md:w-2/6 text-gray-200 flex flex-col p-2">
      <h3 class="text-xl text-center">{{ name }}</h3>
      <div class="flex justify-between">
        <label for="ll">
          Lvl:
          <select
            type="text"
            name="level"
            id="ll"
            v-model="charLvl"
            class="text-gray-800"
          >
            <option
              v-for="lvl in lvlList"
              :key="lvl"
              :value="lvl"
            >{{ lvl }}</option>
          </select>
        </label>
        <label for="tl">
          Talent lvl:
          <select
            type="text"
            name="talent"
            id="tl"
            v-model="talentLvl"
            class="text-gray-800"
          >
            <option
              v-for="lvl in 15"
              :key="lvl"
              :value="lvl"
            >{{ lvl }}</option>
          </select>
        </label>
      </div>
      <div class="flex flex-col justify-between flex-grow mt-2">
        <div>
          <div class="flex justify-between">
            Secondary stat: <span class="text-gray-400">{{charactersData[name][charLvl].name}}</span>
            <span class="text-blue-300"> {{charactersData[name][charLvl].value}}</span>
          </div>
          <div class="flex justify-between">
            Base HP: <span class="text-yellow-200">{{charactersData[name][charLvl].baseHP}}</span>
          </div>
          <div class="flex justify-between">
            Base ATK: <span class="text-yellow-200">{{charactersData[name][charLvl].baseATK}}</span>
          </div>
          <div class="flex justify-between">
            Base DEF: <span class="text-yellow-200">{{charactersData[name][charLvl].baseDEF}}</span>
          </div>
          <div
            v-if="characters[name].talentsBonus.length"
            class="mt-2"
          >
            <div class="text-green-200">Talent bonuses:</div>
            <div
              v-for="bonus in characters[name].talentsBonus"
              :key="bonus.desc"
              class="flex mt-1 text-blue-200"
            >
              <div>{{ bonus.desc }}</div>
              <input
                type="checkbox"
                name="talent"
                id="bonus"
                v-model="bonus.active"
                class="self-center"
              >
            </div>
          </div>
        </div>
        <button
          class="bg-green-700 px-2 py-1 w-full rounded hover:bg-green-800 font-bold mt-1"
          @click="setCharacter"
        >OK</button>
      </div>
    </div>
  </div>
</template>

<script>
import { characters, charactersData, getCharData } from "@/data/characters";
import { baseATK, bonus, weaponList, getWeaponData } from "@/data/weapons";

import { mapFields } from "vuex-map-fields";

export default {
  name: "CharacterPick",
  data() {
    return {
      characters,
      note: true,
      baseATK,
      bonus,
      weaponList,
      charactersData,
      name: "Keqing",
      charLvl: 1,
      talentLvl: 0,
      lvlList: [
        1,
        20,
        "20+",
        40,
        "40+",
        50,
        "50+",
        60,
        "60+",
        70,
        "70+",
        80,
        "80+",
        90,
      ],
    };
  },
  mounted() {
    this.name = this.character.charName;
    this.charLvl = this.character.charLvl;
    this.talentLvl = this.character.talentLvl;
  },
  computed: {
    ...mapFields(["character", "weapon"]),
    available() {
      const wp = this.character.weapon;
      const list = Object.keys(this.weaponList).filter(
        (x) => this.weaponList[x].type == wp
      );
      const weapon = list[list.length - 1];
      const result = getWeaponData(weapon);
      return result;
    },
  },
  methods: {
    setCharacter() {
      const charData = getCharData(this.name, this.charLvl, this.talentLvl - 1);
      if (
        this.character.charName != this.name &&
        charData.weapon != this.character.weapon
      ) {
        this.weapon = {
          0: this.available,
          1: JSON.parse(JSON.stringify(this.available)),
        };
      }
      this.character = charData;
      this.$emit("visibility");
    },
  },
};
</script>

<style>
.w-480 {
  width: 480px;
}
</style>