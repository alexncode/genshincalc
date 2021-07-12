<template>
  <div
    class="flex flex-col md:flex-row max-w-screen-md bg-gray-800 rounded text-gray-200 overflow-y-auto max-h-screen"
    @click.stop
  >
    <div class="flex flex-wrap items-start md:w-4/6">
      <div
        v-for="wp in available"
        :key="wp"
        class="m-2 cursor-pointer rounded font-bold px-2 py-1 hover:bg-gray-700 border-gray-200"
        :class="weaponClasses[weaponList[wp].rarity]"
        @click="weapon[side].weaponName = wp"
      >
        {{ wp }}
      </div>
    </div>
    <div class="border-l-2 border-gray-500 m-2 pl-2 md:w-2/6 flex flex-col">
      <div class="text-center text-xl mb-2">{{ weapon[side].weaponName }}</div>
      <div class="flex justify-between">
        <label for="ll">
          Lvl:
          <select
            type="text"
            name="level"
            id="ll"
            v-model="weaponLevelInx"
            class="text-gray-800"
          >
            <option
              v-for="(lvl, i) in weaponLevels"
              :key="lvl"
              :value="i"
            >{{ lvl }}</option>
          </select>
        </label>
        <label for="ref">
          Refinement:
          <input
            type="number"
            id="ref"
            class="w-12 text-gray-800"
            min="1"
            max="5"
            v-model="weapon[side].refinement"
          >
        </label>
      </div>
      <div class="flex justify-between">
        <div>Base Attack: </div>
        <div class="text-yellow-300">{{ weaponBaseAttack }}</div>
      </div>
      <div class="flex justify-between">
        <div>Secondary bonus:</div>
        <div><span class="text-green-300">{{ weaponSecondary }}</span> {{currentWeapon.name }}</div>
      </div>
      <div class="flex flex-col justify-between mt-1 flex-grow">
        <div>
          <div
            class="font-normal text-blue-300"
            v-html="description"
          />
          <h3
            class="text-green-200 mt-1"
            v-if="currentWeapon.additional.length"
          >Additional bonuses:</h3>
          <div
            v-for="(addi, i) in currentWeapon.additional"
            :key="addi.name + i"
          >
            <label :for="'effect' + i" v-if="statNames[addi.name]">
              {{ statNames[addi.name] }}
              <input
                type="checkbox"
                name="effect"
                :id="'effect' + i"
                v-model="addi.active"
                class="ml-2"
              >
            </label>
          </div>
        </div>
        <button
          class="bg-green-700 px-2 py-1 w-full rounded hover:bg-green-800 font-bold mt-1 mb-4 md:mb-1"
          @click="setWeapon"
        >OK</button>
      </div>
    </div>
  </div>
</template>

<script>
import { baseATK, bonus, weaponList } from "@/data/weapons";

import { mapFields } from "vuex-map-fields";

export default {
  name: "CharacterPick",
  props: {
    side: String,
  },
  data() {
    return {
      note: true,
      baseATK,
      bonus,
      weaponList,
      weaponClasses: {
        3: "bg-blue-500",
        4: "bg-purple-500",
        5: "bg-amber-600",
      },
      weaponLevelInx: 13,
      weaponLevels: [
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
      statNames: {
        "ATK%": "Attack",
        "NCATK%": "Normal and Charged attack",
        "CRate%": "Crit rate",
        "CDmg%": "Crit damage",
        "AllDMG%": "All damage",
        "NormalATK%": "Normal attack",
        "Charged%": "Charged attack",
        "SkillDMG%": "Skill",
        "Burst%": "Burst",
        "Elemental%": "Elemental damage",
        "DEF%": "Defence",
        "HP%": "Health Points",
        ATKByHP: "Attack by HP%",
        EM: "Elemental Mastery",
      },
    };
  },
  computed: {
    ...mapFields(["character", "weapon"]),
    currentWeapon() {
      return this.weaponList[this.weapon[this.side].weaponName];
    },
    available() {
      const wp = this.character.weapon;
      return Object.keys(this.weaponList).filter(
        (x) => this.weaponList[x].type == wp
      );
    },
    weaponBaseAttack() {
      return this.baseATK[this.currentWeapon.dmg][this.weaponLevelInx];
    },
    secondaryLevel() {
      const levels = [1, 20, 40, 50, 60, 70, 80, 90];
      return levels.indexOf(parseInt(this.weaponLevels[this.weaponLevelInx]));
    },
    weaponSecondary() {
      return this.bonus[this.currentWeapon.value][this.secondaryLevel];
    },
    additionalEffects() {
      let result = this.currentWeapon.additional.map((x) => {
        return {
          name: x.name,
          value: x.value + x.inc * (this.weapon[this.side].refinement - 1),
          active: x.active,
        };
      });
      return result;
    },
    description() {
      let desc = this.currentWeapon.description;
      this.additionalEffects.forEach((x, i) => {
        desc = desc.replace(
          `$eff${i + 1}`,
          `<span class="text-green-300">${x.value}</span>`
        );
      });
      return desc;
    },
  },
  methods: {
    setWeapon() {
      const weapon = {
        weaponName: this.weapon[this.side].weaponName,
        baseATK: this.weaponBaseAttack,
        name: this.currentWeapon.name,
        value: this.weaponSecondary,
        additional: this.additionalEffects,
        refinement: this.weapon[this.side].refinement,
      };
      this.weapon[this.side] = weapon;
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