<template>
  <div
    id="app"
    class="absolute inset-0 grid grid-cols-1 justify-items-center"
  >
    <div class="font-bold overflow-y-auto px-2">
      <h1 class="text-green-400 text-center text-2xl">Genshin impact artifact build simulator v0.5</h1>
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
            :src="`/img/avatars/${character}.png`"
            :alt="character"
          >
        </div>
        <div class="flex mb-2 flex-shrink content-center items-center">
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
              v-model.number="baseHP"
            ></label>
          <label
            for="baseDEF"
            class="mx-2 border-l-2 pl-2"
          >Base defense <input
              class="w-12 text-gray-900 ml-2"
              type="text"
              id="baseDEF"
              v-model.number="baseDEF"
            ></label>
        </div>
      </div>
      <div class="flex">
        <div>
          <Set
            :sets="sets"
            v-model="set[0]"
            side="0"
          />
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
        </div>
        <div class=" pl-4">
          <Set
            :sets="sets"
            v-model="set[1]"
            side="1"
          />
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
        />
      </div>
      <div class="mt-2 text-right"><a
          class="text-blue-400"
          href="mailto:alexnkcode@gmail.com"
          target="_blank"
        >Feedback</a></div>
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

import TabButton from "@/components/UI/TabButton.vue";

import { artifactsList } from "@/data/artifacts";
import { characters } from "@/data/characters";
import { weapons } from "@/data/weapons";
import { sets } from "@/data/sets";

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
  },
  data() {
    return {
      character: "Keqing",
      artifacts: [artifactsList, JSON.parse(JSON.stringify(artifactsList))],
      characters: characters,
      weapons: [weapons, JSON.parse(JSON.stringify(weapons))],
      baseATK: 720,
      baseHP: 12182,
      baseDEF: 743,
      sets: sets,
      set: [
        { pieces: "4pcs", set: ["Gladiator's Finale", "none"] },
        { pieces: "4pcs", set: ["Bloodstained Chivalry", "none"] },
      ],
      attributes: [
        "Attack",
        "Physical attack",
        "Elemental attack",
        "Crit chance%",
        "Crit damage%",
        "Normal attack",
        "Charged attack",
        "Elemental mastery",
        "Energy recharge%",
        "Defense",
        "Health points",
      ],
      refreshing: false,
      activeTab: "Stats",
      characterPick: false,
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
  computed: {
    sumAllStats() {
      const allStats = [
        "HP%",
        "ATK%",
        "DEF%",
        "EM",
        "HP",
        "FlatDEF",
        "FlatATK",
        "CRate%",
        "CDmg%",
        "Healing%",
        "Elemental%",
        "Physical%",
        "EnRe%",
        "Charged%",
        "NormalATK%",
        "NCATK%",
        "SkillDMG%",
        "AllDMG%",
      ];
      let allStatsRes = [{}, {}];
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
      for (const name of allStats) {
        for (const equip of allEquip) {
          equip.forEach((x, i) => {
            for (const key in x) {
              if (
                Object.prototype.hasOwnProperty.call(x[key], "mainStatName")
              ) {
                const value = x[key].mainStatName == name ? x[key].value : 0;
                allStatsRes[i][name] = allStatsRes[i][name] + value || value;
              }
              if (Object.prototype.hasOwnProperty.call(x[key], "substats")) {
                x[key].substats.forEach((substat) => {
                  const value = (substat.name == name) * substat.value;
                  allStatsRes[i][name] = allStatsRes[i][name] + value || value;
                });
              }
              if (Object.prototype.hasOwnProperty.call(x[key], "name")) {
                const value = x[key].name == name ? x[key].value : 0;
                allStatsRes[i][name] = allStatsRes[i][name] + value || value;
              }
            }
          });
        }
      }
      const ch = this.characters[this.character];
      allStatsRes[0][ch.name] = allStatsRes[0][ch.name] + ch.value || ch.value;
      allStatsRes[1][ch.name] = allStatsRes[1][ch.name] + ch.value || ch.value;
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
          this.baseDEF + this.baseDEF * (x["DEF%"] / 100) + x["FlatDEF"]
        )
      );
      const HP = this.sumAllStats.map((x) =>
        Math.round(this.baseHP + this.baseHP * (x["HP%"] / 100) + x["HP"])
      );

      return [
        this.atkPower,
        this.physAtk,
        this.elemAtk,
        critChance,
        critDamage,
        this.normalAtk,
        this.chargedAtk,
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
          percent: cs ? ((x[1] - x[0]) / Math.abs((x[1] + x[0]) / 2)) * 100 : 0,
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
      this.$store.commit("SET_ELEMENTAL_DAMAGE", true);
      this.activeTab = name;
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
