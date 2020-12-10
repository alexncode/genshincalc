<template>
  <div
    id="app"
    class="absolute inset-0 grid grid-cols-1 justify-items-center max-h-screen"
  >
    <div class="font-bold overflow-y-auto px-2">
      <div class="flex justify-between">
        <h1 class="text-green-400 text-xl">Genshin impact artifact build simulator v0.7</h1>
        <div class="flex">
          <div
            class="text-blue-400 mr-2 cursor-pointer"
            @click="showHelp = true"
          >Help</div>
          <div><a
              class="text-blue-400"
              href="mailto:alexnkcode@gmail.com"
              target="_blank"
            >Feedback</a></div>
        </div>
      </div>
      <div class="flex">
        <div @click="characterPick = false">
          <Modal v-if="characterPick">
            <CharacterPick v-model="character" />
          </Modal>
        </div>
        <div
          @click="characterPick = true"
          class="bg-gray-800 rounded pt-1 px-1 cursor-pointer hover:bg-gray-700"
        >
          <img
            :src="`/img/avatars/${character.name}.png`"
            :alt="character.name"
          >
        </div>
        <div class="flex mb-2 flex-shrink items-center">
          <label
            for="baseATK"
            class="mx-2 border-l-2 pl-2"
          >Base attack<input
              class="w-12 text-gray-900 ml-2"
              type="text"
              id="baseATK"
              v-model.number="baseATK"
            ></label>
          <label
            for="baseHP"
            class="mx-2 border-l-2 pl-2"
          >Base HP <input
              class="w-16 text-gray-900 ml-2"
              type="text"
              id="baseHP"
              v-model.number="character.baseHP"
            ></label>
          <label
            for="baseDEF"
            class="mx-2 border-l-2 pl-2"
          >Base defense <input
              class="w-12 text-gray-900 ml-2"
              type="text"
              id="baseDEF"
              v-model.number="character.baseDEF"
            ></label>
        </div>
      </div>
      <div class="flex">
        <div>
          <Set :side="0" />
          <Weapon
            :weapon="weapons[0].standart"
            side="0"
          />
          <Artifact
            v-for="artifact in artifacts[0]"
            :key="artifact.key"
            :artifact="artifact"
            side="0"
          />
          <Additional side="0" />
        </div>
        <div class="flex flex-col justify-center mx-2 px-2 border-l-2 border-r-2 border-gray-700">
          <button
            class="bg-gray-600 text-gray-100 rounded w-8"
            title="Equalize artifacts"
            @click="equalize"
          >=</button>
          <button
            class="bg-gray-600 text-gray-100 rounded w-8 mt-2"
            title="Randomize substats"
            @click="randomize"
          >&#10227;</button>
          <button
            class="bg-gray-600 text-gray-100 rounded w-8 mt-2"
            title="Save & Load"
            @click="save"
          >&#128190;</button>
        </div>
        <div class=" pl-4">
          <Set :side="1" />
          <Weapon
            :weapon="weapons[1].standart"
            side="1"
          />
          <Artifact
            v-for="artifact in artifacts[1]"
            :key="artifact.key"
            :artifact="artifact"
            side="1"
          />
          <Additional side="1" />
        </div>
      </div>
      <div class=" bg-gray-700 rounded mt-4 px-2 pb-2">
        <div class="flex border-gray-800 border-b-2 box-border text-gray-200">
          <TabButton
            v-for="tab in ['Stats', 'Damage', 'Elemental reactions']"
            :key="tab"
            :name="tab"
            :active="activeTab == tab"
            @click="changeTab(tab)"
          />
        </div>
        <StatTable
          :attributes="attributes"
          :allResults="allResultsFormatted"
          v-show="activeTab == 'Stats'"
          class="overflow-y-auto"
        />
        <Damage
          v-show="activeTab == 'Damage'"
          :sumAllStats="sumAllStats"
          :atkPower="atkPower"
        />
        <Reactions
          v-show="activeTab == 'Elemental reactions'"
          :EM="allResults[7]"
          :hero="characters[character]"
          :set="set"
        />
      </div>
    </div>
    <div @click="save">
      <Modal v-if="showSave">
        <Save
          :weapons="weapons"
          :artifacts="artifacts"
          @loadSave="loadSave"
        />
      </Modal>
    </div>
    <div @click="showHelp = false">
      <Modal v-if="showHelp">
        <Help />
      </Modal>
    </div>
  </div>
</template>

<script>
import Artifact from "@/components/Artifact.vue";
import Weapon from "@/components/Weapon.vue";
import Set from "@/components/Set.vue";
import StatTable from "@/components/StatTable.vue";
import Damage from "@/components/Damage.vue";
import Reactions from "@/components/Reactions.vue";
import Modal from "@/components/modal/Modal.vue";
import CharacterPick from "@/components/modal/CharacterPick.vue";
import Additional from "@/components/Additional.vue";
import Save from "@/components/Save.vue";
import Help from "@/components/Help.vue";

