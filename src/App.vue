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
            <a href="">
              <h1 class="text-green-400 text-xl">Genshin impact artifact build simulator v0.8.5</h1>
            </a>
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
          <!-- <button
            class="bg-gray-600 text-gray-100 rounded w-8 mx-2 md:my-2 md:mx-0"
            title="Share"
            @click="showShare = true"
          >&#8682;</button> -->
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
          :allResults="allResults"
          :atkPower="atkPower"
        />
        <Reactions
          v-show="activeTab == 'Elemental reactions'"
          :EM="allResults[9]"
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
    <div @click="showShare = false">
      <Modal v-if="showShare">
        <div class="bg-gray-900 text-gray-200 p-4 max-w-screen-md flex flex-col">
          <a
            :href="shareLink"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-gray-800"
            ref="link"
          >{{ domen + shareLink }}</a>
          <button
            class="bg-gray-700 px-4 py-2 rounded mt-2 hover:bg-gray-500"
            @click="copyShareLink"
          >Copy link</button>
        </div>
      </Modal>
    </div>
    <transition name="slide">
      <div
        v-if="updateReady"
        class="absolute mx-auto mt-4 left-1/2"
      >
        <div class="flex p-2 items-center bg-gray-700 text-gray-200 rounded relative -left-1/2 shadow-lg">
          <div>New version available</div>
          <div
            class="rounded-xl bg-gray-500 ml-4 px-2 py-1 hover:bg-gray-600 cursor-pointer"
            @click="update"
          >Update</div>
        </div>
      </div>
    </transition>
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

import { getCharData } from "@/data/characters";
import { getWeaponData } from "@/data/weapons";

import { mapFields } from "vuex-map-fields";
import { mapGetters } from "vuex";

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
      activeTab: "Stats",
      characterPick: false,
      showSave: false,
      showHelp: false,
      showShare: false,
      updateReady: false, //New update ready
      refreshing: false, //Page is refreshing
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
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const loadData = decodeURIComponent(urlParams.get("l")).replaceAll(
      "_",
      "%"
    );
    let arr = loadData.split("-");
    if (arr.length == 157) {
      this.loadFromString(arr);
    }
  },
  computed: {
    ...mapFields([
      "character",
      "set",
      "additionalStats",
      "weapon",
      "artifacts",
    ]),
    ...mapGetters(["baseATK", "setsStats", "allStats"]),
    atkPower() {
      return this.allStats.map((x, i) => {
        return Math.round(
          this.baseATK[i] * (1 + x["ATK%"] / 100) + x["FlatATK"]
        );
      });
    },
    critDmg() {
      return this.allStats.map((x) => {
        return ((50 + x["CDmg%"]) / 100) * ((5 + x["CRate%"]) / 100);
      });
    },
    physAtk() {
      return this.allStats.map((x, i) => {
        let phys =
          this.atkPower[i] * (1 + (x["Physical%"] + x["AllDMG%"]) / 100);
        return Math.round(phys + phys * this.critDmg[i]);
      });
    },
    normalAtk() {
      return this.allStats.map((x, i) => {
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
      return this.allStats.map((x, i) => {
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
      return this.allStats.map((x, i) => {
        let elem =
          this.atkPower[i] * (1 + (x["Elemental%"] + x["AllDMG%"]) / 100);
        return Math.round(elem + elem * this.critDmg[i]);
      });
    },
    allResults() {
      const critChance = this.allStats.map(
        (x) => Math.round((x["CRate%"] + 5) * 10) / 10
      );
      const critDamage = this.allStats.map(
        (x) => Math.round((x["CDmg%"] + 50) * 10) / 10
      );
      const elem = this.allStats.map((x) => x["Elemental%"]);
      const phys = this.allStats.map((x) => x["Physical%"]);
      const EM = this.allStats.map((x) => x["EM"]);
      const EnRe = this.allStats.map((x) => Math.round(x["EnRe%"] * 10) / 10);
      const DEF = this.allStats.map((x) =>
        Math.round(
          this.character.baseDEF * (1 + x["DEF%"] / 100) + x["FlatDEF"]
        )
      );
      const HP = this.allStats.map((x) =>
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
    shareLink() {
      return `/?l=${this.buildShareString()}`;
    },
    domen() {
      return window.location.protocol + "//" + window.location.hostname;
    },
  },
  methods: {
    updateAvailable(event) {
      this.updateReady = true;
      this.registration = event.detail;
    },
    update() {
      this.updateReady = false;
      if (!this.registration || !this.registration.waiting) return;
      this.registration.waiting.postMessage({ type: "SKIP_WAITING" });
    },
    equalize() {
      for (const art in this.artifacts[1]) {
        this.artifacts[1][art].value = this.artifacts[0][art].value;
        this.artifacts[1][art].rarity = this.artifacts[0][art].rarity;
        this.artifacts[1][art].name = this.artifacts[0][art].name;
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
    buildShareString() {
      let ar = [
        this.character.charName,
        this.character.charLvl,
        this.character.talentLvl,
      ];
      for (let i = 0; i < 2; i++) {
        ar.push(this.set[i].pieces, this.set[i].set[0], this.set[i].set[1]);
        this.additionalStats[i].forEach((x) => ar.push(x.stat, x.value));
        ar.push(this.weapon[i].weaponName, this.weapon[i].refinement);

        for (const key in this.artifacts[i]) {
          const at = this.artifacts[i][key];
          ar.push(at.name, at.value);
          at.substats.forEach((x) => ar.push(x.name, x.value, x.upgrade));
        }
      }
      return encodeURIComponent(ar.join("-").replaceAll("%", "_"));
    },
    loadFromString(arr) {
      this.character = getCharData(
        arr.shift(),
        parseInt(arr.shift()),
        parseInt(arr.shift() - 1)
      );
      for (let i = 0; i < 2; i++) {
        this.set[i].pieces = arr.shift();
        this.set[i].set = [arr.shift(), arr.shift()];
        this.additionalStats[i].forEach((x) => {
          x.stat = arr.shift();
          x.value = parseFloat(arr.shift());
        });
        this.weapon[i] = getWeaponData(arr.shift(), parseInt(arr.shift()));
        for (const key in this.artifacts[i]) {
          const at = this.artifacts[i][key];
          at.name = arr.shift();
          at.value = parseFloat(arr.shift());
          at.substats.forEach((x) => {
            x.name = arr.shift();
            x.value = parseFloat(arr.shift());
            x.upgrade = parseInt(arr.shift());
          });
        }
      }
    },
    copyShareLink() {
      console.log(this.$refs.link.href);
    },
  },
};
</script>

<style>
#app {
  background-color: #1b2027;
}

input {
  text-align: center;
  border-radius: 3px;
}

.slide-enter-active {
  transition-property: transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
.slide-leave-active {
  transition-property: transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 600ms;
}
.slide-enter {
  opacity: 0;
  transform: translateY(-20px);
}
.slider-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
