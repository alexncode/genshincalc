<template>
  <div
    id="app"
    class="absolute inset-0 grid grid-cols-1 justify-items-center max-h-screen"
  >
    <div class="font-bold overflow-y-auto px-2">
      <div class="flex">
        <div @click="characterPick = false">
          <Modal v-if="characterPick">
            <CharacterPick @visibility="characterPick = false" />
          </Modal>
        </div>
        <div
          @click="characterPick = true"
          class="bg-gray-800 rounded pt-1 px-1 cursor-pointer hover:bg-gray-700"
        >
          <img
            :src="`/img/avatars/${character.charName}.png`"
            :alt="character.charName"
          >
        </div>
        <div class="flex flex-col ml-2 text-gray-200 w-full">
          <div class="flex justify-between">
            <h1 class="text-green-400 text-xl">Genshin impact artifact build simulator v0.8</h1>
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
          <div class="flex mt-1">
            <div>
              Base Attack: <span class="text-blue-300">{{ baseATK[0]}}</span> / <span class="text-blue-300">{{ baseATK[1]}}</span>
            </div>
            <div class="ml-2 border-l-2 pl-2">Base HP: <span class="text-blue-300">{{ character.baseHP }}</span></div>
            <div class="mx-2 border-l-2 pl-2">Base defense: <span class="text-blue-300">{{ character.baseDEF }}</span></div>
          </div>
        </div>
      </div>
      <div class="flex flex-col md:flex-row">
        <div>
          <div class="flex justify-between">
            <Set :side="0" />
            <Weapon side="0" />
          </div>
          <Artifact
            v-for="artifact in artifacts[0]"
            :key="artifact.key"
            :artifact="artifact"
            side="0"
          />
          <Additional side="0" />
        </div>
        <div class="flex md:flex-col justify-center mx-2 px-2 border-l-2 border-r-2 border-gray-700">
          <button
            class="bg-gray-600 text-gray-100 rounded w-8"
            title="Equalize artifacts"
            @click="equalize"
          >=</button>
          <button
            class="bg-gray-600 text-gray-100 rounded w-8 mx-2 md:my-2 md:mx-0"
            title="Randomize substats"
            @click="randomize"
          >&#10227;</button>
          <button
            class="bg-gray-600 text-gray-100 rounded w-8"
            title="Save & Load"
            @click="save"
          >&#128190;</button>
        </div>
        <div class="md:pl-4">
          <div class="flex justify-between">
            <Set :side="1" />
            <Weapon side="1" />
          </div>
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
          :allResults="allResults"
          :atkPower="atkPower"
        />
        <Reactions
          v-show="activeTab == 'Elemental reactions'"
          :EM="allResults[9]"
          :hero="characters[character]"
          :set="set"
        />
      </div>
    </div>
    <div @click="save">
      <Modal v-if="showSave">
        <Save
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
      artifacts: [artifactsList, JSON.parse(JSON.stringify(artifactsList))],
      characters: characters,
      sets: sets,
      attributes: [
        "Attack",
        "Physical attack",
        "Elemental attack",
        "Normal attack",
        "Charged attack",
        "Crit chance%",
        "Crit damage%",
        "Elemental bonus%",
        "Physical bonus%",
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
    ...mapFields(["character", "set", "additionalStats", "weapon"]),
    baseATK() {
      return Object.keys(this.weapon).map(
        (x) => this.weapon[x].baseATK + this.character.baseATK
      );
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
      let allEquip = [this.artifacts, sets];
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
      const wp = this.weapon;
      for (let i = 0; i < 2; i++) {
        allStatsRes[i][ch.name] =
          allStatsRes[i][ch.name] + ch.value || ch.value;
        ch.talentsBonus
          .filter((x) => x.active)
          .forEach(
            (x) =>
              (allStatsRes[i][x.name] =
                allStatsRes[i][x.name] + x.value || x.value)
          );
        allStatsRes[i][wp[i].name] =
          allStatsRes[i][wp[i].name] + wp[i].value || wp[i].value;
        wp[i].additional
          .filter((x) => x.active)
          .forEach(
            (x) =>
              (allStatsRes[i][x.name] =
                allStatsRes[i][x.name] + x.value || x.value)
          );
      }

      return allStatsRes;
    },
    atkPower() {
      return this.sumAllStats.map((x, i) => {
        return Math.round(
          this.baseATK[i] * (1 + x["ATK%"] / 100) + x["FlatATK"]
        );
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
      const elem = this.sumAllStats.map((x) => x["Elemental%"]);
      const phys = this.sumAllStats.map((x) => x["Physical%"]);
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
        elem,
        phys,
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
          percent: cs ? (((x[1] - x[0]) / Math.abs(x[0])) * 100).toFixed(1) : 0,
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