import TabButton from "@/components/UI/TabButton.vue";

import { artifactsList } from "@/data/artifacts";
import { characters } from "@/data/characters";
import { weapons } from "@/data/weapons";
import { sets } from "@/data/sets";

import { mapFields } from "vuex-map-fields";

function generateResObject() {
  return {
    "HP%": 0,
    "ATK%": 0,
    "DEF%": 0,
    EM: 0,
    HP: 0,
    FlatDEF: 0,
    FlatATK: 0,
    "CRate%": 0,
    "CDmg%": 0,
    "Healing%": 0,
    "Elemental%": 0,
    "Physical%": 0,
    "EnRe%": 0,
    "Charged%": 0,
    "NormalATK%": 0,
    "NCATK%": 0,
    "SkillDMG%": 0,
    "Burst%": 0,
    "AllDMG%": 0,
    Melt: 0,
    Vaporize: 0,
    Overload: 0,
    Superconduct: 0,
    "Electro-charged": 0,
    Swirl: 0,
    Shattered: 0,
  };
}

export default {
  name: "App",
  components: {
    Artifact,
    Weapon,
    Set,
    StatTable,
    Damage,
    TabButton,
    Reactions,
    Modal,
    CharacterPick,
    Additional,
    Save,
    Help,
  },
  data() {
    return {
      // character: "Keqing",
      artifacts: [artifactsList, JSON.parse(JSON.stringify(artifactsList))],
      characters: characters,
      weapons: [weapons, JSON.parse(JSON.stringify(weapons))],
      sets: sets,
      // set: [
      //   { pieces: "4pcs", set: ["Gladiator's Finale", "none"] },
      //   { pieces: "4pcs", set: ["Bloodstained Chivalry", "none"] },
      // ],
      attributes: [
        "Attack",
        "Physical attack",
        "Elemental attack",
        "Normal attack",
        "Charged attack",
        "Crit chance%",
        "Crit damage%",
        "Elemental mastery",
        "Energy recharge%",
        "Defense",
        "Health points",
      ],
      refreshing: false,
      activeTab: "Stats",
      characterPick: false,
      showSave: false,
      showHelp: false,
    };
  },
  created() {
    document.addEventListener("swUpdated", this.updateAvailable, {
      once: true,
    });
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;

      window.location.reload();
    });
  },
  watch: {
    sumAllStats(val) {
      this.$store.commit("SET_ALL_STATS", val);
    },
  },
  computed: {
    ...mapFields(["character", "set", "additionalStats"]),
    baseATK: {
      get() {
        return this.$store.getters.baseATK;
      },
      set(val) {
        this.$store.commit("SET_BASE_ATK", val);
      },
    },
    sumAllStats() {
      let allStatsRes = [generateResObject(), generateResObject()];
      let sets = this.set.map((x) => {
        let result = {};
        if (x.set[0] != "none") {
          if (x.pieces == "4pcs") {
            result = {
              a: this.sets[x.set[0]]["2pcs"],
              b: this.sets[x.set[0]]["4pcs"],
            };
          } else {
            if (x.set[1] != "none") {
              result = {
                a: this.sets[x.set[0]]["2pcs"],
                b: this.sets[x.set[1]]["2pcs"],
              };
            } else {
              result = { a: this.sets[x.set[0]]["2pcs"] };
            }
          }
        }
        return result;
      });
      let allEquip = [this.weapons, this.artifacts, sets];
      for (const equip of allEquip) {
        equip.forEach((x, i) => {
          for (const key in x) {
            if (Object.prototype.hasOwnProperty.call(x[key], "mainStatName")) {
              let name = x[key].mainStatName;
              allStatsRes[i][name] =
                allStatsRes[i][name] + x[key].value || x[key].value;
            }
            if (Object.prototype.hasOwnProperty.call(x[key], "substats")) {
              x[key].substats.forEach((substat) => {
                let name = substat.name;
                allStatsRes[i][name] =
                  allStatsRes[i][name] + substat.value || substat.value;
              });
            }
            if (Object.prototype.hasOwnProperty.call(x[key], "name")) {
              let name = x[key].name;
              allStatsRes[i][name] =
                allStatsRes[i][name] + x[key].value || x[key].value;
            }
            if (Object.prototype.hasOwnProperty.call(x[key], "additional")) {
              x[key].additional.forEach((substat) => {
                let name = substat.name;
                allStatsRes[i][name] =
                  allStatsRes[i][name] + substat.value || substat.value;
              });
            }
          }
        });
      }
      this.additionalStats.forEach((side, i) => {
        side.forEach((stat) => {
          allStatsRes[i][stat.stat] =
            allStatsRes[i][stat.stat] + stat.value || stat.value;
        });
      });
      const ch = this.character;
      allStatsRes[0][ch.stat] = allStatsRes[0][ch.stat] + ch.value || ch.value;
      allStatsRes[1][ch.stat] = allStatsRes[1][ch.stat] + ch.value || ch.value;
      return allStatsRes;
    },
    atkPower() {
      return this.sumAllStats.map((x) => {
        return Math.round(this.baseATK * (1 + x["ATK%"] / 100) + x["FlatATK"]);
      });
    },
    critDmg() {
      return this.sumAllStats.map((x) => {
        return ((50 + x["CDmg%"]) / 100) * ((5 + x["CRate%"]) / 100);
      });
    },
    physAtk() {
      return this.sumAllStats.map((x, i) => {
        let phys =
          this.atkPower[i] * (1 + (x["Physical%"] + x["AllDMG%"]) / 100);
        return Math.round(phys + phys * this.critDmg[i]);
      });
    },
    normalAtk() {
      return this.sumAllStats.map((x, i) => {
        let phys =
          this.atkPower[i] *
          (1 +
            (Math.max(x["Physical%"], x["Elemental%"]) +
              x["NormalATK%"] +
              x["AllDMG%"] +
              x["NCATK%"]) /
              100);
        return Math.round(phys + phys * this.critDmg[i]);
      });
    },
    chargedAtk() {
      return this.sumAllStats.map((x, i) => {
        let phys =
          this.atkPower[i] *
          (1 +
            (Math.max(x["Physical%"], x["Elemental%"]) +
              x["Charged%"] +
              x["AllDMG%"] +
              x["NCATK%"]) /
              100);
        return Math.round(phys + phys * this.critDmg[i]);
      });
    },
    elemAtk() {
      return this.sumAllStats.map((x, i) => {
        let elem =
          this.atkPower[i] * (1 + (x["Elemental%"] + x["AllDMG%"]) / 100);
        return Math.round(elem + elem * this.critDmg[i]);
      });
    },
    allResults() {
      const critChance = this.sumAllStats.map(
        (x) => Math.round((x["CRate%"] + 5) * 10) / 10
      );
      const critDamage = this.sumAllStats.map(
        (x) => Math.round((x["CDmg%"] + 50) * 10) / 10
      );
      const EM = this.sumAllStats.map((x) => x["EM"]);
      const EnRe = this.sumAllStats.map(
        (x) => Math.round(x["EnRe%"] * 10) / 10
      );
      const DEF = this.sumAllStats.map((x) =>
        Math.round(
          this.character.baseDEF * (1 + x["DEF%"] / 100) + x["FlatDEF"]
        )
      );
      const HP = this.sumAllStats.map((x) =>
        Math.round(this.character.baseHP * (1 + x["HP%"] / 100) + x["HP"])
      );

      return [
        this.atkPower,
        this.physAtk,
        this.elemAtk,
        this.normalAtk,
        this.chargedAtk,
        critChance,
        critDamage,
        EM,
        EnRe,
        DEF,
        HP,
      ];
    },
    allResultsFormatted() {
      return this.allResults.map((x) => {
        let cs = "";
        if (x[0] < x[1]) {
          cs = "text-green-400";
        }
        if (x[0] > x[1]) {
          cs = "text-red-400";
        }
        return {
          class: cs,
          value: x,
          percent: cs
            ? (((x[1] - x[0]) / Math.abs((x[1] + x[0]) / 2)) * 100).toFixed(1)
            : 0,
        };
      });
    },
  },
  methods: {
    updateAvailable(event) {
      const registration = event.detail;
      if (!registration || !registration.waiting) return;
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    },
    equalize() {
      // this.artifacts[1] = JSON.parse(JSON.stringify(this.artifacts[0]));
      for (const art in this.artifacts[1]) {
        this.artifacts[1][art].value = this.artifacts[0][art].value;
        this.artifacts[1][art].rarity = this.artifacts[0][art].rarity;
        this.artifacts[1][art].mainStatName = this.artifacts[0][
          art
        ].mainStatName;
        this.artifacts[1][art].substats = JSON.parse(
          JSON.stringify(this.artifacts[0][art].substats)
        );
      }
      // this.$forceUpdate();
    },
    randomize() {
      this.artifacts.forEach((side) => {
        for (const artifact in side) {
          side[artifact].key = "" + Math.floor(Math.random() * 999999);
        }
      });
    },
    changeTab(name) {
      this.activeTab = name;
    },
    save() {
      this.showSave = !this.showSave;
    },
    loadSave(data) {
      this.artifacts = data.artifacts;
      this.weapons = data.weapons;
      this.showSave = !this.showSave;
    },
  },
};
</script>

<style>
#app {
  background-color: #1b2027;
}

.grid-center {
  grid-template-columns: auto 1fr auto;
}

input {
  text-align: center;
  border-radius: 3px;
}
</style>
