<template>
  <div
    class="max-w-screen-md bg-gray-800 rounded flex flex-col md:flex-row overflow-y-auto max-h-screen"
    @click.stop
  >
    <div class="md:w-4/6">
      <div class="flex justify-end">
        <div class="flex gap-1 bg-gray-700 rounded">
          <div 
          class="text-gray-300 bg-gray-600 rounded hover:bg-blueGray-700 cursor-pointer"
          @click="filterBy('All')"
          >
            ALL
          </div>
          <img 
            class="bg-gray-600 rounded hover:bg-blueGray-700 cursor-pointer"
            v-for="el in ['Anemo', 'Geo', 'Electro', 'Fire', 'Water', 'Ice']" 
            :key="el" 
            :src="`/img/elements/${el}.png`" alt="element pic"
            width="24px"
            @click="filterBy(el)"
          >
        </div>
      </div>
      <div class="flex flex-wrap">
      <div class="hidden hover:bg-purple-500 hover:bg-amber-400"></div>
      <div
        v-for="(char, key) in characters"
        :key="key"
        class="m-2 cursor-pointer rounded"
        :class="[
          'hover:'+ rarityColor(key),
          key == name ? rarityColor(key) : ''
         ]"
        @click="name = key"
      >
        <img
          :src="`/img/avatars/${key}.png`"
          :alt="key"
          :title="key"
        >
      </div>
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
                class="self-center ml-2"
              >
            </div>
          </div>
          <div
            v-if="characters[name].constellationBonus"
            class="mt-2"
          >
            <div class="text-green-200">Constellation Bonuses:</div>
            <div
              v-for="bonus in characters[name].constellationBonus"
              :key="bonus.desc"
              class="flex mt-1 text-blue-200"
            >
              <div><span class="text-amber-300">c{{bonus.c}}</span> {{ bonus.desc }}</div>
              <input
                type="checkbox"
                name="talent"
                id="bonus"
                v-model="bonus.active"
                class="self-center ml-2"
              >
            </div>
          </div>
          <div  
            v-if="characters[name].stackBonus"
            class="mt-2"
          >
            <div v-if="characters[name].stackBonus.burst">
              <div class="text-green-200">Burst bonus:</div>
              <div class="text-blue-200">{{ burstBonusDesc }}</div>
            </div>
            <div v-if="characters[name].stackBonus.normal">
              <div class="text-green-200">Normal ATK bonus:</div>
              <div class="text-blue-200">{{ normalBonusDesc }}</div>
            </div>
            <label>Stacks:
              <input class="text-gray-900 w-12" type="number" min="0" :max="characters[name].stackBonus.max" 
                :value="characters[name].stackBonus.stacks" @input="stacks = $event.target.value"
              >
            </label>
            
          </div>
        </div>
        <button
          class="bg-green-700 px-2 py-1 w-full rounded hover:bg-green-800 font-bold mt-1 mb-4 md:mb-1"
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
      filtered: "All",
      stacks: 0,
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
      const wp = getCharData(this.name, this.charLvl, this.talentLvl - 1)
        .weapon;
      const list = Object.keys(this.weaponList).filter(
        (x) => this.weaponList[x].type == wp
      );
      const weapon = list[list.length - 1];
      const result = getWeaponData(weapon);
      return result;
    },
    characters() {
      if (this.filtered == "All") return characters
      else {
        const chars = {}
        Object.values(characters).forEach(char =>
            char.element == this.filtered ? chars[char.charName] = char : null
          )
        this.changeName(Object.keys(chars)[0])
        return chars
      }
    },
    burstBonus() {
      let bonus = 0
      const sb = this.characters[this.name].stackBonus
      if  (sb.burst) {
        bonus = Math.floor(sb.burst.perStack[this.talentLvl] * this.stacks * 10) / 10
      }
      return bonus
    },
    normalBonus() {
      let bonus = 0
      const sb = this.characters[this.name].stackBonus
      if  (sb.normal) {
        bonus = Math.floor(sb.normal.perStack[this.talentLvl] * this.stacks * 10) / 10
      }
      return bonus
    },
    normalBonusDesc() {
      return this.characters[this.name].stackBonus.normal.desc([this.normalBonus])
    },
    burstBonusDesc() {
      return this.characters[this.name].stackBonus.burst.desc([this.burstBonus])
    }
  },
  watch: {
    stacks() {
      if (this.characters[this.name].stackBonus) {
        this.characters[this.name].stackBonus.stacks = this.stacks
      }
    }
  },
  methods: {
    setCharacter() {
      if (this.stacks > 0 && this.characters[this.name].stackBonus) {
        this.characters[this.name].stackBonus.stacks = this.stacks
      }

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
    rarityColor(name) {
      return characters[name].rarity == 4
        ? "bg-purple-500"
        : "bg-amber-400";
    },
    filterBy(val) {
      this.filtered = val
    },
    changeName(name) {
      this.name = name
    }
  },
};
</script>

<style>
.w-480 {
  width: 480px;
}
</style>